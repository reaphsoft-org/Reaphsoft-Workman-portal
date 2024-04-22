import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { AppDataSource } from '../data-source';
import { Express } from 'express';
import { User } from '../entities/User';
import * as fs from 'fs';
import * as path from 'path';
import { MEDIA_DIR } from '../app.module';
import { Email } from '../utilities/mailman';
import { createPDF } from '../utilities/createpdf';

@Injectable()
export class AccountsService {
  private readonly uploadPath = 'media/u';
  async createAccount(createAccountDto: CreateAccountDto, file: any) {
    // Implement account creation logic here
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize().catch((e) => {
        // todo on error, returned a status failed and not called .getRepository below
        console.log(e);
      });
    }
    const accountRepository = AppDataSource.getRepository(User);
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
    await accountRepository.save(user);
    const resp = await createPDF(user);
    if (resp.success) {
      const mailResponse = await this.sendAgreement(user, resp.filePath!);
      if (mailResponse.status === 'Queued') {
        fs.rmSync(resp.filePath!);
      }
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
}
