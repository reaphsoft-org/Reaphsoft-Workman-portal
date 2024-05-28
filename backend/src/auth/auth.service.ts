import { Injectable, NotFoundException } from '@nestjs/common';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { PasswordManager } from '../utilities/passwordmanager';
import { EstateManager } from '../entities/EstateManager';
import { SuperUser } from '../entities/SuperUser';
import { Role } from '../roles/enum/role.enum';
import { Workman } from '../entities/Workman';

@Injectable()
export class AuthService {
    private readonly userRepository: Repository<User> =
        AppDataSource.getRepository(User);
    private readonly estateRepo: Repository<EstateManager> =
        AppDataSource.getRepository(EstateManager);
    private readonly adminRepo = AppDataSource.getRepository(SuperUser);
    private readonly workmanRepo = AppDataSource.getRepository(Workman);
    private readonly passwordManager = new PasswordManager();
    constructor(private jwtService: JwtService) {}

    async validateUser(
        email: string,
        password: string,
        account: 1 | 2,
    ): Promise<{ status: boolean; access_token: string; resp: string }> {
        try {
            const user = await this.findUserByEmail(email, account);
            // Compare the password from the request with the password stored in the database
            if (
                !this.passwordManager.comparePassword(password, user.password)
            ) {
                return {
                    status: false,
                    access_token: '',
                    resp: 'invalid password',
                };
            }
            const payload = { sub: user.id, email: user.email, type: account };
            const date = new Date();
            user.last_visited = date.toISOString();
            if (account == User.accountType)
                await this.userRepository.save(user, { reload: true });
            else await this.estateRepo.save(user, { reload: true });
            return {
                status: true,
                access_token: await this.jwtService.signAsync(payload),
                resp: '',
            };
        } catch (error) {
            // Handle errors
            const acc = account == User.accountType ? 'Individual' : 'Estate';
            return {
                status: false,
                access_token: '',
                resp: `${acc} user not found`,
            };
        }
    }
    async findUserByEmail(
        email: string,
        account: number,
    ): Promise<User | EstateManager> {
        const repo = account == 1 ? this.userRepository : this.estateRepo;
        const user = await repo.findOneBy({ email: email });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }
    /*
     * Passing an admin value of false will attempt to log in as a worker.
     * Default is true.
     * */
    async login(
        email: string,
        password: string,
        admin: boolean = true,
    ): Promise<{ status: boolean; access_token: string; resp: string }> {
        const user = admin
            ? await this.adminRepo.findOneBy({ email: email })
            : await this.workmanRepo.findOneBy({ email: email });
        if (!user)
            return { status: false, access_token: '', resp: 'User not found' };
        if (!this.passwordManager.comparePassword(password, user.password)) {
            return {
                status: false,
                access_token: '',
                resp: 'Invalid password',
            };
        }
        const role = admin ? Role.Admin : Role.Workman;
        const payload = { email: user.email, roles: [role] };
        const date = new Date();
        user.last_visited = date.toISOString();
        if (admin) await this.adminRepo.save(user);
        else await this.workmanRepo.save(user);
        try {
            const accessToken = await this.jwtService.signAsync(payload);
            return {
                status: true,
                access_token: accessToken,
                resp: '',
            };
        } catch (e) {
            return {
                status: false,
                access_token: '',
                resp: 'Error at server. Code S-K-N-S', // secret key not set
            };
        }
    }
}
