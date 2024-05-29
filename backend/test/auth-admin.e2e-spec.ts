// 27/04/2024 20:38
// reaphsoft-workman
// github.com/kahlflekzy

import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PasswordManager } from '../src/utilities/passwordmanager';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { AppDataSource } from '../src/data-source';
import { SuperUser } from '../src/entities/SuperUser';

describe('AdminAuth (e2e)', () => {
    let app: INestApplication;
    const user: SuperUser = new SuperUser();
    const passwordManager = new PasswordManager();
    const password = 'WhenYouAreMine';
    const api = '/auth/admin/login/';

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
        const repo = AppDataSource.getRepository(SuperUser);
        user.email = 'admin@reaphsoft.com';
        user.password = passwordManager.getHashedKey(password);
        user.fullname = 'Full Name';
        user.photoURL = '';
        await repo.save(user);
    });

    it('should login', async () => {
        const resp = await request(app.getHttpServer())
            .post(api)
            .send({
                email: user.email,
                password: password,
            })
            .expect(201);
        const data = resp.body;
        expect(data.status).toBe(true);
        expect(data.access_token).toBeTruthy();
        expect(data.resp).toBeFalsy();
    });
    it('should not login (no email password)', async () => {
        const resp = await request(app.getHttpServer()).post(api).expect(201);
        const data = resp.body;
        expect(data.status).toBe(false);
        expect(data.access_token).toBeFalsy();
        expect(data.resp).toBe('invalid request');
    });
    it('should not login (nonexistent user)', async () => {
        const resp = await request(app.getHttpServer())
            .post(api)
            .send({
                email: 'user.email',
                password: 'password',
            })
            .expect(201);
        const data = resp.body;
        expect(data.status).toBe(false);
        expect(data.access_token).toBeFalsy();
        expect(data.resp).toBe('User not found');
    });
    it('should not login (wrong password)', async () => {
        const resp = await request(app.getHttpServer())
            .post(api)
            .send({
                email: user.email,
                password: 'password',
            })
            .expect(201);
        const data = resp.body;
        expect(data.status).toBe(false);
        expect(data.access_token).toBeFalsy();
        expect(data.resp).toBe('Invalid password');
    });
});
