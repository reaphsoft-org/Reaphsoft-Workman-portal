import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
import * as fs from 'fs';
import * as path from 'path';
import { MEDIA_DIR } from '../app.module';
import { Email } from '../utilities/mailman';
import { createPDF } from '../utilities/createpdf';
import { UserDto } from './dto/user.dto';
import {PasswordDto} from "./dto/password.dto";

@Injectable()
export class AccountsService {
  private readonly uploadPath = 'media/u';
  private readonly accountRepository = AppDataSource.getRepository(User);
  async createAccount(createAccountDto: CreateAccountDto, file: any) {
    // Implement account creation logic here
    if (Object.keys(createAccountDto).length === 0) {
      return { resp: 'You did not post any registration data', status: false };
    }
    const check = this.runValidation(createAccountDto);
    if (!check.status) {
      return check;
    }
    const user = new User();
    user.accountType = createAccountDto.accountType;
    user.email = createAccountDto.email;
    user.password = createAccountDto.password;
    user.fullname = this.toTitleCase(createAccountDto.fullname.trim());
    user.apartment = createAccountDto.apartment;
    user.address = createAccountDto.address;
    user.serviceType = createAccountDto.serviceType;
    user.photoURL = '';
    if (file != null && file.mimetype.startsWith('image/')) {
      // todo add test case for when a user posts a file which doesn't have an image mime type
      // todo test for jpegs, currently tests for png
      const extension: string = file.originalname.split('.').pop();
      const filename =
        user.email.replace('@', '').replace('.', '-') + `.${extension}`;
      user.photoURL = await this.savePhoto(file, filename);
    }
    try {
      await this.accountRepository.save(user);
    } catch (e) {
      if (
        e.name === 'QueryFailedError' &&
        e.message.includes('duplicate key value violates unique constraint')
      ) {
        return {
          resp: 'A user with the email you supplied already exists.',
          status: false,
        };
      }
      // log e.message
      return {
        resp: 'An error was encountered while trying to save the user. Please refresh the page and try again.',
        status: false,
      };
    }
    const resp = await createPDF(user);
    if (resp.success) {
      const mailResponse = await this.sendAgreement(user, resp.filePath!);
      if (mailResponse.status !== 'Queued') {
        // log something
      }
      fs.rmSync(resp.filePath!);
    } else {
      console.log(resp);
    }
    return { resp: 'Account created successfully', status: true };
  }

  async savePhoto(
    photo: Express.Multer.File,
    filename: string,
  ): Promise<string> {
    const fullPath = path.join(MEDIA_DIR, filename);
    let imgPath = path.join(this.uploadPath, filename);
    fs.writeFile(fullPath, photo.buffer, (err) => {
      if (err) {
        imgPath = '';
      }
    });
    return imgPath;
  }

  async sendAgreement(user: User, filePath: string) {
    const email = new Email();
    const resp = await email.sendTextMailWithAttachment(
      user.email,
      'Reaphsoft Workmen Contractual Agreement',
      `Dear ${user.fullname},\n\nThank you for creating an account with us. Here is an official contractual agreement between us which is binding whenever you use our services.\n\nWarm Regards\nReaphsoft Workmen`,
      '',
      filePath,
    );
    return { status: resp };
  }

  toTitleCase(str: string): string {
    return str.replace(/\w\S*/g, function (txt: string) {
      return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
    });
  }

