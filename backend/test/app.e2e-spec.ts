import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule, MEDIA_DIR } from '../src/app.module';
import * as fs from 'fs';
import * as path from 'path';
import { AppDataSource } from '../src/data-source';
import { User } from '../src/entities/User';
import { EstateManager } from '../src/entities/EstateManager';
import { PasswordManager } from '../src/utilities/passwordmanager';

const passwordManager = new PasswordManager();

describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/ (GET)', () => {
        return request(app.getHttpServer())
            .get('/')
            .expect(200)
            .expect('Hello World!!');
    });
});

describe('Accounts Individual User Tests', () => {
    let app: INestApplication;
    let classBasedUser: User;
    const api = '/account/sign/up/i/';
    const updateAPI = '/account/update/user/i/';
    const password = '1234';

    beforeAll(async () => {
        app = await initializeTesting(app);

        const repo = AppDataSource.getRepository(User);
        classBasedUser = new User();
        classBasedUser.email = 'classBasedUser@reaphsoft-test.com';
        classBasedUser.password = passwordManager.getHashedKey(password);
        classBasedUser.fullname = 'Full Initial Name';
        classBasedUser.apartment = '16C';
        classBasedUser.address = '39 Ok Street';
        classBasedUser.serviceType = 1;
        classBasedUser.photoURL = '';
        classBasedUser = await repo.save(classBasedUser);
    });

    it('no image', async () => {
        return request(app.getHttpServer())
            .post(api)
            .set('Content-Type', 'multipart/form-data')
            .field('email', 'test0@reaphsoft.com')
            .field('password', 'password')
            .field('fullname', 'Reaph Soft')
            .field('apartment', '15B')
            .field('address', 'NA')
            .field('serviceType', '1')
            .expect(201)
            .then((resp) => {
                const data = resp.body;
                expect(data.status).toBe(true);
                expect(data.resp).toBe('Account created successfully');
            });
    }, 10000);

    it('with image', async () => {
        const email: string = 'test1@reaphsoft.com';
        return request(app.getHttpServer())
            .post(api) // replace with your actual endpoint
            .set('Content-Type', 'multipart/form-data')
            .attach('photo', 'test/icons8-iris-scan-48.png') // attach the image file
            .field('email', email)
            .field('password', 'password')
            .field('fullname', 'Reaph Soft')
            .field('apartment', '15B')
            .field('address', 'NA')
            .field('serviceType', '1')
            .expect(201)
            .then(async (resp) => {
                const data = resp.body;
                expect(data.status).toBe(true);
                expect(data.resp).toBe('Account created successfully');
                const imgPath = path.join(MEDIA_DIR, 'test1reaphsoft-com.png');
                expect(fs.existsSync(imgPath)).toBe(true);
                const repo = AppDataSource.getRepository(User);
                const user = await repo.findOne({ where: { email } });
                expect(user !== null);
                expect(user?.password !== 'password');
                expect(
                    user?.photoURL ===
                        path.join('media/u', 'test1reaphsoft-com.png'),
                );
                fs.rmSync(imgPath);
                expect(fs.existsSync(imgPath)).toBe(false);
            });
    }, 10000);

    it('lowercase name', async () => {
        const email: string = 'test1@reaphsoft.com';
        return request(app.getHttpServer())
            .post(api) // replace with your actual endpoint
            .set('Content-Type', 'multipart/form-data')
            .field('email', email)
            .field('password', 'password')
            .field('fullname', 'reaph soft')
            .field('apartment', '15B')
            .field('address', 'NA')
            .field('serviceType', '1')
            .expect(201)
            .then(async (resp) => {
                expect(resp.body.status);
                const repo = AppDataSource.getRepository(User);
                const user = await repo.findOne({ where: { email } });
                expect(user !== null);
                expect(user?.fullname == 'Reaph Soft');
            });
    }, 10000);

    it('test email', async () => {
        const email: string = 'felixsigit@gmail.com';
        return request(app.getHttpServer())
            .post(api) // replace with your actual endpoint
            .set('Content-Type', 'multipart/form-data')
            .field('email', email)
            .field('password', 'password')
            .field('fullname', 'dalang felix sihitshuwam')
            .field('apartment', '15B')
            .field('address', 'NA')
            .field('serviceType', '0')
            .expect(201)
            .then(async () => {
                const repo = AppDataSource.getRepository(User);
                const user = await repo.findOne({ where: { email } });
                expect(user !== null);
                expect(user?.fullname == 'Dalang Felix Sihitshuwam');
            });
    }, 15000);

    it('test duplicate email', async () => {
        const email: string = 'testemailexists@reaphsoft-workmen.org';
        const repo = AppDataSource.getRepository(User);
        const user0 = new User();
        user0.email = email;
        user0.password = password;
        user0.fullname = 'Full Name';
        user0.apartment = '15B';
        user0.address = '39 Ok Street';
        user0.serviceType = 1;
        user0.photoURL = '';
        await repo.save(user0);
        const users = await repo.count();
        expect(users > 0);
        return request(app.getHttpServer())
            .post(api) // replace with your actual endpoint
            .set('Content-Type', 'multipart/form-data')
            .field('email', email)
            .field('password', 'password')
            .field('fullname', 'dalang felix sihitshuwam')
            .field('apartment', '15B')
            .field('address', 'NA')
            .field('serviceType', '2')
            .expect(201)
            .then((resp) => {
                const data = resp.body;
                expect(data.status).toBe(false);
                expect(data.resp).toBe(
                    'A user with the email you supplied already exists.',
                );
            });
    });

    it('test empty post data', async () => {
        return emptyPostDataTest(app, api);
    });

    it('test partial post data', async () => {
        return partialPostDataTest(app, api);
    });

    it('login required to update user', () => {
        const data = {
            fullname: classBasedUser.fullname,
            apartment: classBasedUser.apartment,
            address: classBasedUser.address,
            serviceType: classBasedUser.serviceType,
        };
        return request(app.getHttpServer())
            .post(updateAPI)
            .send(data)
            .expect(401);
    });

    it('should update user', async () => {
        const email: string = 'update.user@reaphsoft-workmen.org';
        const repo = AppDataSource.getRepository(User);
        const user0 = new User();
        user0.email = email;
        user0.password = passwordManager.getHashedKey(password);
        user0.fullname = 'Full Initial Name';
        user0.apartment = '16C';
        user0.address = '39 Ok Street';
        user0.serviceType = 1;
        user0.photoURL = '';
        await repo.save(user0);
        const users = await repo.count();
        expect(users > 0);
        const address = '606 Hilltop Avenue, Jos, Plateau State';
        const token = await login(user0, password, app, User.accountType);
        const data = {
            email: user0.email,
            fullname: user0.fullname,
            apartment: user0.apartment,
            address: address,
            serviceType: user0.serviceType,
        };
        return request(app.getHttpServer())
            .post(updateAPI)
            .auth(token, { type: 'bearer' })
            .send(data)
            .expect(201)
            .then(async (response) => {
                const data = response.body;
                expect(data.status);
                expect(data.resp).toBe('');
                const user1 = await repo.findOneBy({ email: user0.email });
                expect(user1!.id == user0.id);
                expect(user0.address != address);
                // only change
                expect(user1!.address == address);
                expect(user1!.email == user0.email);
                expect(user1!.fullname == user0.fullname);
                expect(user1!.apartment == user0.apartment);
                expect(user1!.serviceType == user0.serviceType);
            });
    });

    const changePasswordAPI = '/account/change/password/';
    it('login required for changing password', () => {
        return request(app.getHttpServer()).post(changePasswordAPI).expect(401);
    });

    it('should change password', async () => {
        const newPassword = '606060';
        const repo = AppDataSource.getRepository(User);
        const token = await login(
            classBasedUser,
            password,
            app,
            User.accountType,
        );
        return request(app.getHttpServer())
            .post(changePasswordAPI)
            .auth(token, { type: 'bearer' })
            .send({
                new_password: newPassword,
                old_password: password,
            })
            .expect(201)
            .then(async (resp) => {
                const data = resp.body;
                expect(data.status);
                expect(data.resp).toBe('');
                const user1 = await repo.findOneBy({
                    email: classBasedUser.email,
                });
                expect(user1!.id == classBasedUser.id);
                expect(user1!.password != classBasedUser.password);
                expect(user1!.password != newPassword);
                expect(
                    passwordManager.comparePassword(
                        newPassword,
                        user1!.password,
                    ),
                );
                // reset to default password for the sake of other tests
                classBasedUser.password =
                    passwordManager.getHashedKey(password);
                await repo.save(classBasedUser);
            });
    });

    it('get user (auth required)', () => {
        return request(app.getHttpServer()).get('/account/user/').expect(401);
    });

    it('get user (auth)', async () => {
        const token = await login(
            classBasedUser,
            password,
            app,
            User.accountType,
        );
        return request(app.getHttpServer())
            .get('/account/user/')
            .auth(token, { type: 'bearer' })
            .expect(200)
            .then((resp) => {
                expect(resp.body).toBeTruthy();
                expect(resp.body.accountType).toBe(User.accountType);
                expect(resp.body.email).toBe(classBasedUser.email);
            });
    });

    afterAll(async () => {
        await app.close();
    });
});

