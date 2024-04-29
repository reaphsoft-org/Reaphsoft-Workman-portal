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

@Injectable()
export class AdminService {
    paginateBy = 50;
    private readonly adminRepo = AppDataSource.getRepository(SuperUser);
    private readonly usersRepo = AppDataSource.getRepository(User);
    private readonly estateManagersRepo =
        AppDataSource.getRepository(EstateManager);
    private readonly workmanRepo = AppDataSource.getRepository(Workman);
    private readonly serviceRepo = AppDataSource.getRepository(Service);

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
        const end = this.paginateBy * page;
        const users = await repo.find({
            skip: start,
            take: end,
            order: {
                fullname: 'ASC',
            },
        });
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
        if (!user) return { status: false, resp: 'user not found' };
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
            await this.usersRepo.save(workman);
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
}
