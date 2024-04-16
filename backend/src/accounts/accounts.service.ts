import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';

@Injectable()
export class AccountsService {
  async createAccount(createAccountDto: CreateAccountDto) {
    // Implement account creation logic here
    console.log(createAccountDto);
    return 'Account created successfully';
  }
}
