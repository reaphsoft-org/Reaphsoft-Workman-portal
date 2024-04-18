import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { AppDataSource } from '../data-source';
import { Express } from 'express';
import { User } from '../entities/User';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AccountsService {
  private readonly uploadPath = 'media/u';
  async createAccount(createAccountDto: CreateAccountDto, file: any) {
    // Implement account creation logic here
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize().catch((e) => console.log(e));
    }
    const accountRepository = AppDataSource.getRepository(User);
    const user = new User();
    user.accountType = createAccountDto.accountType;
    user.email = createAccountDto.email;
    user.password = createAccountDto.password;
    user.fullname = createAccountDto.fullname;
    user.apartment = createAccountDto.apartment;
    user.address = createAccountDto.address;
    user.serviceType = createAccountDto.serviceType;
    user.photoURL = '';
    // if (file != null) {
    //   user.photoURL = file.name;
    // }
    await accountRepository.save(user);
    return { resp: 'Account created successfully', status: true };
  }

  async savePhoto(
    photo: Express.Multer.File,
    filename: string,
  ): Promise<string> {
    const fullPath = path.join(this.uploadPath, filename);
    fs.writeFile(fullPath, photo.buffer, (err) => {
      if (err) {
        throw new Error('Failed to save image');
      }
    });
    return fullPath;
  }
}
