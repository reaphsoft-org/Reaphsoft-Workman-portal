import {
    BadRequestException,
    Body,
    Controller,
    FileTypeValidator,
    Get,
    MaxFileSizeValidator,
    Param,
    ParseFilePipe,
    Post,
    Put,
    Request as RequestDecorator,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AccountsService } from './accounts.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserDto } from './dto/user.dto';
import { PasswordDto } from './dto/password.dto';
import { CreateEstateDto } from './dto/create-estate.dto';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateEstateManagerDto, UpdateUserDto } from './dto/update.dto';
import { EstateDto } from './dto/estate.dto';
import { TokenDto } from './dto/token.dto';

@Controller('account/')
export class AccountsController {
    constructor(private readonly accountsService: AccountsService) {}

    @Post('sign/up/i/')
    @UseInterceptors(FileInterceptor('photo'))
    async createIndividualAccount(
        @UploadedFile()
        file: any,
        @Body() createUserDto: CreateUserDto,
    ) {
        if (file) {
            const parseFilePipe = new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({
                        maxSize: 1024000,
                        message:
                            'Please choose a photo with a lesser size (not exceeding 1.5MB).',
                    }), // 1MB
                    new FileTypeValidator({ fileType: 'image/*' }),
                ],
                exceptionFactory: (error) => {
                    throw new BadRequestException(error);
                },
            });

            await parseFilePipe.transform(file);
        }
        return this.accountsService.createIndividualAccount(
            createUserDto,
            file,
        );
    }

    @UseGuards(AuthGuard)
    @Get('user/')
    async getUser(
        @RequestDecorator() req: Request,
    ): Promise<UserDto | EstateDto | null> {
        // @ts-expect-error the user variable below will be set, otherwise authorization error will occur.
        const email = req.user.email;
        // @ts-expect-error the user variable below will be set, otherwise authorization error will occur.
        const type = Number.parseInt(req.user.type);
        return await this.accountsService.getUser(email, type);
    }

    @UseGuards(AuthGuard)
    @Put('update/user/i/')
    async updateUser(
        @RequestDecorator() req: Request,
        @Body() updateUserDto: UpdateUserDto,
    ): Promise<{ resp: string; status: boolean }> {
        // @ts-expect-error the user variable below will be set, otherwise authorization error will occur.
        const email = req.user.email;
        return this.accountsService.updateUser(email, updateUserDto);
    }

    @UseGuards(AuthGuard)
    @Put('update/user/e/')
    async updateEstateManager(
        @RequestDecorator() req: Request,
        @Body() updateEstateManagerDto: UpdateEstateManagerDto,
    ): Promise<{ resp: string; status: boolean }> {
        // @ts-expect-error the user variable below will be set, otherwise authorization error will occur.
        const email = req.user.email;
        return this.accountsService.updateEstateManager(
            email,
            updateEstateManagerDto,
        );
    }

    @UseGuards(AuthGuard)
    @Post('change/password/')
    async changePassword(
        @RequestDecorator() req: Request,
        @Body() passwordDto: PasswordDto,
    ): Promise<{ resp: string; status: boolean }> {
        // @ts-expect-error the user variable below will be set, otherwise authorization error will occur.
        const email = req.user.email;
        // @ts-expect-error the user variable below will be set, otherwise authorization error will occur.
        const type = req.user.type;
        return this.accountsService.changePassword(email, type, passwordDto);
    }

    @UseInterceptors(FileInterceptor('photo'))
    @Post('sign/up/e/')
    async createEstateAccount(
        @UploadedFile() file: any,
        @Body() createEstateDto: CreateEstateDto,
    ) {
        return this.accountsService.createEstateAccount(createEstateDto, file);
    }

    @UseGuards(AuthGuard)
    @Put('registration/token/:code/')
    async setRegistrationToken(
        @RequestDecorator() req: Request,
        @Param('code') code: string,
        @Body() tokenDto: TokenDto,
    ) {
        if (code != '00' && code != '11' && code != '22' && code != '33') {
            throw new BadRequestException('Invalid request.');
        }
        if (tokenDto.token === undefined || tokenDto.token === '') {
            throw new BadRequestException('Invalid request, no token.');
        }
        if (tokenDto.token.length > 255) {
            throw new BadRequestException('Token length is greater than 255.');
        }
        // @ts-expect-error the user variable below will be set, otherwise authorization error will occur.
        const email = req.user.email;
        return this.accountsService.setRegistrationToken(tokenDto, email, code);
    }

    @Put('reset/password/:code/:email/')
    async requestPasswordReset(
        @Param('code') code: string,
        @Param('email') email: string,
    ) {
        if (code != '00' && code != '11' && code != '22' && code != '33') {
            throw new BadRequestException('Invalid request.');
        }
        return this.accountsService.requestPasswordReset(email, code);
    }
}
