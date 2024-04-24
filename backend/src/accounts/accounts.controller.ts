import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AccountsService } from './accounts.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserDto } from './dto/user.dto';
import { PasswordDto } from './dto/password.dto';

@Controller('account/')
@UseInterceptors(FileInterceptor('photo'))
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post('sign/up/i/')
  async createAccount(
    @UploadedFile() file: any,
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.accountsService.createIndividualAccount(createUserDto, file);
  }

  @Get('user/:email')
  async getUser(@Param('email') email: string): Promise<UserDto | null> {
    return this.accountsService.getUser(email);
  }

  @Post('update/user/')
  async updateUser(
    @Body() userDto: UserDto,
  ): Promise<{ resp: string; status: boolean }> {
    // todo set account type on login
    return this.accountsService.updateUser(userDto);
  }

  @Post('change/password/')
  async changePassword(
    @Body() passwordDto: PasswordDto,
  ): Promise<{ resp: string; status: boolean }> {
    return this.accountsService.changePassword(passwordDto);
  }
}
