import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
import * as fs from 'fs';
import * as path from 'path';
import { MEDIA_DIR } from '../app.module';
import { Email } from '../utilities/mailman';
import { createPDF } from '../utilities/createpdf';
import { UserDto } from './dto/user.dto';
import { PasswordDto } from './dto/password.dto';

@Injectable()
export class AccountsService {
  private readonly uploadPath = 'media/u';
  private readonly accountRepository = AppDataSource.getRepository(User);
  async createIndividualAccount(createUserDto: CreateUserDto, file: any) {
    // Implement account creation logic here
    if (Object.keys(createUserDto).length === 0) {
      return { resp: 'You did not post any registration data', status: false };
    }
    const check = this.runValidation(createUserDto);
    if (!check.status) {
      return check;
    }
    const user = new User();
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.fullname = this.toTitleCase(createUserDto.fullname.trim());
    user.apartment = createUserDto.apartment;
    user.address = createUserDto.address;
    user.serviceType = createUserDto.serviceType;
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

  runValidation(createUserDto: CreateUserDto): {
    resp: string | null;
    status: boolean;
  } {
    if (
      createUserDto.email === undefined ||
      createUserDto.email === '' ||
      !createUserDto.email.includes('@')
    ) {
      return { status: false, resp: 'Invalid email address' };
    }
    if (createUserDto.password === undefined || createUserDto.password === '') {
      // add other password validation
      return { status: false, resp: 'Invalid password' };
    }
    if (createUserDto.fullname === undefined || createUserDto.fullname === '') {
      return { status: false, resp: 'Invalid Fullname' };
    }
    if (
      createUserDto.apartment === undefined ||
      createUserDto.apartment === ''
    ) {
      return { status: false, resp: 'Invalid apartment number' };
    }
    if (createUserDto.address === undefined || createUserDto.address === '') {
      return { status: false, resp: 'Invalid address' };
    }
    if (
      createUserDto.serviceType === undefined ||
      createUserDto.serviceType < 1 ||
      createUserDto.serviceType > 2
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
    if (userDto.email === undefined || userDto.email === '') {
      return { status: false, resp: 'Invalid email address' };
    }
    if (userDto.fullname === undefined || userDto.fullname === '') {
      return { status: false, resp: 'Invalid Fullname' };
    }
    if (userDto.apartment === undefined || userDto.apartment === '') {
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
