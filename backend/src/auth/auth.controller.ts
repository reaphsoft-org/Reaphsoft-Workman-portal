import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Email } from '../utilities/mailman';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('login')
    async login(
        @Body() loginDto: LoginDto,
    ): Promise<{ access_token: string; resp: string; status: boolean }> {
        const { email, password, account } = loginDto;
        if (email == undefined || password == undefined)
            return {
                status: false,
                access_token: '',
                resp: 'invalid request',
            };
        if (account == undefined || account < 1 || account > 2)
            return {
                status: false,
                access_token: '',
                resp: 'invalid account type',
            };
        return this.authService.validateUser(email, password, account);
    }
    @Get('email/test/')
    async email(): Promise<{ status: string }> {
        const email = new Email();
        const resp = await email.sendTextMail('', '', '', '');
        return { status: resp };
    }
}
