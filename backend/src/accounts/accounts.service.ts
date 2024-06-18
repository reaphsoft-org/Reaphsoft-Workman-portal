import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
import Email from '../utilities/mailman';
import { UserDto } from './dto/user.dto';
import { PasswordDto } from './dto/password.dto';
import { PasswordDto as AdminPasswordDto } from '../admin/dto/password.dto';
import { CreateEstateDto } from './dto/create-estate.dto';
import { EstateManager } from '../entities/EstateManager';
import { PasswordManager } from '../utilities/passwordmanager';
import { UpdateEstateManagerDto, UpdateUserDto } from './dto/update.dto';
import { EstateDto } from './dto/estate.dto';
import { House } from '../entities/House';
import { TokenDto } from './dto/token.dto';
import { SuperUser } from '../entities/SuperUser';
import { Workman } from '../entities/Workman';
import { VerificationToken } from '../entities/BaseUser';

@Injectable()
export class AccountsService {
    private readonly uploadPath = 'media/u';
    private readonly usersRepo = AppDataSource.getRepository(User);
    private readonly estateManagersRepo =
        AppDataSource.getRepository(EstateManager);
    private readonly adminRepo = AppDataSource.getRepository(SuperUser);
    private readonly workmanRepo = AppDataSource.getRepository(Workman);
    private readonly passwordManager = new PasswordManager();
    async createIndividualAccount(createUserDto: CreateUserDto, file: any) {
        return this.createAccount(createUserDto, file, User.accountType);
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
            const user = await this.usersRepo.findOneBy({
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
            const user = await this.estateManagersRepo.findOneBy({
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
        user.fullname = this.toTitleCase(updateUserDto.fullname);
        user.serviceType = updateUserDto.serviceType;
        await this.usersRepo.save(user);
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
            user = await this.usersRepo.findOneBy({
                email: email,
            });
        } else {
            user = await this.estateManagersRepo.findOneBy({
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
        if (type == User.accountType) await this.usersRepo.save(user);
        else await this.estateManagersRepo.save(user);
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
        try {
            /*
             * Unfortunately, I have to save object twice
             * Case 1
             * Attempt to save the object.
             * If successful, attempt to save the photo,
             * If successful, save the object again, this time setting the photoURL
             *
             * Case 2
             * Attempt to save the object, if unsuccessful, simply exit
             *
             * Case 3 Attempt to save object,
             * If successful, attempt to save photo
             * If unsuccessful, simply exit.
             * */
            if (type == User.accountType) await this.usersRepo.save(object);
            else await this.estateManagersRepo.save(object);
            await object.saveFile(
                file,
                type == User.accountType ? 'user' : 'estate',
            );
            if (object.photoURL !== '') {
                if (type == User.accountType) await this.usersRepo.save(object);
                else await this.estateManagersRepo.save(object);
            }
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
        user.fullname = this.toTitleCase(updateEstateManagerDto.fullname);
        user.serviceType = updateEstateManagerDto.serviceType;
        await this.estateManagersRepo.save(user);
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

    async setRegistrationToken(
        tokenDto: TokenDto,
        email: string,
        code: string,
    ) {
        const user = await this.getUserForUpdate(code, email);
        if (!user) {
            return {
                status: false,
                resp: `User not found ${email} (c#${code}#)`,
            };
        }
        user.registrationToken = tokenDto.token;
        return await this.saveUpdatedUser(code, user);
    }

    private async getUserForUpdate(
        code: string,
        email: string,
        active: boolean = false,
        relations: object = {},
    ) {
        let user: SuperUser | User | EstateManager | Workman | null;
        switch (code) {
            case '00':
                user = await this.adminRepo.findOne({
                    where: { email: email },
                    relations: relations,
                });
                break;
            case '11':
                user = await this.usersRepo.findOne({
                    where: { email: email },
                    relations: relations,
                });
                break;
            case '22':
                user = await this.estateManagersRepo.findOne({
                    where: { email: email },
                    relations: relations,
                });
                break;
            case '33':
                user = await this.workmanRepo.findOne({
                    where: { email: email },
                    relations: relations,
                });
                break;
            default:
                return null;
        }
        if (active && !user?.active) return null;
        return user;
    }

    async changePhoto(file: any, code: string, email: string) {
        const user = await this.getUserForUpdate(code, email);
        if (!user) {
            return {
                status: false,
                resp: `User not found ${email} (c#${code}#)`,
            };
        }
        await user.saveFile(file);
        return await this.saveUpdatedUser(code, user);
    }

    async changePasswordAdmin(
        email: string,
        code: string,
        passwordDto: AdminPasswordDto,
    ) {
        const user = await this.getUserForUpdate(code, email);
        if (!user) {
            return {
                status: false,
                resp: `User not found ${email} (c#${code}#)`,
            };
        }
        user.password = passwordDto.password;
        const check = user.baseValidations();
        if (!check.status) {
            return check;
        }
        user.setValues(true);
        return await this.saveUpdatedUser(code, user);
    }

    private async saveUpdatedUser(
        code: string,
        user: SuperUser | User | EstateManager | Workman,
    ) {
        switch (code) {
            case '00':
                await this.adminRepo.save(user as SuperUser);
                break;
            case '11':
                await this.usersRepo.save(user as User);
                break;
            case '22':
                await this.estateManagersRepo.save(user as EstateManager);
                break;
            case '33':
                await this.workmanRepo.save(user as Workman);
                break;
        }
        return { status: true, resp: '' };
    }

    /*
     * User must be active, ie, user.active is true
     * */
    async requestPasswordReset(email: string, code: string) {
        const user = await this.getUserForUpdate(code, email, true, {
            verificationToken: true,
        });
        if (!user) {
            throw new BadRequestException(
                `User not found ${email} (c#${code}#at#)`,
            );
        }
        const verificationToken =
            user.verificationToken ?? new VerificationToken();
        const token = verificationToken.generateRandomString();
        // todo send the above token via email.
        verificationToken.setToken(token);
        user.verificationToken = verificationToken;
        return await this.saveUpdatedUser(code, user);
    }
}
