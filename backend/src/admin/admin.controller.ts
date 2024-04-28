import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../roles/roles.guard';
import { Roles } from '../roles/decorators/roles.decorator';
import { Role } from '../roles/enum/role.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserDto } from '../accounts/dto/create-user.dto';
import { UpdateUserDto } from '../accounts/dto/update.dto';

@UseGuards(RolesGuard)
@Roles(Role.Admin)
@UseGuards(AuthGuard)
@Controller('admin/')
export class AdminController {
    constructor(private readonly service: AdminService) {}
    // Users, LIST, CRUD,
    @Get('users/:page/')
    async getUsers(@Param('page') page: number) {
        return this.service.getUsers(page);
    }
    @Post('user/')
    @UseInterceptors(FileInterceptor('photo'))
    async createUser(
        @UploadedFile() file: any,
        @Body() createUserDto: CreateUserDto,
    ) {
        return this.service.createUser(createUserDto, file);
    }
    @Put('user/:email/')
    async updateUser(
        @Param('email') email: string,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        return this.service.updateUser(email, updateUserDto);
    }
    @Get('user/:email/')
    async getUser(@Param('email') email: string) {
        return this.service.getUser(email);
    }
    // EstateManagers LIST, CRUD
    // workers LIST, CRUD
    // Requests, LIST CRUD
}
