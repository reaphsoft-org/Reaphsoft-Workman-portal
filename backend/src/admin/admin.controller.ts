import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('admin/')
export class AdminController {
    constructor(private readonly service: AdminService) {}
    // Users, LIST, CRUD,
    @UseGuards(AuthGuard)
    @Get('users/')
    async getUsers() {}
    // EstateManagers LIST, CRUD
    // workers LIST, CRUD
    // Requests, LIST CRUD
}
