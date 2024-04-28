import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../data-source';
import { SuperUser } from '../entities/SuperUser';
import { PasswordManager } from '../utilities/passwordmanager';

@Injectable()
export class AdminService {
    private readonly adminRepo = AppDataSource.getRepository(SuperUser);
    private readonly passwordManager = new PasswordManager();
}
