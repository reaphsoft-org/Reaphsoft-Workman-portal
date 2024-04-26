import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../data-source';
import { SuperUser } from '../entities/SuperUser';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
    private readonly adminRepo = AppDataSource.getRepository(SuperUser);
    constructor(private jwtService: JwtService) {}
    async login(email: string, password: string) {}
}
