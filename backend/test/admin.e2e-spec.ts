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

    it('should return empty users, page out of range', async () => {
        const resp = await request(app.getHttpServer())
            .get('/admin/users/0/')
            .auth(authToken, { type: 'bearer' })
            .expect(200);
        expect(resp.body.pages).toBe(0);
        expect(resp.body.data).toEqual([]);
    });

    it('should return empty data, no users', async () => {
        const resp = await request(app.getHttpServer())
            .get('/admin/users/1/')
            .auth(authToken, { type: 'bearer' })
            .expect(200);
        expect(resp.body.pages).toBe(0);
        expect(resp.body.data).toEqual([]);
    });

    it('should return users', async () => {
        const users: User[] = [];
        const count = 200;
        for (let i = 0; i < count; i++) {
            const user = new User();
            user.email = `em${i}@mail.com`;
            user.password = 'pass-word';
            user.fullname = `F N ${i}`;
            user.apartment = `${i}B`;
            user.address = `some address ${i}`;
            user.serviceType = 1;
            users.push(user);
        }
        const repo = AppDataSource.getRepository(User);
        await repo.save(users);
        const resp = await request(app.getHttpServer())
            .get('/admin/users/1/')
            .auth(authToken, { type: 'bearer' })
            .expect(200);
        expect(resp.body.pages).toBeGreaterThanOrEqual(4);
        expect(resp.body.data.length).toBe(50);
        expect(resp.body.data[0].name).toBe('F N 0');
        expect(resp.body.data[0].email).toBe('em0@mail.com'); // ensure it exists

        const resp1 = await request(app.getHttpServer())
            .get('/admin/users/2/')
            .auth(authToken, { type: 'bearer' })
            .expect(200);
        expect(resp.body.data[0] !== resp1.body.data[0]);
        expect(resp1.body.data.length).toBe(50);
        expect(resp1.body.pages).toBeGreaterThanOrEqual(4);
    });

    it('should not created user (no email)', async () => {
        const resp = await request(app.getHttpServer())
            .post('/admin/user/')
            .auth(authToken, { type: 'bearer' })
            .expect(201);
        expect(resp.body.status).toBeFalsy();
        expect(resp.body.resp).toBe('Invalid email address');
    });

    it('should not created user (no password)', async () => {
        const resp = await request(app.getHttpServer())
            .post('/admin/user/')
            .send({ email: 'user@reaphsoft.com' })
            .auth(authToken, { type: 'bearer' })
            .expect(201);
        expect(resp.body.status).toBeFalsy();
        expect(resp.body.resp).toBe('Invalid password');
    });

    it('should not created user (no fullname)', async () => {
        const resp = await request(app.getHttpServer())
            .post('/admin/user/')
            .send({ email: 'user@reaphsoft.com', password: 'full-water' })
            .auth(authToken, { type: 'bearer' })
            .expect(201);
        expect(resp.body.status).toBeFalsy();
        expect(resp.body.resp).toBe('Invalid Fullname');
    });

    it('should not created user (no address)', async () => {
        const resp = await request(app.getHttpServer())
            .post('/admin/user/')
            .send({
                email: 'user@reaphsoft.com',
                password: 'full-water',
                fullname: 'Full Name',
            })
            .auth(authToken, { type: 'bearer' })
            .expect(201);
        expect(resp.body.status).toBeFalsy();
        expect(resp.body.resp).toBe('Invalid address');
    });

    it('should not created user (no service type)', async () => {
        const resp = await request(app.getHttpServer())
            .post('/admin/user/')
            .send({
                email: 'user@reaphsoft.com',
                password: 'full-water',
                fullname: 'Full Name',
                address: 'An address',
            })
            .auth(authToken, { type: 'bearer' })
            .expect(201);
        expect(resp.body.status).toBeFalsy();
        expect(resp.body.resp).toBe('Invalid service type');
    });

    it('should not created user (invalid service type)', async () => {
        const resp = await request(app.getHttpServer())
            .post('/admin/user/')
            .send({
                email: 'user@reaphsoft.com',
                password: 'full-water',
                fullname: 'Full Name',
                address: 'An address',
                serviceType: 0,
            })
            .auth(authToken, { type: 'bearer' })
            .expect(201);
        expect(resp.body.status).toBeFalsy();
        expect(resp.body.resp).toBe('Invalid service type');
    });

    it('should not created user (invalid service type)', async () => {
        const resp = await request(app.getHttpServer())
            .post('/admin/user/')
            .send({
                email: 'user@reaphsoft.com',
                password: 'full-water',
                fullname: 'Full Name',
                address: 'An address',
                serviceType: 3,
            })
            .auth(authToken, { type: 'bearer' })
            .expect(201);
        expect(resp.body.status).toBeFalsy();
        expect(resp.body.resp).toBe('Invalid service type');
    });

    it('should not created user (invalid apartment number)', async () => {
        const resp = await request(app.getHttpServer())
            .post('/admin/user/')
            .send({
                email: 'user@reaphsoft.com',
                password: 'full-water',
                fullname: 'Full Name',
                address: 'An address',
                serviceType: '2',
            })
            .auth(authToken, { type: 'bearer' })
            .expect(201);
        expect(resp.body.status).toBeFalsy();
        expect(resp.body.resp).toBe('Invalid apartment number');
    });

    it('should created user', async () => {
        const resp = await request(app.getHttpServer())
            .post('/admin/user/')
            .send({
                email: 'user@reaphsoft.com',
                password: 'full-water',
                fullname: 'Full Name',
                address: 'An address',
                serviceType: '2',
                apartment: 'An apartment',
            })
            .auth(authToken, { type: 'bearer' })
            .expect(201);
        expect(resp.body.status).toBeTruthy();
        expect(resp.body.resp).toBe('Account created successfully');
    });

    it('should update user', async () => {
        const user = new User();
        user.email = `user@mail.com`;
        user.password = 'pass-word';
        user.fullname = `First Name`;
        user.apartment = `12 B`;
        user.address = `some address 12`;
        user.serviceType = 1;
        const repo = AppDataSource.getRepository(User);
        await repo.save(user);

        const data = {
            fullname: 'Full Another Name',
            address: 'An address',
            serviceType: '2',
            apartment: 'An apartment',
        };
        const resp = await request(app.getHttpServer())
            .put(`/admin/user/${user.email}/`)
            .send(data)
            .auth(authToken, { type: 'bearer' })
            .expect(200);
        expect(resp.body.status).toBeTruthy();
        expect(resp.body.resp).toBeFalsy();
        const user0 = await repo.findOneBy({ email: user.email });
        expect(user0?.fullname).toBe(data.fullname);
        expect(user0?.address).toBe(data.address);
        expect(user0?.serviceType).toBe(Number.parseInt(data.serviceType));
        expect(user0?.apartment).toBe(data.apartment);
    });

    it('should get user', async () => {
        const user = new User();
        user.email = `newuser@mail.com`;
        user.password = 'pass0-word';
        user.fullname = `First Name`;
        user.apartment = `12 B`;
        user.address = `address 12`;
        user.serviceType = 1;
        const repo = AppDataSource.getRepository(User);
        await repo.save(user);

        const resp = await request(app.getHttpServer())
            .get(`/admin/user/${user.email}/`)
            .auth(authToken, { type: 'bearer' })
            .expect(200);
        expect(resp.body.email).toBe(user.email);
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
