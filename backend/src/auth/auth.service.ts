import { Injectable, NotFoundException } from '@nestjs/common';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { PasswordManager } from '../utilities/passwordmanager';

@Injectable()
export class AuthService {
    private readonly userRepository: Repository<User> =
        AppDataSource.getRepository(User);
    private readonly passwordManager = new PasswordManager();
    constructor(private jwtService: JwtService) {}

    async validateUser(
        email: string,
        password: string,
    ): Promise<{ status: boolean; access_token: string; resp: string }> {
        try {
            const user = await this.findUserByEmail(email);
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
            const payload = { sub: user.id, username: user.email };
            const date = new Date();
            user.last_visited = date.toISOString();
            await this.userRepository.save(user, { reload: true });
            return {
                status: true,
                access_token: await this.jwtService.signAsync(payload),
                resp: '',
            };
        } catch (error) {
            // Handle errors
            return {
                status: false,
                access_token: '',
                resp: 'user not found',
            };
        }
    }
    async findUserByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findOneBy({ email: email });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }
}
