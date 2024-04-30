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

describe('Admin (e2e)', () => {
    let app: INestApplication;
    const superUser: SuperUser = new SuperUser();
    const passwordManager = new PasswordManager();
    const password = 'WhenYouAreMine2';
    const adminAuthLink = '/auth/admin/login/';

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
        superUser.email = 'admin@reaphsoft.com';
        superUser.password = passwordManager.getHashedKey(password);
        superUser.fullname = 'Admin ';
        superUser.photoURL = '';
        await repo.save(superUser);
    });

    it('should be able to access', async () => {
        const token = await login(superUser, password, app, adminAuthLink);
        await request(app.getHttpServer())
            .get('/admin/users/1/')
            .auth(token, { type: 'bearer' })
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
