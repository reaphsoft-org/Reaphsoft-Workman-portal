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
import {
    UpdateEstateManagerDto,
    UpdateUserDto,
} from '../accounts/dto/update.dto';
import { CreateEstateDto } from '../accounts/dto/create-estate.dto';
import { CreateWorkmanDto } from '../workmen/dto/create-workman.dto';
import { UpdateWorkmanDto } from '../workmen/dto/update-workman.dto';
import {RequestUpdateDto} from "../workmen/dto/request-update.dto";

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
    @Get('workmen/:page/')
    async getWorkmen(@Param('page') page: number) {
        // todo add feature to filter and sort using get Query() parameters
        return this.service.getWorkmen(page);
    }
    @Post('workman/')
    @UseInterceptors(FileInterceptor('photo'))
    async createWorkman(
        @UploadedFile() file: any,
        @Body() createWorkmanDto: CreateWorkmanDto,
    ) {
        return this.service.createWorkman(createWorkmanDto, file);
    }
    @Put('workman/:email/')
    async updateWorkman(
        @Param('email') email: string,
        @Body() updateWorkmanDto: UpdateWorkmanDto,
    ) {
        return this.service.updateWorkman(email, updateWorkmanDto);
    }
    @Get('workman/:email/')
    async getWorkman(@Param('email') email: string) {
        return this.service.getWorkman(email);
    }
    @Delete('workman/:email/')
    async deleteWorkman(@Param('email') email: string) {
        return this.service.deleteWorkman(email);
    }
    // Requests, LIST CRUD
    // no create for now
        @Get('work/requests/:type/:page/')
    async getWorkRequests(@Param('page') page: number,
                          @Param('type') type: number) {
        if (type !== 1 && type !== 2)
            return { pages: 0, data: [] };
        return this.service.getWorkRequests(page, type);
    }
    @Put('work/request/:type/:id/')
    async updateWorkRequest(
        @Param('id') id: number,
        @Param('type') type: number,
        @Body() requestUpdateDto: RequestUpdateDto,
    ) {
        return this.service.updateWorkRequest(id, type, requestUpdateDto);
    }
    @Get('work/request/:type/:id/')
    async getWorkRequest(@Param('id') id: number, @Param('type') type: number ) {
        return this.service.getWorkRequest(id, type);
    }
    @Delete('work/request/:email/')
    async deleteWorkRequest(@Param('email') email: string) {
        return this.service.deleteWorkRequest(email);
    // Service
}
