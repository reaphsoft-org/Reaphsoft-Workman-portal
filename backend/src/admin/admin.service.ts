import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../data-source';
import { SuperUser } from '../entities/SuperUser';
import { JwtService } from '@nestjs/jwt';
import { PasswordManager } from '../utilities/passwordmanager';

@Injectable()
export class AdminService {
    private readonly adminRepo = AppDataSource.getRepository(SuperUser);
    private readonly passwordManager = new PasswordManager();
    constructor(private jwtService: JwtService) {}
    async login(
        email: string,
        password: string,
    ): Promise<{ status: boolean; access_token: string; resp: string }> {
        const user = await this.adminRepo.findOneBy({ email: email });
        if (!user)
            return { status: false, access_token: '', resp: 'user not found' };
        if (!this.passwordManager.comparePassword(password, user.password)) {
            return {
                status: false,
                access_token: '',
                resp: 'invalid password',
            };
        }
        const payload = { email: user.email };
        const date = new Date();
        user.last_visited = date.toISOString();
        await this.adminRepo.save(user);
        return {
            status: false,
            access_token: await this.jwtService.signAsync(payload),
            resp: 'user not found',
        };
    }
}
