import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
} from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { AccountsService } from './accounts.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserDto } from './dto/user.dto';

@Controller('account/')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post('sign/up/')
  @UseInterceptors(FileInterceptor('photo'))
  async createAccount(
    @UploadedFile() file: any,
    @Body() createAccountDto: CreateAccountDto,
  ) {
    return this.accountsService.createAccount(createAccountDto, file);
  }

  @Get('user/:email')
  async getUser(@Param('email') email: string): Promise<UserDto | null> {
    return this.accountsService.getUser(email);
  }
}
