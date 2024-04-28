import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LoginDto as AdminLoginDto } from '../admin/dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('login/')
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

    @Post('admin/login/')
    async adminLogin(@Body() dto: AdminLoginDto) {
        const { email, password } = dto;
        if (email == undefined || password == undefined)
            return {
                status: false,
                access_token: '',
                resp: 'invalid request',
            };
        return this.authService.login(email, password);
    }
}
