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
import { RequestUpdateDto } from '../workmen/dto/request-update.dto';
import { ServiceDto } from '../workmen/dto/service.dto';
import { Request as RequestDecorator } from '@nestjs/common/decorators/http/route-params.decorator';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { PasswordDto } from './dto/password.dto';
import { EstateService } from '../estate/estate.service';
import { HouseDto } from '../estate/dto/house.dto';

@UseGuards(RolesGuard)
@Roles(Role.Admin)
@UseGuards(AuthGuard)
@Controller('admin/')
export class AdminController {
    constructor(
        private readonly service: AdminService,
        private readonly estateService: EstateService,
    ) {}
    // admin
    @Get('m/')
    async getAdmin(@RequestDecorator() req: Request) {
        // @ts-expect-error the user variable below will be set, otherwise authorization error will occur.
        const email = req.user.email;
        return this.service.getAdmin(email);
    }
    @Put('m/')
    async updateAdmin(
        @RequestDecorator() req: Request,
        @Body() dto: UpdateAdminDto,
    ) {
        // @ts-expect-error the user variable below will be set, otherwise authorization error will occur.
        const email = req.user.email;
        return this.service.updateAdmin(email, dto);
    }
    @Get('dashboard/')
    async getDashboardValues() {
        return this.service.getDashboardValues();
    }
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
    async getWorkRequests(
        @Param('page') page: number,
        @Param('type') type: number,
    ) {
        if (type != 1 && type != 2) return { pages: 0, data: [] };
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
    async getWorkRequest(@Param('id') id: number, @Param('type') type: number) {
        return this.service.getWorkRequest(id, type);
    }
    @Delete('work/request/:type/:id/')
    async deleteWorkRequest(
        @Param('id') id: number,
        @Param('type') type: number,
    ) {
        return this.service.deleteWorkRequest(id, type);
    }
    // Service
    @Get('services/:page/')
    async getServices(@Param('page') page: number) {
        return this.service.getServices(page);
    }
    @Post('service/')
    async createService(@Body() serviceDto: ServiceDto) {
        return this.service.createService(serviceDto);
    }
    @Put('service/:id/')
    async updateService(
        @Param('id') id: number,
        @Body() serviceDto: ServiceDto,
    ) {
        return this.service.updateService(id, serviceDto);
    }
    @Get('service/:id/')
    async getService(@Param('id') id: number) {
        return this.service.getService(id);
    }
    @Delete('service/:id/')
    async deleteService(@Param('id') id: number) {
        return this.service.deleteService(id);
    }
    @Post('change/photo/:code/:email/')
    @UseInterceptors(FileInterceptor('photo'))
    async changePhoto(
        @UploadedFile() file: any,
        @Param('code') code: string,
        @Param('email') email: string,
    ) {
        if (!file) {
            return { status: false, resp: 'no file uploaded' };
        }
        if (code != '00' && code != '11' && code != '22' && code != '33') {
            return { status: false, resp: 'Invalid request' };
        }
        return this.service.changePhoto(file, code, email);
    }
    @Post('change/password/:code/:email/')
    async changePassword(
        @Param('code') code: string,
        @Param('email') email: string,
        @Body() passwordDto: PasswordDto,
    ) {
        if (code != '00' && code != '11' && code != '22' && code != '33') {
            return { status: false, resp: 'Invalid request' };
        }
        if (passwordDto.password === undefined || passwordDto.password === '') {
            return { status: false, resp: 'Invalid request' };
        }
        return this.service.changePassword(email, code, passwordDto);
    }
    @Get('estate/:email/houses/:page/')
    async getEstateHouses(
        @Param('email') email: string,
        @Param('page') page: number,
    ) {
        return this.estateService.getHouses(email, page, true);
    }
    @Post('estate/:email/house/')
    async addEstateHouse(@Param('email') email: string, @Body() dto: HouseDto) {
        if (
            dto.vacancy === undefined ||
            dto.number === undefined ||
            dto.occupant_name === undefined
        ) {
            return { status: false, resp: 'Invalid Request' };
        }
        return this.estateService.addHouse(email, dto, true);
    }
    @Get('estate/:email/house/:id/')
    async getHouse(@Param('email') email: string, @Param('id') id: string) {
        return this.estateService.getHouse(email, id, true);
    }
    @Put('estate/:email/house/:id/')
    async updateEstateHouse(
        @Param('email') email: string,
        @Param('id') id: string,
        @Body() dto: HouseDto,
    ) {
        if (
            dto.vacancy === undefined ||
            dto.number === undefined ||
            dto.occupant_name === undefined
        ) {
            return { status: false, resp: 'Invalid Request' };
        }
        return this.estateService.updateHouse(email, id, dto, true);
    }
}
