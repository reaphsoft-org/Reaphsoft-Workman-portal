// 29/05/2024 07:54
// reaphsoft-workman
// github.com/kahlflekzy

import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { AppDataSource } from '../src/data-source';
import { Repository } from 'typeorm';
import { User } from '../src/entities/User';
import { EstateManager } from '../src/entities/EstateManager';
import { EstateRequest, UserRequest } from '../src/entities/Request';
import { Service } from '../src/entities/Service';
import { Workman } from '../src/entities/Workman';
import { ClientRating } from '../src/entities/rating';

describe('Workman (e2e)', () => {
    let app: INestApplication;
    let userRepo: Repository<User>;
    let estateRepo: Repository<EstateManager>;
    let uRequestRepo: Repository<UserRequest>;
    let eRequestRepo: Repository<EstateRequest>;
    let serviceRepo: Repository<Service>;
    let workmanRepo: Repository<Workman>;
    let clientRatingRepo: Repository<ClientRating>;
    let cUser: User;
    let cEstate: EstateManager;
    const defaultPassword = '1234xx%%%%12@';
    let service: Service;
    let workman: Workman;
    let userWorkRequest: UserRequest;
    let token: string;
    const data = { stars: 5, comment: 'a comment' };

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
        cUser = new User();
        cUser.email = 'classBasedUser@reaphsoft-test.com';
        cUser.password = defaultPassword;
        cUser.fullname = 'Full Initial Name';
        cUser.apartment = '16C';
        cUser.address = '39 Ok Street';
        cUser.serviceType = 1;
        cUser.photoURL = '';
        cUser.setValues(true);
        cUser = await userRepo.save(cUser);

        estateRepo = AppDataSource.getRepository(EstateManager);
        serviceRepo = AppDataSource.getRepository(Service);
        workmanRepo = AppDataSource.getRepository(Workman);
        uRequestRepo = AppDataSource.getRepository(UserRequest);
        clientRatingRepo = AppDataSource.getRepository(ClientRating);

        service = new Service();
        service.name = 'Cleaner';
        service = await serviceRepo.save(service);

        workman = new Workman();
        workman.email = 'workman@reaphsoft-test.com';
        workman.fullname = 'Initial Name';
        workman.password = defaultPassword;
        workman.address = '39 Ok Street';
        workman.availability = '24/70';
        workman.service = service;
        workman.setValues(true);
        workman = await workmanRepo.save(workman);

        userWorkRequest = new UserRequest();
        userWorkRequest.client = cUser;
        userWorkRequest.accepted = true;
        userWorkRequest.worker = workman;
        userWorkRequest.date_required = new Date();
        userWorkRequest = await uRequestRepo.save(userWorkRequest);

        token = await login(workman, defaultPassword, app);
    });
    it('should not go through, not logged in', () => {
        return request(app.getHttpServer())
            .post(
                `/workman/service/rating/${userWorkRequest.id}/${User.accountType}/`,
            )
            .expect(401);
    });
    it('should go through, no post data', async () => {
        const res = await request(app.getHttpServer())
            .post(
                `/workman/service/rating/${userWorkRequest.id}/${User.accountType}/`,
            )
            .auth(token, { type: 'bearer' })
            .expect(201);
        expect(res.body.status).toBe(false);
        expect(res.body.resp).toBe('Invalid request');
    });
    it('should go through, incomplete/no defined data: stars', async () => {
        const res = await request(app.getHttpServer())
            .post(
                `/workman/service/rating/${userWorkRequest.id}/${User.accountType}/`,
            )
            .auth(token, { type: 'bearer' })
            .send({ stars: 5 })
            .expect(201);
        expect(res.body.status).toBe(false);
        expect(res.body.resp).toBe('Invalid request, missing fields');
    });
    it('should go through, incomplete/no defined data: comment', async () => {
        const res = await request(app.getHttpServer())
            .post(
                `/workman/service/rating/${userWorkRequest.id}/${User.accountType}/`,
            )
            .auth(token, { type: 'bearer' })
            .send({ comment: 'a comment' })
            .expect(201);
        expect(res.body.status).toBe(false);
        expect(res.body.resp).toBe('Invalid request, missing fields');
    });
    it('should go through, no photos', async () => {
        const res = await request(app.getHttpServer())
            .post(
                `/workman/service/rating/${userWorkRequest.id}/${User.accountType}/`,
            )
            .auth(token, { type: 'bearer' })
            .send(data)
            .expect(201);
        expect(res.body.status).toBe(false);
        expect(res.body.resp).toBe('Invalid request, missing photos');
    });
    it('should go through, incomplete/no photos', async () => {
        const res = await request(app.getHttpServer())
            .post(
                `/workman/service/rating/${userWorkRequest.id}/${User.accountType}/`,
            )
            .auth(token, { type: 'bearer' })
            .set('Content-Type', 'multipart/form-data')
            .attach('photo', 'test/icons8-iris-scan-48.png')
            .field('stars', 5)
            .field('comment', 'a comment')
            .expect(201);
        expect(res.body.status).toBe(false);
        expect(res.body.resp).toBe('Invalid request, missing photos');
    });
});

async function login(user: Workman, password: string, app: INestApplication) {
    let token: string = '';
    await request(app.getHttpServer())
        .post('/auth/workman/login/')
        .send({ email: user.email, password: password })
        .expect(201)
        .then((resp) => {
            const data = resp.body;
            expect(data.status).toBe(true);
            expect(data.access_token).toBeTruthy();
            token = data.access_token;
        });
    return token;
}
