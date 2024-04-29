import {
    Body,
    Controller,
    Delete,
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
import {CreateEstateDto} from "../accounts/dto/create-estate.dto";

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
    @Delete('user/:email/')
    async deleteUser(@Param('email') email: string) {
        return this.service.deleteUser(email);
    }
    // EstateManagers LIST, CRUD
    // EstateManagers, LIST, CRUD,
    @Get('estate/managers/:page/')
    async getEstateManagers(@Param('page') page: number) {
        return this.service.getEstateManagers(page);
    }
    @Post('estate/manager/')
    @UseInterceptors(FileInterceptor('photo'))
    async createEstateManager(
        @UploadedFile() file: any,
        @Body() createEstateDto: CreateEstateDto,
    ) {
        return this.service.createEstateManager(createEstateDto, file);
    }
    @Put('estate/manager/:email/')
    async updateEstateManager(
        @Param('email') email: string,
        @Body() updateEstateManagerDto: UpdateEstateManagerDto,
    ) {
        return this.service.updateEstateManager(email, updateEstateManagerDto);
    }
    @Get('estate/manager/:email/')
    async getEstateManager(@Param('email') email: string) {
        return this.service.getEstateManager(email);
    }
    @Delete('estate/manager/:email/')
    async deleteEstateManager(@Param('email') email: string) {
        return this.service.deleteEstateManager(email);
    }
    // workers LIST, CRUD
    // Requests, LIST CRUD
    // Service
}
