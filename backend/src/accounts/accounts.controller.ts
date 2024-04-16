import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { AccountsService } from './accounts.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('account/sign/up/')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  async createAccount(
    @UploadedFile() file: any,
    @Body() createAccountDto: CreateAccountDto,
  ) {
    return this.accountsService.createAccount(createAccountDto, file);
  }
}
