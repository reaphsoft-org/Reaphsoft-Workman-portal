import { Body, Controller, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { LoginDto } from './dto/login.dto';

@Controller('admin/')
export class AdminController {
    constructor(private readonly service: AdminService) {}

    @Post('login/')
    async login(@Body() dto: LoginDto) {
        const { email, password } = dto;
        if (email == undefined || password == undefined)
            return {
                status: false,
                access_token: '',
                resp: 'invalid request',
            };
        return this.service.login(email, password);
    }

    @Post('create/')
    async create() {}
}
