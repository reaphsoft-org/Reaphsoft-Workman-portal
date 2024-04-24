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
import { CreateEstateDto } from './dto/create-estate.dto';
import { EstateManager } from '../entities/EstateManager';

@Injectable()
export class AccountsService {
  private readonly uploadPath = 'media/u';
  private readonly userRepository = AppDataSource.getRepository(User);
  private readonly estateRepository =
    AppDataSource.getRepository(EstateManager);
  async createIndividualAccount(createUserDto: CreateUserDto, file: any) {
    return this.createAccount(createUserDto, file, User.accountType);
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

  async sendAgreement(user: User | EstateManager, filePath: string) {
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

  generalValidation(dto: CreateUserDto | CreateEstateDto) {
    if (
      dto.email === undefined ||
      dto.email === '' ||
      !dto.email.includes('@')
    ) {
      return { status: false, resp: 'Invalid email address' };
    }
    if (dto.password === undefined || dto.password === '') {
      // add other password validation
      return { status: false, resp: 'Invalid password' };
    }
    if (dto.fullname === undefined || dto.fullname === '') {
      return { status: false, resp: 'Invalid Fullname' };
    }
    if (dto.address === undefined || dto.address === '') {
      return { status: false, resp: 'Invalid address' };
    }
    if (
      dto.serviceType === undefined ||
      dto.serviceType < 1 ||
      dto.serviceType > 2
    ) {
      return { status: false, resp: 'Invalid service type' };
    }
    return { status: true, resp: '' };
  }
  validateUser(createUserDto: CreateUserDto): {
    resp: string;
    status: boolean;
  } {
    const check = this.generalValidation(createUserDto);
    if (!check.status) return check;
    if (
      createUserDto.apartment === undefined ||
      createUserDto.apartment === ''
    ) {
      return { status: false, resp: 'Invalid apartment number' };
    }
    return { status: true, resp: '' };
  }

  validateEstateAccount(createEstateDto: CreateEstateDto): {
    resp: string;
    status: boolean;
  } {
    const check = this.generalValidation(createEstateDto);
    if (!check.status) return check;
    if (createEstateDto.estate === undefined || createEstateDto.estate === '') {
      return { status: false, resp: 'Invalid estate name' };
    }
    return { status: true, resp: '' };
  }

  async getUser(email: string): Promise<UserDto | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      return null;
    }
    const userDto = new UserDto();
    userDto.apartment = user.apartment;
    userDto.accountType = User.accountType;
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
    const user = await this.userRepository.findOneBy({
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
    await this.userRepository.save(user);
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
    const user = await this.userRepository.findOneBy({
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
    await this.userRepository.save(user);
    return { resp: '', status: true };
  }
  async createEstateAccount(createEstateDto: CreateEstateDto, file: any) {
    return this.createAccount(createEstateDto, file, EstateManager.accountType);
  }

  async createAccount(
    dto: CreateEstateDto | CreateUserDto,
    file: any,
    type: number,
  ) {
    if (Object.keys(dto).length === 0) {
      return {
        resp: 'You did not post any registration data',
        status: false,
      };
    }
    const check =
      type == User.accountType
        ? this.validateUser(<CreateUserDto>dto)
        : this.validateEstateAccount(<CreateEstateDto>dto);
    if (!check.status) {
      return check;
    }
    const object: User | EstateManager =
      type == User.accountType ? new User() : new EstateManager();
    object.email = dto.email;
    object.password = dto.password;
    object.fullname = this.toTitleCase(dto.fullname.trim());
    object.address = dto.address;
    object.serviceType = dto.serviceType;
    object.photoURL = '';
    if (type == User.accountType) {
      const f = (obj: User, data: CreateUserDto) => {
        obj.apartment = data.apartment;
      };
      f(<User>object, <CreateUserDto>dto);
    } else {
      const f = (obj: EstateManager, data: CreateEstateDto) => {
        obj.estate = data.estate;
      };
      f(<EstateManager>object, <CreateEstateDto>dto);
    }
    if (file != null && file.mimetype.startsWith('image/')) {
      // todo add test case for when a object posts a file which doesn't have an image mime type
      // todo test for jpegs, currently tests for png
      const extension: string = file.originalname.split('.').pop();
      const filename =
        object.email.replace('@', '').replace('.', '-') + `.${extension}`;
      object.photoURL = await this.savePhoto(file, filename);
    }
    try {
      if (type == User.accountType) await this.userRepository.save(object);
      else await this.estateRepository.save(object);
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
        resp: 'An error was encountered while trying to save the object. Please refresh the page and try again.',
        status: false,
      };
    }
    const resp = await createPDF(object);
    if (resp.success) {
      const mailResponse = await this.sendAgreement(object, resp.filePath!);
      if (mailResponse.status !== 'Queued') {
        // log something
      }
      fs.rmSync(resp.filePath!);
    } else {
      console.log(resp);
    }
    return { resp: 'Account created successfully', status: true };
  }
}
