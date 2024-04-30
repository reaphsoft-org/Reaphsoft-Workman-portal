import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../data-source';
import { SuperUser } from '../entities/SuperUser';
import { User } from '../entities/User';
import { CreateUserDto } from '../accounts/dto/create-user.dto';
import { Email } from '../utilities/mailman';
import {
    UpdateEstateManagerDto,
    UpdateUserDto,
} from '../accounts/dto/update.dto';
import { Repository } from 'typeorm';
import { EstateManager } from '../entities/EstateManager';
import { CreateEstateDto } from '../accounts/dto/create-estate.dto';
import { CreateWorkmanDto } from '../workmen/dto/create-workman.dto';
import { Workman } from '../entities/Workman';
import { Service } from '../entities/Service';
import { UpdateWorkmanDto } from '../workmen/dto/update-workman.dto';
import { EstateRequest, UserRequest } from '../entities/Request';
import { RequestUpdateDto } from '../workmen/dto/request-update.dto';
import { ServiceDto } from '../workmen/dto/service.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminService {
    paginateBy = 50;
    private readonly adminRepo = AppDataSource.getRepository(SuperUser);
    private readonly usersRepo = AppDataSource.getRepository(User);
    private readonly estateManagersRepo =
        AppDataSource.getRepository(EstateManager);
    private readonly workmanRepo = AppDataSource.getRepository(Workman);
    private readonly serviceRepo = AppDataSource.getRepository(Service);
    private readonly userRequestRepo = AppDataSource.getRepository(UserRequest);
    private readonly estateRequestRepo =
        AppDataSource.getRepository(EstateRequest);

    async getAdmin(email: string) {
        const user = await this.adminRepo.findOneBy({
            email: email,
        });
        if (!user) return null;
        return {
            email: user.email,
            fullname: user.fullname,
            is_active: user.is_active,
            photoURL: user.photoURL,
            date_joined: user.date_joined,
            last_visited: user.last_visited,
        };
    }

    async updateAdmin(email: string, dto: UpdateAdminDto) {
        const user = await this.adminRepo.findOneBy({
            email: email,
        });
        // maybe user was deleted before this call was made
        if (!user)
            return {
                resp: `admin with the email ${email} was not found`,
                status: false,
            };
        if (dto.fullname !== undefined && dto.fullname !== '') {
            user.fullname = dto.fullname;
        }
        if (dto.new_password !== undefined && dto.new_password !== '') {
            if (dto.old_password === undefined)
                return { status: false, resp: 'old password is required' };
            if (!user.checkPassword(dto.old_password))
                return { status: false, resp: 'incorrect old password' };
            if (dto.old_password == dto.new_password) {
                return {
                    status: false,
                    resp: `Your new password must be different to your old password`,
                };
            }
            user.password = dto.new_password;
            user.setValues(true);
        }
        await this.adminRepo.save(user);
        return { resp: '', status: true };
    }

    async getUsers(page: number) {
        return await this.getNonStaffUsers(page, this.usersRepo);
    }

    async createUser(createUserDto: CreateUserDto, file: any) {
        const user = new User();
        user.email = createUserDto.email;
        user.password = createUserDto.password;
        user.fullname = createUserDto.fullname;
        user.address = createUserDto.address;
        user.serviceType = createUserDto.serviceType;
        user.apartment = createUserDto.apartment;
        user.photoURL = '';
        const check = user.runValidations();
        if (!check.status) {
            return check;
        }
        user.setValues(true);
        await user.saveFile(file);
        try {
            await this.usersRepo.save(user);
        } catch (e) {
            user.deletePhoto();
            if (
                e.name === 'QueryFailedError' &&
                e.message.includes(
                    'duplicate key value violates unique constraint',
                )
            ) {
                return {
                    resp: 'A user with the email you supplied already exists.',
                    status: false,
                };
            }
            return {
                resp: 'An error was encountered while trying to save the object. Please refresh the page and try again.',
                status: false,
            };
        }
        const email = new Email();
        await email.sendAccountCreateMail(user);
        return { resp: 'Account created successfully', status: true };
    }

    async updateUser(email: string, updateUserDto: UpdateUserDto) {
        const user = await this.usersRepo.findOneBy({
            email: email,
        });
        if (!user) {
            return {
                resp: `No user was found with the email ${email}`,
                status: false,
            };
        }
        user.apartment = updateUserDto.apartment;
        user.address = updateUserDto.address;
        user.fullname = updateUserDto.fullname;
        user.serviceType = updateUserDto.serviceType;
        const check = user.runValidations();
        if (!check.status) return check;
        user.setValues();
        await this.usersRepo.save(user);
        return { resp: '', status: true };
    }

    async getUser(email: string) {
        const user = await this.usersRepo.findOneBy({
            email: email,
        });
        if (!user) {
            return null;
        }
        return {
            email: user.email,
            fullname: user.fullname,
            apartment: user.apartment,
            address: user.address,
            serviceType: user.serviceType,
            photoURL: user.photoURL,
        };
    }

    async deleteUser(email: string) {
        const user = await this.usersRepo.findOneBy({ email: email });
        if (!user) return { status: false, resp: 'user not found' };
        await this.usersRepo.remove(user);
        return { status: true, resp: '' };
    }

    async getEstateManagers(page: number) {
        return await this.getNonStaffUsers(page, this.estateManagersRepo);
    }

    async getNonStaffUsers(
        page: number,
        repo: Repository<User> | Repository<EstateManager>,
    ) {
        if (page <= 0) return { pages: 0, data: [] };
        const start = this.paginateBy * (page - 1);
        const end = this.paginateBy;
        const users = await repo.find({
            skip: start,
            take: end,
            order: {
                fullname: 'ASC',
            },
        });
        // console.log(start, end, users.length);
        const count = await repo.count();
        let pages = Math.floor(count / 50);
        pages += count % this.paginateBy > 0 ? 1 : 0;
        return {
            pages: pages,
            data: users.map((user) => ({
                email: user.email,
                name: user.fullname,
                address: user.address,
            })),
        };
    }

    async createEstateManager(createEstateDto: CreateEstateDto, file: any) {
        const manager = new EstateManager();
        manager.email = createEstateDto.email;
        manager.password = createEstateDto.password;
        manager.fullname = createEstateDto.fullname;
        manager.address = createEstateDto.address;
        manager.serviceType = createEstateDto.serviceType;
        manager.estate = createEstateDto.estate;
        const check = manager.runValidations();
        if (!check.status) return check;
        manager.setValues(true);
        await manager.saveFile(file);
        try {
            await this.usersRepo.save(manager);
        } catch (e) {
            manager.deletePhoto();
            if (
                e.name === 'QueryFailedError' &&
                e.message.includes(
                    'duplicate key value violates unique constraint',
                )
            ) {
                return {
                    resp: 'A user with the email you supplied already exists.',
                    status: false,
                };
            }
            return {
                resp: 'An error was encountered while trying to save the object. Please refresh the page and try again.',
                status: false,
            };
        }
        const email = new Email();
        await email.sendAccountCreateMail(manager);
        return { resp: 'Account created successfully', status: true };
    }

    async updateEstateManager(
        email: string,
        updateEstateManagerDto: UpdateEstateManagerDto,
    ) {
        const user = await this.estateManagersRepo.findOneBy({
            email: email,
        });
        if (!user) {
            return {
                resp: `No estate manager was found with the email ${email}`,
                status: false,
            };
        }
        user.estate = updateEstateManagerDto.estate;
        user.address = updateEstateManagerDto.address;
        user.fullname = updateEstateManagerDto.fullname;
        user.serviceType = updateEstateManagerDto.serviceType;
        const check = user.runValidations();
        if (!check.status) return check;
        user.setValues();
        await this.usersRepo.save(user);
        return { resp: '', status: true };
    }

    async getEstateManager(email: string) {
        const user = await this.estateManagersRepo.findOneBy({
            email: email,
        });
        if (!user) {
            return null;
        }
        return {
            email: user.email,
            fullname: user.fullname,
            estate: user.estate,
            address: user.address,
            serviceType: user.serviceType,
            photoURL: user.photoURL,
        };
    }

    async deleteEstateManager(email: string) {
        const user = await this.estateManagersRepo.findOneBy({ email: email });
        if (!user) return { status: false, resp: 'estate account not found' };
        await this.estateManagersRepo.remove(user);
        return { status: true, resp: '' };
    }

    async createWorkman(createWorkmanDto: CreateWorkmanDto, file: any) {
        const serviceID = createWorkmanDto.service;
        if (serviceID === undefined)
            return { resp: 'no service id', status: false };
        const service = await this.serviceRepo.findOneBy({
            id: serviceID,
        });
        if (!service) return { resp: 'service not found', status: false };
        const workman = new Workman();
        workman.email = createWorkmanDto.email;
        workman.password = createWorkmanDto.password;
        workman.fullname = createWorkmanDto.fullname;
        workman.address = createWorkmanDto.address;
        workman.phone =
            createWorkmanDto.phone !== undefined ? createWorkmanDto.phone : '';
        workman.availability = createWorkmanDto.availability;
        workman.service = service;
        const check = workman.runValidations();
        if (!check.status) {
            return check;
        }
        workman.setValues(true);
        await workman.saveFile(file);
        try {
            await this.workmanRepo.save(workman);
        } catch (e) {
            workman.deletePhoto();
            if (
                e.name === 'QueryFailedError' &&
                e.message.includes(
                    'duplicate key value violates unique constraint',
                )
            ) {
                return {
                    resp: 'A workman with the email you supplied already exists.',
                    status: false,
                };
            }
            return {
                resp: 'An error was encountered while trying to save the object. Please refresh the page and try again.',
                status: false,
            };
        }
        return { resp: 'Account created successfully', status: true };
    }

    async getWorkmen(page: number) {
        if (page <= 0) return { pages: 0, data: [] };
        const start = this.paginateBy * (page - 1);
        const end = this.paginateBy * page;
        const users = await this.workmanRepo.find({
            skip: start,
            take: end,
            order: {
                fullname: 'ASC',
            },
        });
        const count = await this.workmanRepo.count();
        let pages = Math.floor(count / 50);
        pages += count % this.paginateBy > 0 ? 1 : 0;
        return {
            pages: pages,
            data: users.map((user) => ({
                email: user.email,
                name: user.fullname,
                service: user.service,
            })),
        };
    }

    async updateWorkman(email: string, updateWorkmanDto: UpdateWorkmanDto) {
        const workman = await this.workmanRepo.findOneBy({
            email: email,
        });
        if (!workman) {
            return {
                resp: `No workman was found with the email ${email}`,
                status: false,
            };
        }
        workman.fullname = updateWorkmanDto.fullname;
        workman.address = updateWorkmanDto.address;
        workman.availability = updateWorkmanDto.availability;
        workman.phone =
            updateWorkmanDto.phone !== undefined ? updateWorkmanDto.phone : '';
        const check = workman.runValidations();
        if (!check.status) return check;
        workman.setValues();
        await this.workmanRepo.save(workman);
        return { resp: '', status: true };
    }

    async getWorkman(email: string) {
        const workman = await this.workmanRepo.findOne({
            where: {
                email: email,
            },
            relations: {
                service: true,
            },
        });
        if (!workman) {
            return null;
        }
        return {
            email: workman.email,
            fullname: workman.fullname,
            address: workman.address,
            phone: workman.phone,
            service: workman.service.name,
            availability: workman.availability,
            photoURL: workman.photoURL,
        };
    }

    async deleteWorkman(email: string) {
        const workman = await this.workmanRepo.findOneBy({ email: email });
        if (!workman) return { status: false, resp: 'workman not found' };
        await this.workmanRepo.remove(workman);
        return { status: true, resp: '' };
    }

    async getWorkRequests(page: number, type: number) {
        if (page <= 0) return { pages: 0, data: [] };
        const start = this.paginateBy * (page - 1);
        const end = this.paginateBy * page;
        const repo =
            type === User.accountType
                ? this.userRequestRepo
                : this.estateRequestRepo;
        const requests = await repo.find({
            skip: start,
            take: end,
            relations: {
                client: true,
                worker: {
                    service: true,
                },
            },
        });
        const count = await repo.count();
        let pages = Math.floor(count / 50);
        pages += count % this.paginateBy > 0 ? 1 : 0;
        return {
            pages: pages,
            data: requests.map((request) => ({
                id: request.id,
                created_at: request.date_created,
                client: request.client.fullname,
                service: request.worker.service.name,
            })),
        };
    }

    async updateWorkRequest(
        id: number,
        type: number,
        requestUpdateDto: RequestUpdateDto,
    ) {
        const repo =
            type === User.accountType
                ? this.userRequestRepo
                : this.estateRequestRepo;
        const request = await repo.findOneBy({
            id: id,
        });
        if (!request) {
            return {
                resp: `Work request was not found. ErrorCode: {t:${type},i:${id}}`,
                status: false,
            };
        }
        if (requestUpdateDto.date_required !== undefined)
            request.date_required = requestUpdateDto.date_required;
        if (requestUpdateDto.accepted !== undefined)
            request.accepted = requestUpdateDto.accepted;
        if (requestUpdateDto.worker !== undefined) {
            const worker = await this.workmanRepo.findOneBy({
                id: id,
            });
            if (!worker) {
                return `workman with id: ${requestUpdateDto.worker} not found`;
            }
            request.worker = worker;
        }
        // @ts-expect-error, request is not null. Below should work
        await repo.save(request!);
        return { resp: '', status: true };
    }

    async getWorkRequest(id: number, type: number) {
        const repo =
            type === User.accountType
                ? this.userRequestRepo
                : this.estateRequestRepo;
        const request = await repo.findOne({
            where: {
                id: id,
            },
            relations: {
                client: true,
                worker: {
                    service: true,
                },
            },
        });
        if (!request) return null;
        return {
            accepted: request.accepted,
            date_created: request.date_created,
            date_required: request.date_required,
            date_accepted: request.date_accepted,
            date_completed: request.date_completed,
            worker_name: request.worker.fullname,
            worker_email: request.worker.email,
            client: request.client.fullname,
            client_email: request.client.email,
            service: request.worker.service.name,
            service_description: request.worker.service.description,
        };
    }

    async deleteWorkRequest(id: number, type: number) {
        const repo =
            type === User.accountType
                ? this.userRequestRepo
                : this.estateRequestRepo;
        const workRequest = await repo.findOneBy({ id: id });
        if (!workRequest)
            return {
                status: false,
                resp: `Work request was not found. ErrorCode: {t:${type},i:${id}}`,
            };
        // @ts-expect-error, below should work because workRequest isn't null
        await repo.remove(workRequest);
        return { status: true, resp: '' };
    }

    async getServices(page: number) {
        if (page <= 0) return { pages: 0, data: [] };
        const start = this.paginateBy * (page - 1);
        const end = this.paginateBy * page;
        const services = await this.serviceRepo.find({
            skip: start,
            take: end,
        });
        const count = await this.serviceRepo.count();
        let pages = Math.floor(count / 50);
        pages += count % this.paginateBy > 0 ? 1 : 0;
        return {
            pages: pages,
            data: services.map((service) => ({
                id: service.id,
                name: service.name,
                description: service.description,
            })),
        };
    }

    async createService(serviceDto: ServiceDto) {
        if (serviceDto.name === undefined || serviceDto.name === '') {
            return { status: false, resp: 'Invalid name' };
        }
        if (
            serviceDto.description === undefined ||
            serviceDto.description === ''
        ) {
            return { status: false, resp: 'Invalid description' };
        }
        const service = new Service();
        service.name = serviceDto.name;
        service.description = serviceDto.description;
        await this.serviceRepo.save(service);
        return { resp: '', status: true };
    }

    async updateService(id: number, serviceDto: ServiceDto) {
        const service = await this.serviceRepo.findOneBy({
            id: id,
        });
        if (!service) return { resp: `Service not found`, status: false };
        if (serviceDto.name !== undefined && serviceDto.name !== '') {
            service.name = serviceDto.name;
        }
        if (
            serviceDto.description !== undefined &&
            serviceDto.description !== ''
        ) {
            service.description = serviceDto.description;
        }
        await this.serviceRepo.save(service);
        return { resp: '', status: true };
    }

    async getService(id: number) {
        const service = await this.serviceRepo.findOneBy({ id: id });
        if (!service) {
            return null;
        }
        return {
            name: service.name,
            description: service.description,
        };
    }

    async deleteService(id: number) {
        const service = await this.workmanRepo.findOneBy({ id: id });
        if (!service) return { status: false, resp: 'service not found' };
        await this.workmanRepo.remove(service);
        return { status: true, resp: '' };
    }
}
