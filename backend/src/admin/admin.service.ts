import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../data-source';
import { SuperUser } from '../entities/SuperUser';
import { PasswordManager } from '../utilities/passwordmanager';
import { User } from '../entities/User';

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
}
