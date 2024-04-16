import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';

@Injectable()
export class AccountsService {
  async createAccount(createAccountDto: CreateAccountDto, file: any) {
    // Implement account creation logic here
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
}
