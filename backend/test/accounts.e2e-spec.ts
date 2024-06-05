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
import { VerificationToken } from '../src/entities/BaseUser';

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
    it('requestPasswordReset:#userNotFound', async () => {
        const resp = await request(app.getHttpServer())
            .put(`/account/reset/password/11/test0123@reaphsoft.com/`)
            .expect(400);
        expect(resp.body.message).toBe(
            'User not found test0123@reaphsoft.com (c#11#at#)',
        );
    });
    it('requestPasswordReset:#userNotActive', async () => {
        const user0 = await userRepo.findOneBy({ email: user.email });
        expect(user0?.active).toBe(false);
        const resp = await request(app.getHttpServer())
            .put(`/account/reset/password/11/${user.email}/`)
            .expect(400);
        expect(resp.body.message).toBe(
            `User not found ${user.email} (c#11#at#)`,
        );
    });
    it('requestPasswordReset:#userActive', async () => {
        const user0 = createUser('account0active', 'p-xxx3241');
        user0.active = true;
        await userRepo.save(user0);
        const resp = await request(app.getHttpServer())
            .put(`/account/reset/password/11/${user0.email}/`)
            .expect(200);
        expect(resp.body.status).toBe(true);
        expect(resp.body.resp).toBe('');
        const user1 = await userRepo.findOne({
            where: { email: user0.email },
            relations: { verificationToken: true },
        });
        expect(user1?.verificationToken).toBeTruthy();
        expect(user1?.verificationToken.id).toBeGreaterThanOrEqual(1);
    });
    it('requestPasswordReset:#verificationTokenRecycled', async () => {
        let user0: User | null = createUser('account1active', 'p-xxx3241');
        user0.active = true;
        const vToken = new VerificationToken();
        vToken.setToken(vToken.generateRandomString());
        user0.verificationToken = vToken;
        await userRepo.save(user0);
        const resp = await request(app.getHttpServer())
            .put(`/account/reset/password/11/${user0?.email}/`)
            .expect(200);
        expect(resp.body.status).toBe(true);
        user0 = await userRepo.findOne({
            where: { email: user0?.email },
            relations: { verificationToken: true },
        });
        expect(user0?.verificationToken).toBeTruthy();
        expect(user0?.verificationToken.id).toBe(vToken.id);
    });
});
