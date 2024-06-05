// 12/05/2024 19:43
// reaphsoft-workman
// github.com/kahlflekzy

import { User } from '../../src/entities/User';
import { EstateManager } from '../../src/entities/EstateManager';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

export async function login(
    user: User | EstateManager,
    password: string,
    app: INestApplication,
    account: number,
) {
    let token: string = '';
    await request(app.getHttpServer())
        .post('/auth/login/')
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

export function createUser(prefix: string, password: string) {
    const user = new User();
    user.email = `user${prefix}@reaphsoft.com`;
    user.password = password;
    user.fullname = 'Full Name';
    user.apartment = '18C';
    user.address = '404 Ok Street';
    user.serviceType = 1;
    user.photoURL = '';
    user.setValues(true);
    return user;
}