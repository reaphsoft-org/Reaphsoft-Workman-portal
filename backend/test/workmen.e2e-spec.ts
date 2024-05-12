// 12/05/2024 19:06
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
import { login } from './utils/utils';

describe('Workmen (e2e)', () => {
    let app: INestApplication;
    let userRepo: Repository<User>;
    let estateRepo: Repository<EstateManager>;
    let uRequestRepo: Repository<UserRequest>;
    let eRequestRepo: Repository<EstateRequest>;
    let serviceRepo: Repository<Service>;
    let workmanRepo: Repository<Workman>;
    let cUser: User;
    let cEstate: EstateManager;
    const defaultPassword = '1234xx%%%%12@';
    let service: Service;
    let workman: Workman;
    let userWorkRequest: UserRequest;

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

        service = new Service();
        service.name = 'Cleaner';
        service = await serviceRepo.save(service);

        workman = new Workman();
        workman.email = 'classBasedUser@reaphsoft-test.com';
        workman.fullname = 'Full Initial Name';
        workman.password = defaultPassword;
        workman.address = '39 Ok Street';
        workman.availability = '24/7';
        workman.service = service;
        workman.setValues(true);
        workman = await workmanRepo.save(workman);

        userWorkRequest = new UserRequest();
        userWorkRequest.client = cUser;
        userWorkRequest.accepted = true;
        userWorkRequest.worker = workman;
        userWorkRequest.date_required = new Date();

        userWorkRequest = await uRequestRepo.save(userWorkRequest);
    });

    it('working case', async () => {
        const token = await login(
            cUser,
            defaultPassword,
            app,
            User.accountType,
        );
        const data = {
            stars: '4',
            comment: 'a comment',
        };
        return request(app.getHttpServer())
            .put(`/workmen/request/service/rating/${userWorkRequest.id}/`)
            .auth(token, { type: 'bearer' })
            .send(data)
            .expect(200)
            .then((res) => {
                console.log(res.body);
            });
    });
});
