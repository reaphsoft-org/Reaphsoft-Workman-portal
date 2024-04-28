import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../data-source';
import { SuperUser } from '../entities/SuperUser';
import { PasswordManager } from '../utilities/passwordmanager';
import { User } from '../entities/User';
import { CreateUserDto } from '../accounts/dto/create-user.dto';
import { Email } from '../utilities/mailman';

@Injectable()
export class AdminService {
    paginateBy = 50;
    private readonly adminRepo = AppDataSource.getRepository(SuperUser);
    private readonly usersRepo = AppDataSource.getRepository(User);
    private readonly passwordManager = new PasswordManager();

    async getUsers(page: number) {
        if (page <= 0) return { pages: 0, data: [] };
        const start = 50 * (page - 1);
        const end = 50 * page;
        const users = await this.usersRepo.find({
            skip: start,
            take: end,
            order: {
                fullname: 'ASC',
            },
        });
        const count = await this.usersRepo.count();
        let pages = Math.floor(count / 50);
        pages += count % 50 > 0 ? 1 : 0;
        return {
            pages: pages,
            data: users.map((user) => ({
                email: user.email,
                name: user.fullname,
                address: user.address,
            })),
        };
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
}
