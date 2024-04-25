// 25/04/2024 11:47
// reaphsoft-workman
// github.com/kahlflekzy

import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { User } from '../src/entities/User';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { AppDataSource } from '../src/data-source';
import { PasswordManager } from '../src/utilities/passwordmanager';
import { EstateManager } from '../src/entities/EstateManager';

describe('Auth (e2e)', () => {
    let app: INestApplication;
    let user: User;
    const passwordManager = new PasswordManager();
    const password = 'WhenYouAreMine';

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
        const repo = AppDataSource.getRepository(User);
        user = new User();
        user.email = 'user@reaphsoft.com';
        user.password = passwordManager.getHashedKey(password);
        user.fullname = 'Full Name';
        user.apartment = '18C';
        user.address = '404 Ok Street';
        user.serviceType = 1;
        user.photoURL = '';
        user = await repo.save(user);
    });

    it('log in individual', async () => {
        const repo = AppDataSource.getRepository(User);
        return request(app.getHttpServer())
            .post('/auth/login/')
            .send({
                email: user.email,
                password: password,
                account: User.accountType,
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .then(async (resp) => {
                const data = resp.body;
                expect(data.status);
                expect(data.access_token).toBeTruthy();
                expect(data.resp).toBe('');
                const user0 = await repo.findOneBy({
                    email: user.email,
                });
                const lastVisited = user0?.last_visited;
                expect(lastVisited).toBeTruthy();
                // @ts-expect-error the following line is guaranteed to be truthy
                expect(lastVisited > user.last_visited);
            });
    });

    it('log in estate', async () => {
        const repo = AppDataSource.getRepository(EstateManager);
        const user0 = new EstateManager();
        user0.email = 'manager@lovesoonestates.com';
        user0.password = passwordManager.getHashedKey(password);
        user0.fullname = 'Estate Manager';
        user0.estate = 'Love Soon Estate';
        user0.address = '51 Isabella Str., Jos North, Plateau State, Nigeria.';
        user0.serviceType = 1;
        user0.photoURL = '';
        await repo.save(user0);

        return request(app.getHttpServer())
            .post('/auth/login/')
            .send({
                email: user0.email,
                password: password,
                account: EstateManager.accountType,
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .then(async (resp) => {
                const data = resp.body;
                expect(data.status).toBe(true);
                expect(data.access_token).toBeTruthy();
                expect(data.resp).toBe('');
                const user1 = await repo.findOneBy({
                    email: user0.email,
                });
                const lastVisited = user1?.last_visited;
                expect(lastVisited).toBeTruthy();
                // @ts-expect-error the following line is guaranteed to be truthy
                expect(lastVisited > user0.last_visited);
            });
    });

    it('account type neither 1 nor 2', async () => {
        const resp = await request(app.getHttpServer())
            .post('/auth/login/')
            .send({
                email: user.email,
                password: password,
                account: 3,
            });
        expect(resp.body.resp).toBe('invalid account type');
    });

    it('no account type', async () => {
        const resp = await request(app.getHttpServer())
            .post('/auth/login/')
            .send({
                email: user.email,
                password: password,
            });
        expect(resp.body.resp).toBe('invalid account type');
    });

    it('no account type', async () => {
        const resp = await request(app.getHttpServer())
            .post('/auth/login/')
            .send({
                email: user.email,
                password: password,
            });
        expect(resp.body.resp).toBe('invalid account type');
    });

    it('no email', async () => {
        const resp = await request(app.getHttpServer())
            .post('/auth/login/')
            .send({
                password: password,
            });
        expect(resp.body.resp).toBe('invalid request');
    });

    it('no password', async () => {
        const resp = await request(app.getHttpServer())
            .post('/auth/login/')
            .send({
                email: user.email,
            });
        expect(resp.body.resp).toBe('invalid request');
    });
});
