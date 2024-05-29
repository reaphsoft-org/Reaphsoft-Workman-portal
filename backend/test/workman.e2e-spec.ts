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
import { ClientRating, WorkmanRating } from '../src/entities/rating';
import { MEDIA_DIR } from '../src/utilities/konstants';
import * as fs from 'fs';
import * as path from 'path';

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
    it('should go through, but, no post data', async () => {
        const res = await request(app.getHttpServer())
            .post(
                `/workman/service/rating/${userWorkRequest.id}/${User.accountType}/`,
            )
            .auth(token, { type: 'bearer' })
            .expect(400);
        expect(res.body.message).toBe('Invalid request.');
    });
    it('should go through, but, incomplete/no defined data: stars', async () => {
        const res = await request(app.getHttpServer())
            .post(
                `/workman/service/rating/${userWorkRequest.id}/${User.accountType}/`,
            )
            .auth(token, { type: 'bearer' })
            .send({ stars: 5 })
            .expect(400);
        expect(res.body.message).toBe('Invalid request, missing fields.');
    });
    it('should go through, but, incomplete/no defined data: comment', async () => {
        const res = await request(app.getHttpServer())
            .post(
                `/workman/service/rating/${userWorkRequest.id}/${User.accountType}/`,
            )
            .auth(token, { type: 'bearer' })
            .send({ comment: 'a comment' })
            .expect(400);
        expect(res.body.message).toBe('Invalid request, missing fields.');
    });
    it('should go through, but, no photos', async () => {
        const res = await request(app.getHttpServer())
            .post(
                `/workman/service/rating/${userWorkRequest.id}/${User.accountType}/`,
            )
            .auth(token, { type: 'bearer' })
            .send(data)
            .expect(400);
        expect(res.body.message).toBe('Invalid request, missing photos.');
    });
    it('should go through, but, incomplete/no photos', async () => {
        const res = await request(app.getHttpServer())
            .post(
                `/workman/service/rating/${userWorkRequest.id}/${User.accountType}/`,
            )
            .auth(token, { type: 'bearer' })
            .set('Content-Type', 'multipart/form-data')
            .attach('beforePhoto', 'test/icons8-iris-scan-48.png')
            .field('stars', 5)
            .field('comment', 'a comment')
            .expect(400);
        expect(res.body.message).toBe('Invalid request, missing photos.');
    });
    it('should go through, but, invalid request type.', async () => {
        const res = await request(app.getHttpServer())
            .post(
                `/workman/service/rating/${userWorkRequest.id}/${User.accountType}1/`,
            )
            .auth(token, { type: 'bearer' })
            .set('Content-Type', 'multipart/form-data')
            .attach('beforePhoto', 'test/icons8-iris-scan-48.png')
            .attach('afterPhoto', 'test/icons8-iris-scan-48.png')
            .field('stars', 1)
            .field('comment', 'a comment')
            .expect(400);
        expect(res.body.message).toBe('Invalid request type.');
    });
    it('should go through, but, request not found.', async () => {
        const res = await request(app.getHttpServer())
            .post(
                `/workman/service/rating/${userWorkRequest.id + 1000}/${User.accountType}/`,
            )
            .auth(token, { type: 'bearer' })
            .set('Content-Type', 'multipart/form-data')
            .attach('beforePhoto', 'test/icons8-iris-scan-48.png')
            .attach('afterPhoto', 'test/icons8-iris-scan-48.png')
            .field('stars', 1)
            .field('comment', 'a comment')
            .expect(400);
        expect(res.body.message).toBe(
            'Work request not found. Error Code: 1001-1',
        );
    });
    it('should go through, but, stars out of range.', async () => {
        const res = await request(app.getHttpServer())
            .post(
                `/workman/service/rating/${userWorkRequest.id}/${User.accountType}/`,
            )
            .auth(token, { type: 'bearer' })
            .set('Content-Type', 'multipart/form-data')
            .attach('beforePhoto', 'test/icons8-iris-scan-48.png')
            .attach('afterPhoto', 'test/icons8-iris-scan-48.png')
            .field('stars', 6)
            .field('comment', 'a comment')
            .expect(400);
        expect(res.body.message).toBe('Stars should be between 1 and 5.');
    });
    it('should go through, but, empty comment.', async () => {
        const res = await request(app.getHttpServer())
            .post(
                `/workman/service/rating/${userWorkRequest.id}/${User.accountType}/`,
            )
            .auth(token, { type: 'bearer' })
            .set('Content-Type', 'multipart/form-data')
            .attach('beforePhoto', 'test/icons8-iris-scan-48.png')
            .attach('afterPhoto', 'test/icons8-iris-scan-48.png')
            .field('stars', 4)
            .field('comment', '')
            .expect(400);
        expect(res.body.message).toBe('Please write a comment.');
    });
    it('should go through, but, rating already done.', async () => {
        let workRequest = await uRequestRepo.findOneBy({
            id: userWorkRequest.id,
        });
        workRequest!.id = 2;
        const rating = new WorkmanRating();
        rating.comment = 'yes';
        rating.stars = 4;
        workRequest!.worker_rating = rating;
        workRequest!.worker = workman;
        workRequest = await uRequestRepo.save(workRequest!);
        expect(workRequest.id).toBeGreaterThan(1);
        const res = await request(app.getHttpServer())
            .post(
                `/workman/service/rating/${workRequest.id}/${User.accountType}/`,
            )
            .auth(token, { type: 'bearer' })
            .set('Content-Type', 'multipart/form-data')
            .attach('beforePhoto', 'test/icons8-iris-scan-48.png')
            .attach('afterPhoto', 'test/icons8-iris-scan-48.png')
            .field('stars', 4)
            .field('comment', 'a comment')
            .expect(403);
        expect(res.body.message).toBe('You have already submitted a review.');
    });
    it('should go through, successful.', async () => {
        const res = await request(app.getHttpServer())
            .post(
                `/workman/service/rating/${userWorkRequest.id}/${User.accountType}/`,
            )
            .auth(token, { type: 'bearer' })
            .set('Content-Type', 'multipart/form-data')
            .attach('beforePhoto', 'test/icons8-iris-scan-48.png')
            .attach('afterPhoto', 'test/icons8-iris-scan-48.png')
            .field('stars', 4)
            .field('comment', 'a comment')
            .expect(201);
        expect(res.body.status).toBe(true);
        expect(res.body.resp).toBe('');
        const workRequest = await uRequestRepo.findOne({
            where: {
                id: userWorkRequest.id,
            },
            relations: {
                worker_rating: true,
            },
        });
        expect(workRequest?.worker_rating.comment).toBe('a comment');
        expect(workRequest?.worker_rating.stars).toBe(4);
        expect(
            workRequest?.beforePhoto.endsWith(`b_${workRequest?.id}.png`),
        ).toBe(true);
        expect(
            workRequest?.afterPhoto.endsWith(`a_${workRequest?.id}.png`),
        ).toBe(true);
        const home = path.join(MEDIA_DIR, '../..');
        const before = path.join(home, <string>workRequest?.beforePhoto);
        const after = path.join(home, <string>workRequest?.afterPhoto);
        fs.rmSync(before);
        fs.rmSync(after);
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