async function initializeTesting(app: INestApplication<any>) {
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
    return app;
}

async function emptyPostDataTest(app: INestApplication<any>, api: string) {
    const resp = await request(app.getHttpServer()).post(api).expect(201);
    const data = resp.body;
    expect(data.status).toBe(false);
    expect(data.resp).toBe('You did not post any registration data');
}

async function partialPostDataTest(app: INestApplication<any>, api: string) {
    const resp = await request(app.getHttpServer())
        .post(api)
        .field('email', 'partialemail@reaphsoft.com')
        .expect(201);
    const data = resp.body;
    expect(data.status).toBe(false);
    expect(data.resp.includes('Invalid'));
}

async function login(
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

describe('Accounts Estate Manager Tests', () => {
    let app: INestApplication;
    let estateManager: EstateManager;
    const password = '12345';
    const api = '/account/sign/up/e/';
    const repo = AppDataSource.getRepository(EstateManager);

    beforeAll(async () => {
        app = await initializeTesting(app);
        estateManager = new EstateManager();
        estateManager.email = 'classUser@reaphsoft-test.com';
        estateManager.password = passwordManager.getHashedKey(password);
        estateManager.fullname = 'Estate Manager';
        estateManager.estate = 'North Pole Estate';
        estateManager.address =
            '50 Kahlflekzy Street, Jos North, Plateau State, Nigeria.';
        estateManager.serviceType = 1;
        estateManager.photoURL = '';
        estateManager = await repo.save(estateManager);
    });

    it('no image', async () => {
        return request(app.getHttpServer())
            .post(api)
            .set('Content-Type', 'multipart/form-data')
            .field('email', 'test0@reaphsoft.com')
            .field('password', 'password')
            .field('fullname', 'Reaph Soft')
            .field('estate', 'SunCity Estate')
            .field('address', 'Ayodele Street, Basorun, Ibadan, Oyo State')
            .field('serviceType', '1')
            .expect(201)
            .then((resp) => {
                const data = resp.body;
                expect(data.status).toBe(true);
                expect(data.resp).toBe('Account created successfully');
            });
    }, 10000);

    it('with image', async () => {
        const email: string = 'test1@reaphsoft.com';
        return request(app.getHttpServer())
            .post(api) // replace with your actual endpoint
            .set('Content-Type', 'multipart/form-data')
            .attach('photo', 'test/icons8-iris-scan-48.png') // attach the image file
            .field('email', email)
            .field('password', 'password')
            .field('fullname', 'Reaph Soft')
            .field('estate', 'Fly High Estate')
            .field('address', 'NA')
            .field('serviceType', '1')
            .expect(201)
            .then(async (resp) => {
                const data = resp.body;
                expect(data.status).toBe(true);
                expect(data.resp).toBe('Account created successfully');
                const imgPath = path.join(MEDIA_DIR, 'test1reaphsoft-com.png');
                expect(fs.existsSync(imgPath)).toBe(true);
                const user = await repo.findOne({ where: { email } });
                expect(user !== null);
                expect(
                    user?.photoURL ===
                        path.join('media/u', 'test1reaphsoft-com.png'),
                );
                fs.rmSync(imgPath);
                expect(user?.password !== 'password'); // should be hashed
                expect(fs.existsSync(imgPath)).toBe(false);
            });
    }, 10000);

    it('lowercase name should be upper', async () => {
        const email: string = 'test1@reaphsoft.com';
        return request(app.getHttpServer())
            .post(api) // replace with your actual endpoint
            .set('Content-Type', 'multipart/form-data')
            .field('email', email)
            .field('password', 'password')
            .field('fullname', 'reaph soft')
            .field('estate', 'naf estate')
            .field('address', 'NA')
            .field('serviceType', 2)
            .expect(201)
            .then(async (resp) => {
                expect(resp.body.status);
                const user = await repo.findOneBy({ email: email });
                expect(user !== null);
                expect(user?.fullname === 'Reaph Soft');
            });
    }, 10000);

    it('test email', async () => {
        const email: string = 'felixsigit@gmail.com';
        return request(app.getHttpServer())
            .post(api) // replace with your actual endpoint
            .set('Content-Type', 'multipart/form-data')
            .field('email', email)
            .field('password', 'password')
            .field('fullname', 'dalang felix sihitshuwam')
            .field('estate', 'Flower Estate')
            .field('address', 'NA')
            .field('serviceType', '1')
            .expect(201)
            .then(async () => {
                const user = await repo.findOneBy({ email: email });
                expect(user !== null);
                expect(user?.fullname == 'Dalang Felix Sihitshuwam');
            });
    }, 15000);

    it('test duplicate email', async () => {
        const email: string = 'testemailexists@reaphsoft-workmen.org';
        const user0 = new EstateManager();
        user0.email = email;
        user0.password = '1234';
        user0.fullname = 'Estate Manager';
        user0.estate = 'PureView Estate';
        user0.address = '39 Ok Street';
        user0.serviceType = 2;
        user0.photoURL = '';
        await repo.save(user0);
        const users = await repo.count();
        expect(users > 0);
        return request(app.getHttpServer())
            .post(api) // replace with your actual endpoint
            .set('Content-Type', 'multipart/form-data')
            .field('email', email)
            .field('password', 'password')
            .field('fullname', 'felix sihitshuwam')
            .field('estate', 'PureView Estate')
            .field('address', '42, NAF')
            .field('serviceType', '2')
            .expect(201)
            .then((resp) => {
                const data = resp.body;
                expect(data.status).toBe(false);
                expect(data.resp).toBe(
                    'A user with the email you supplied already exists.',
                );
            });
    });

    it('test empty post data', async () => {
        return emptyPostDataTest(app, api);
    });

    it('test partial post data', async () => {
        return partialPostDataTest(app, api);
    });

    it('should update user', async () => {
        const users = await repo.count();
        expect(users > 0);
        const token = await login(
            estateManager,
            password,
            app,
            EstateManager.accountType,
        );
        const address = '606 Hilltop Avenue, Jos, Plateau State';
        const data = {
            fullname: estateManager.fullname,
            estate: `${estateManager.estate} 2`,
            address: address,
            serviceType: estateManager.serviceType,
        };
        return request(app.getHttpServer())
            .post('/account/update/user/e/')
            .auth(token, { type: 'bearer' })
            .send(data)
            .expect(201)
            .then(async (response) => {
                const data = response.body;
                expect(data.status);
                expect(data.resp).toBe('');
                const user1 = await repo.findOneBy({
                    email: estateManager.email,
                });
                expect(user1!.id == estateManager.id);
                expect(estateManager.address != address);
                expect(user1!.estate == `${estateManager.estate} 2`);
                // only change
                expect(user1!.address == address);
                expect(user1!.email == estateManager.email);
                expect(user1!.fullname == estateManager.fullname);
                expect(user1!.serviceType == estateManager.serviceType);
            });
    });

    it('should change password', async () => {
        const newPassword = '606060';
        const token = await login(
            estateManager,
            password,
            app,
            EstateManager.accountType,
        );
        return request(app.getHttpServer())
            .post('/account/change/password/')
            .auth(token, { type: 'bearer' })
            .send({
                new_password: newPassword,
                old_password: password,
            })
            .expect(201)
            .then(async (resp) => {
                const data = resp.body;
                expect(data.status);
                expect(data.resp).toBe('');
                const user1 = await repo.findOneBy({
                    email: estateManager.email,
                });
                expect(user1!.id == estateManager.id);
                expect(user1!.password != estateManager.password);
                expect(
                    passwordManager.comparePassword(
                        newPassword,
                        user1!.password,
                    ),
                );
                // reset to default password for the sake of other tests
                estateManager.password = passwordManager.getHashedKey(password);
                await repo.save(estateManager);
            });
    });

    it('get user (auth)', async () => {
        const token = await login(
            estateManager,
            password,
            app,
            EstateManager.accountType,
        );
        return request(app.getHttpServer())
            .get('/account/user/')
            .auth(token, { type: 'bearer' })
            .expect(200)
            .then((resp) => {
                expect(resp.body).toBeTruthy();
                expect(resp.body.accountType).toBe(EstateManager.accountType);
                expect(resp.body.email).toBe(estateManager.email);
                console.log(resp.body);
            });
    });

    it('estate agent with many houses', () => {
        // todo
    });

    afterAll(async () => {
        await app.close();
    });
});