  runValidation(createAccountDto: CreateAccountDto): {
    resp: string | null;
    status: boolean;
  } {
    if (
      createAccountDto.accountType === undefined ||
      createAccountDto.accountType < 1 ||
      createAccountDto.accountType > 2
    ) {
      return { status: false, resp: 'Invalid account type' };
    }
    if (
      createAccountDto.email === undefined ||
      createAccountDto.email === '' ||
      !createAccountDto.email.includes('@')
    ) {
      return { status: false, resp: 'Invalid email address' };
    }
    if (
      createAccountDto.password === undefined ||
      createAccountDto.password === ''
    ) {
      // add other password validation
      return { status: false, resp: 'Invalid password' };
    }
    if (
      createAccountDto.fullname === undefined ||
      createAccountDto.fullname === ''
    ) {
      return { status: false, resp: 'Invalid Fullname' };
    }
    if (
      createAccountDto.accountType === 1 &&
      (createAccountDto.apartment === undefined ||
        createAccountDto.apartment === '')
    ) {
      return { status: false, resp: 'Invalid apartment number' };
    }
    if (
      createAccountDto.address === undefined ||
      createAccountDto.address === ''
    ) {
      return { status: false, resp: 'Invalid address' };
    }
    if (
      createAccountDto.serviceType === undefined ||
      createAccountDto.serviceType < 1 ||
      createAccountDto.serviceType > 2
    ) {
      return { status: false, resp: 'Invalid service type' };
    }
    return { status: true, resp: null };
  }

  async getUser(email: string): Promise<UserDto | null> {
    const user = await this.accountRepository.findOne({ where: { email } });
    if (!user) {
      return null;
    }
    const userDto = new UserDto();
    userDto.apartment = user.apartment;
    userDto.accountType = user.accountType;
    userDto.address = user.address;
    userDto.email = user.email;
    userDto.fullname = user.fullname;
    userDto.photoURL = user.photoURL;
    userDto.serviceType = user.serviceType;
    return userDto;
  }

  async updateUser(userDto: UserDto): Promise<{
    resp: string;
    status: boolean;
  }> {
    const check = this.validateUserUpdateDto(userDto);
    if (!check.status) {
      return check;
    }
    const user = await this.accountRepository.findOneBy({
      email: userDto.email,
    });
    if (!user) {
      return {
        resp: `No user was found with the email ${userDto.email}`,
        status: false,
      };
    }
    user.apartment = userDto.apartment;
    user.accountType = userDto.accountType;
    user.address = userDto.address;
    user.fullname = userDto.fullname;
    user.serviceType = userDto.serviceType;
    await this.accountRepository.save(user);
    return { resp: '', status: true };
  }

  validateUserUpdateDto(userDto: UserDto): {
    resp: string;
    status: boolean;
  } {
    if (
      userDto.accountType === undefined ||
      userDto.accountType < 1 ||
      userDto.accountType > 2
    ) {
      return { status: false, resp: 'Invalid account type' };
    }
    if (userDto.email === undefined || userDto.email === '') {
      return { status: false, resp: 'Invalid email address' };
    }
    if (userDto.fullname === undefined || userDto.fullname === '') {
      return { status: false, resp: 'Invalid Fullname' };
    }
    if (
      userDto.accountType === 1 &&
      (userDto.apartment === undefined || userDto.apartment === '')
    ) {
      return { status: false, resp: 'Invalid apartment number' };
    }
    if (userDto.address === undefined || userDto.address === '') {
      return { status: false, resp: 'Invalid address' };
    }
    if (
      userDto.serviceType === undefined ||
      userDto.serviceType < 1 ||
      userDto.serviceType > 2
    ) {
      return { status: false, resp: 'Invalid service type' };
    }
    return { status: true, resp: '' };
  }

  async changePassword(passwordDto: PasswordDto) {
    if (passwordDto.email === undefined || passwordDto.email === '') {
      return { status: false, resp: 'Invalid email address' };
    }
    const user = await this.accountRepository.findOneBy({
      email: passwordDto.email,
    });
    if (!user) {
      return {
        resp: `No user was found with the email ${passwordDto.email}`,
        status: false,
      };
    }
    if (user.password != passwordDto.old_password) {
      return {
        resp: `Incorrect Old Password`,
        status: false,
      };
    }
    if (user.password == passwordDto.new_password) {
      return {
        resp: `Your new password must be different to your old password`,
        status: false,
      };
    }
    if (
      passwordDto.new_password === undefined ||
      passwordDto.new_password === ''
      // add other password validation
    ) {
      return { status: false, resp: 'Invalid new password' };
    }
    user.password = passwordDto.new_password;
    await this.accountRepository.save(user);
    return { resp: '', status: true };
  }
}
