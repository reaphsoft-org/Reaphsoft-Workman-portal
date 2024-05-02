import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
import * as fs from 'fs';
import * as path from 'path';
import { MEDIA_DIR } from '../app.module';
import { Email } from '../utilities/mailman';
import { UserDto } from './dto/user.dto';
import { PasswordDto } from './dto/password.dto';
import { CreateEstateDto } from './dto/create-estate.dto';
import { EstateManager } from '../entities/EstateManager';
import { PasswordManager } from '../utilities/passwordmanager';
import { UpdateEstateManagerDto, UpdateUserDto } from './dto/update.dto';
import { EstateDto } from './dto/estate.dto';
import { House } from '../entities/House';

@Injectable()
export class AccountsService {
    private readonly uploadPath = 'media/u';
    private readonly userRepository = AppDataSource.getRepository(User);
    private readonly estateRepository =
        AppDataSource.getRepository(EstateManager);
    private readonly passwordManager = new PasswordManager();
    async createIndividualAccount(createUserDto: CreateUserDto, file: any) {
        return this.createAccount(createUserDto, file, User.accountType);
    }

    async savePhoto(
        photo: Express.Multer.File,
        filename: string,
    ): Promise<string> {
        const fullPath = path.join(MEDIA_DIR, filename);
        let imgPath = path.join(this.uploadPath, filename);
        fs.writeFile(fullPath, photo.buffer, (err) => {
            if (err) {
                imgPath = '';
            }
        });
        return imgPath;
    }

    async sendAgreement(user: User | EstateManager, filePath: string) {
        const email = new Email();
        const resp = await email.sendTextMailWithAttachment(
            user.email,
            'Reaphsoft Workmen Contractual Agreement',
            `Dear ${user.fullname},\n\nThank you for creating an account with us. Here is an official contractual agreement between us which is binding whenever you use our services.\n\nWarm Regards\nReaphsoft Workmen`,
            '',
            filePath,
        );
        return { status: resp };
    }

    toTitleCase(str: string): string {
        return str.replace(/\w\S*/g, function (txt: string) {
            return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
        });
    }

    generalValidation(dto: CreateUserDto | CreateEstateDto) {
        if (
            dto.email === undefined ||
            dto.email === '' ||
            !dto.email.includes('@')
        ) {
            return { status: false, resp: 'Invalid email address' };
        }
        if (dto.password === undefined || dto.password === '') {
            // add other password validation
            return { status: false, resp: 'Invalid password' };
        }
        if (dto.fullname === undefined || dto.fullname === '') {
            return { status: false, resp: 'Invalid Fullname' };
        }
        if (dto.address === undefined || dto.address === '') {
            return { status: false, resp: 'Invalid address' };
        }
        if (
            dto.serviceType === undefined ||
            dto.serviceType < 1 ||
            dto.serviceType > 2
        ) {
            return { status: false, resp: 'Invalid service type' };
        }
        return { status: true, resp: '' };
    }

    validateUser(createUserDto: CreateUserDto): {
        resp: string;
        status: boolean;
    } {
        const check = this.generalValidation(createUserDto);
        if (!check.status) return check;
        if (
            createUserDto.apartment === undefined ||
            createUserDto.apartment === ''
        ) {
            return { status: false, resp: 'Invalid apartment number' };
        }
        return { status: true, resp: '' };
    }

    validateEstateAccount(createEstateDto: CreateEstateDto): {
        resp: string;
        status: boolean;
    } {
        const check = this.generalValidation(createEstateDto);
        if (!check.status) return check;
        if (
            createEstateDto.estate === undefined ||
            createEstateDto.estate === ''
        ) {
            return { status: false, resp: 'Invalid estate name' };
        }
        return { status: true, resp: '' };
    }

    async getUser(
        email: string,
        type: number,
    ): Promise<UserDto | EstateDto | null> {
        if (type === User.accountType) {
            const user = await this.userRepository.findOneBy({
                email: email,
            });
            if (!user) {
                return null;
            }
            const userDto = new UserDto();
            userDto.apartment = user.apartment;
            userDto.accountType = User.accountType;
            userDto.address = user.address;
            userDto.email = user.email;
            userDto.fullname = user.fullname;
            userDto.photoURL = user.photoURL;
            userDto.serviceType = user.serviceType;
            return userDto;
        } else {
            const user = await this.estateRepository.findOneBy({
                email: email,
            });
            if (!user) {
                return null;
            }
            const userDto = new EstateDto();
            userDto.estate = user.estate;
            userDto.accountType = EstateManager.accountType;
            userDto.address = user.address;
            userDto.email = user.email;
            userDto.fullname = user.fullname;
            userDto.photoURL = user.photoURL;
            userDto.serviceType = user.serviceType;
            userDto.houses = await this.getRecentHouses(user);
            return userDto;
        }
    }

