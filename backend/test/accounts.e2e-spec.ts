// 05/06/2024 08:49
// reaphsoft-workman
// github.com/kahlflekzy

import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { AppDataSource } from '../src/data-source';
import { User } from '../src/entities/User';
import { Repository } from 'typeorm';
import { createUser } from './utils/utils';
import * as request from 'supertest';

describe('Accounts (e2e)', () => {
    let app: INestApplication;
    let user: User;
    const password = 'AnonPasswo!@@###';
    let userRepo: Repository<User>;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleRef.createNestApplication();
        await app.init();

        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize().catch((e) => {
                console.log(e);
            });
        }
        userRepo = AppDataSource.getRepository(User);
        user = createUser('accounts0individual', password);
        user = await userRepo.save(user);
    });

    it('requestPasswordReset:#invalidCode', async () => {
        const resp = await request(app.getHttpServer())
            .put('/account/reset/password/44/test@reaphsoft.com/')
            .expect(400);
        expect(resp.body.message).toBe('Invalid request.');
    });
});
