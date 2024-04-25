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

describe('Auth (e2e)', () => {
    let app: INestApplication;
    let classBasedUser: User;
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
        classBasedUser = new User();
        classBasedUser.email = 'user@reaphsoft.com';
        classBasedUser.password = passwordManager.getHashedKey(password);
        classBasedUser.fullname = 'Full Name';
        classBasedUser.apartment = '18C';
        classBasedUser.address = '404 Ok Street';
        classBasedUser.serviceType = 1;
        classBasedUser.photoURL = '';
        classBasedUser = await repo.save(classBasedUser);
    });

    it('should log in', async () => {
        const repo = AppDataSource.getRepository(User);
        return request(app.getHttpServer())
            .post('/auth/login/')
            .send({ email: classBasedUser.email, password: password })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .then(async (resp) => {
                const data = resp.body;
                console.log(data.access_token);
                expect(data.status);
                expect(data.access_token).toBeTruthy();
                expect(data.resp).toBe('');
                const user = await repo.findOneBy({
                    email: classBasedUser.email,
                });
                const lastVisited = user?.last_visited;
                expect(lastVisited).toBeTruthy();
                // @ts-expect-error the following line is guaranteed to be truthy
                expect(lastVisited > classBasedUser.last_visited);
            });
    });
});