    async updateUser(
        email: string,
        updateUserDto: UpdateUserDto,
    ): Promise<{
        resp: string;
        status: boolean;
    }> {
        const check = this.validateUserUpdateDto(updateUserDto);
        if (!check.status) {
            return check;
        }
        const user = await this.userRepository.findOneBy({
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
        user.fullname = this.toTitleCase(updateUserDto.fullname);
        user.serviceType = updateUserDto.serviceType;
        await this.userRepository.save(user);
        return { resp: '', status: true };
    }

    generalUpdateValidation(dto: UpdateEstateManagerDto | UpdateUserDto) {
        if (dto.address === undefined || dto.address === '') {
            return { status: false, resp: 'Invalid address' };
        }
        if (dto.fullname === undefined || dto.fullname === '') {
            return { status: false, resp: 'Invalid Fullname' };
        }
        if (
            dto.serviceType === undefined ||
            dto.serviceType < 1 ||
            dto.serviceType > 2
        ) {
            return { status: false, resp: 'Invalid service type' };
        }
        return { status: true, resp: '' };
    }
    validateUserUpdateDto(userDto: UpdateUserDto): {
        resp: string;
        status: boolean;
    } {
        const check = this.generalUpdateValidation(userDto);
        if (!check.status) return check;
        if (userDto.apartment === undefined || userDto.apartment === '') {
            return { status: false, resp: 'Invalid apartment number' };
        }
        return { status: true, resp: '' };
    }

    async changePassword(email: string, type: 1 | 2, passwordDto: PasswordDto) {
        let user: User | EstateManager | null;
        if (type == 1) {
            user = await this.userRepository.findOneBy({
                email: email,
            });
        } else {
            user = await this.estateRepository.findOneBy({
                email: email,
            });
        }
        if (!user) {
            return {
                resp: `No user was found with the email ${email}`,
                status: false,
            };
        }
        if (
            !this.passwordManager.comparePassword(
                passwordDto.old_password,
                user.password,
            )
        ) {
            return {
                resp: `Incorrect Old Password`,
                status: false,
            };
        }
        if (passwordDto.old_password == passwordDto.new_password) {
            return {
                resp: `Your new password must be different to your old password`,
                status: false,
            };
        }
        if (
            passwordDto.new_password === undefined ||
            passwordDto.new_password === ''
            // add other password validation
        ) {
            return { status: false, resp: 'Invalid new password' };
        }
        this.setPassword(user, passwordDto.new_password);
        if (type == User.accountType) await this.userRepository.save(user);
        else await this.estateRepository.save(user);
        return { resp: '', status: true };
    }

    async createEstateAccount(createEstateDto: CreateEstateDto, file: any) {
        return this.createAccount(
            createEstateDto,
            file,
            EstateManager.accountType,
        );
    }

    async createAccount(
        dto: CreateEstateDto | CreateUserDto,
        file: any,
        type: number,
    ) {
        if (Object.keys(dto).length === 0) {
            return {
                resp: 'You did not post any registration data',
                status: false,
            };
        }
        const check =
            type == User.accountType
                ? this.validateUser(<CreateUserDto>dto)
                : this.validateEstateAccount(<CreateEstateDto>dto);
        if (!check.status) {
            return check;
        }
        const object: User | EstateManager =
            type == User.accountType ? new User() : new EstateManager();
        object.email = dto.email;
        this.setPassword(object, dto.password);
        object.fullname = this.toTitleCase(dto.fullname.trim());
        object.address = dto.address;
        object.serviceType = dto.serviceType;
        object.photoURL = '';
        if (type == User.accountType) {
            const f = (obj: User, data: CreateUserDto) => {
                obj.apartment = data.apartment;
            };
            f(<User>object, <CreateUserDto>dto);
        } else {
            const f = (obj: EstateManager, data: CreateEstateDto) => {
                obj.estate = data.estate;
            };
            f(<EstateManager>object, <CreateEstateDto>dto);
        }
        if (file != null && file.mimetype.startsWith('image/')) {
            // todo add test case for when a object posts a file which doesn't have an image mime type
            // todo test for jpegs, currently tests for png
            const extension: string = file.originalname.split('.').pop();
            const filename =
                object.email.replace('@', '').replace('.', '-') +
                `.${extension}`;
            object.photoURL = await this.savePhoto(file, filename);
        }
        try {
            if (type == User.accountType)
                await this.userRepository.save(object);
            else await this.estateRepository.save(object);
        } catch (e) {
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
            // log e.message
            return {
                resp: 'An error was encountered while trying to save the object. Please refresh the page and try again.',
                status: false,
            };
        }
        // const email = new Email();
        // await email.sendAccountCreateMail(object);
        return { resp: 'Account created successfully', status: true };
    }

    setPassword(obj: User | EstateManager, password: string) {
        obj.password = this.passwordManager.getHashedKey(password);
    }

    async updateEstateManager(
        email: string,
        updateEstateManagerDto: UpdateEstateManagerDto,
    ) {
        const check = this.validateEstateUpdateDto(updateEstateManagerDto);
        if (!check.status) return check;
        const user = await this.estateRepository.findOneBy({
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
        user.fullname = this.toTitleCase(updateEstateManagerDto.fullname);
        user.serviceType = updateEstateManagerDto.serviceType;
        await this.estateRepository.save(user);
        return { resp: '', status: true };
    }

    private validateEstateUpdateDto(dto: UpdateEstateManagerDto) {
        const check = this.generalUpdateValidation(dto);
        if (!check.status) return check;
        if (dto.estate === undefined || dto.estate === '') {
            return { status: false, resp: 'Invalid apartment number' };
        }
        return { status: true, resp: '' };
    }

    async getRecentHouses(estateManager: EstateManager) {
        const repo = AppDataSource.getRepository(House);
        const houses = await repo.find({
            where: {
                manager: {
                    id: estateManager.id,
                },
            },
            skip: 0,
            take: 10,
            order: {
                name: 'ASC',
            },
        });
        return houses.map((house) => ({
            id: house.id,
            number: house.number,
            name: house.name,
        }));
    }
}
