// 28/04/2024 13:40
// reaphsoft-workman
// github.com/kahlflekzy

import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { SuperUser } from '../src/entities/SuperUser';
import { PasswordManager } from '../src/utilities/passwordmanager';
import { AppDataSource } from '../src/data-source';
import { User } from '../src/entities/User';
import { EstateManager } from '../src/entities/EstateManager';
import { Repository } from 'typeorm';

describe('Admin (e2e)', () => {
    let app: INestApplication;
    const superUser: SuperUser = new SuperUser();
    const passwordManager = new PasswordManager();
    const password = 'WhenYouAreMine2';
    const adminAuthLink = '/auth/admin/login/';
    let authToken: string;
    let adminRepo: Repository<SuperUser>;

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
        adminRepo = AppDataSource.getRepository(SuperUser);
        superUser.email = 'admin@reaphsoft.com';
        superUser.password = passwordManager.getHashedKey(password);
        superUser.fullname = 'Admin Man';
        superUser.photoURL = '';
        await adminRepo.save(superUser);
        authToken = await login(superUser, password, app, adminAuthLink);
    });

    it('should be able to access', async () => {
        await request(app.getHttpServer())
            .get('/admin/users/1/')
            .auth(authToken, { type: 'bearer' })
            .expect(200);
    });

    it('individual user should not be able to access', async () => {
        const user = new User();
        user.email = 'em@mail.com';
        const password1 = 'mPassworD';
        user.password = passwordManager.getHashedKey(password1);
        user.fullname = 'F N';
        user.apartment = '1B';
        user.address = 'some address';
        user.serviceType = 1;
        const repo = AppDataSource.getRepository(User);
        await repo.save(user);
        const token = await login(user, password1, app, '/auth/login/');
        const resp = await request(app.getHttpServer())
            .get('/admin/users/1/')
            .auth(token, { type: 'bearer' });
        // forbidden resource for normal users
        expect(resp.body.statusCode == 403).toBe(true);
    });

    it('estate managers should not be able to access', async () => {
        const user = new EstateManager();
        user.email = 'em@mail.com';
        const password1 = 'mPassworD';
        user.password = passwordManager.getHashedKey(password1);
        user.fullname = 'F N';
        user.estate = 'Sunshine';
        user.address = 'some address';
        user.serviceType = 1;
        const repo = AppDataSource.getRepository(EstateManager);
        await repo.save(user);
        const token = await login(user, password1, app, '/auth/login/', 2);
        const resp = await request(app.getHttpServer())
            .get('/admin/users/1/')
            .auth(token, { type: 'bearer' });
        // forbidden resource for normal users
        expect(resp.body.statusCode == 403).toBe(true);
    });

    it('should get admin', async () => {
        const resp = await request(app.getHttpServer())
            .get('/admin/m/')
            .auth(authToken, { type: 'bearer' })
            .expect(200);
        expect(resp.body.email).toBe(superUser.email);
    });

    it('should update admin (no put data)', async () => {
        const resp = await request(app.getHttpServer())
            .put('/admin/m/')
            .auth(authToken, { type: 'bearer' })
            .expect(200);
        expect(resp.body.status).toBe(true);
    });

    it('should update admin (fullname)', async () => {
        const fullname = 'Updated Admin';
        const resp = await request(app.getHttpServer())
            .put('/admin/m/')
            .send({ fullname: fullname })
            .auth(authToken, { type: 'bearer' })
            .expect(200);
        expect(resp.body.status).toBe(true);
        const updatedUser = await adminRepo.findOneBy({
            email: superUser.email,
        });
        expect(updatedUser?.fullname).toBe(fullname);
    });

    it('should not update admin (no old password)', async () => {
        const password = 'Updated Admin';
        const resp = await request(app.getHttpServer())
            .put('/admin/m/')
            .send({ new_password: password })
            .auth(authToken, { type: 'bearer' })
            .expect(200);
        expect(resp.body.status).toBeFalsy();
        expect(resp.body.resp).toBe('old password is required');
    });

    it('should not update admin (wrong old password)', async () => {
        const password1 = 'Updated Admin';
        const resp = await request(app.getHttpServer())
            .put('/admin/m/')
            .send({ new_password: password1, old_password: password1 })
            .auth(authToken, { type: 'bearer' })
            .expect(200);
        expect(resp.body.status).toBeFalsy();
        expect(resp.body.resp).toBe('incorrect old password');
    });

    it('should not update admin (same new & old password)', async () => {
        const resp = await request(app.getHttpServer())
            .put('/admin/m/')
            .send({ new_password: password, old_password: password })
            .auth(authToken, { type: 'bearer' })
            .expect(200);
        expect(resp.body.status).toBeFalsy();
        expect(resp.body.resp).toBe(
            'Your new password must be different to your old password',
        );
    });

    it('should update admin (password)', async () => {
        const new_password = 'El-Shaddai';
        const resp = await request(app.getHttpServer())
            .put('/admin/m/')
            .send({ new_password: new_password, old_password: password })
            .auth(authToken, { type: 'bearer' })
            .expect(200);
        expect(resp.body.status).toBeTruthy();
        expect(resp.body.resp).toBe('');
        const updatedUser = await adminRepo.findOneBy({
            email: superUser.email,
        });
        expect(updatedUser?.checkPassword(new_password)).toBeTruthy();
        expect(updatedUser?.password !== superUser.password).toBe(true);
        await adminRepo.save(superUser);
    });
});

async function login(
    user: SuperUser | User | EstateManager,
    password: string,
    app: INestApplication,
    link: string,
    account: number = 1,
) {
    let token: string = '';
    await request(app.getHttpServer())
        .post(link)
        .send({ email: user.email, password: password, account: account })
        .expect(201)
        .then((resp) => {
            const data = resp.body;
            expect(data.status).toBe(true);
            expect(data.access_token).toBeTruthy();
            token = data.access_token;
        });
    return token;
}
