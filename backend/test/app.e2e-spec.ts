import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule, MEDIA_DIR } from '../src/app.module';
import * as fs from 'fs';
import * as path from 'path';
import { AppDataSource } from '../src/data-source';
import { User } from '../src/entities/User';
import { EstateManager } from '../src/entities/EstateManager';

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
        classBasedUser.email = 'classBasedUser@reaphsoft-test.com';
        classBasedUser.password = '1234';
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
            .field('serviceType', '0')
            .expect(201)
            .then(async () => {
                const repo = AppDataSource.getRepository(User);
                const user = await repo.findOne({ where: { email } });
                expect(user !== null);
                expect(user?.fullname == 'reaph soft');
            });
    });

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
        user0.password = '1234';
        user0.fullname = 'Full Name';
        user0.apartment = '15B';
        user0.address = '39 Ok Street';
        user0.serviceType = 0;
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
        return request(app.getHttpServer())
            .post(api)
            .expect(201)
            .then((resp) => {
                const data = resp.body;
                expect(data.status).toBe(false);
                expect(data.resp).toBe(
                    'You did not post any registration data',
                );
            });
    });

    it('test partial post data', async () => {
        return request(app.getHttpServer())
            .post(api)
            .field('email', 'partialemail@reaphsoft.com')
            .expect(201)
            .then((resp) => {
                const data = resp.body;
                expect(data.status).toBe(false);
                expect(data.resp.includes('Invalid'));
            });
    });

    it('should update user', async () => {
        const email: string = 'update.user@reaphsoft-workmen.org';
        const repo = AppDataSource.getRepository(User);
        const user0 = new User();
        user0.email = email;
        user0.password = '1234';
        user0.fullname = 'Full Initial Name';
        user0.apartment = '16C';
        user0.address = '39 Ok Street';
        user0.serviceType = 1;
        user0.photoURL = '';
        await repo.save(user0);
        const users = await repo.count();
        expect(users > 0);
        const address = '606 Hilltop Avenue, Jos, Plateau State';
        return request(app.getHttpServer())
            .post('/account/update/user/')
            .field('email', user0.email)
            .field('fullname', user0.fullname)
            .field('apartment', user0.apartment)
            .field('address', address)
            .field('serviceType', user0.serviceType)
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

    it('should change password', async () => {
        const newPassword = '606060';
        const repo = AppDataSource.getRepository(User);
        return request(app.getHttpServer())
            .post('/account/change/password/')
            .field('email', classBasedUser.email)
            .field('new_password', newPassword)
            .field('old_password', classBasedUser.password)
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
                expect(user1!.password == newPassword);
            });
    });

    // todo confirm in tests that password when creating and updating accounts aren't stored in plaintext

    afterAll(async () => {
        await app.close();
    });
});

describe('Accounts Estate Manager Tests', () => {
    let app: INestApplication;
    let classBasedUser: EstateManager;
    const api = '/account/sign/up/e/';

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
        const repo = AppDataSource.getRepository(EstateManager);
        classBasedUser = new EstateManager();
        classBasedUser.email = 'classBasedEstateManager@reaphsoft-test.com';
        classBasedUser.password = '12345';
        classBasedUser.fullname = 'Full Name';
        classBasedUser.estate = 'North Pole Estate';
        classBasedUser.address =
            '50 Kahlflekzy Street, Jos North, Plateau State, Nigeria.';
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
            .field('serviceType', '0')
            .expect(201)
            .then(async () => {
                const repo = AppDataSource.getRepository(User);
                const user = await repo.findOne({ where: { email } });
                expect(user !== null);
                expect(user?.fullname == 'reaph soft');
            });
    });

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
        user0.password = '1234';
        user0.fullname = 'Full Name';
        user0.apartment = '15B';
        user0.address = '39 Ok Street';
        user0.serviceType = 0;
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
        return request(app.getHttpServer())
            .post(api)
            .expect(201)
            .then((resp) => {
                const data = resp.body;
                expect(data.status).toBe(false);
                expect(data.resp).toBe(
                    'You did not post any registration data',
                );
            });
    });

    it('test partial post data', async () => {
        return request(app.getHttpServer())
            .post(api)
            .field('email', 'partialemail@reaphsoft.com')
            .expect(201)
            .then((resp) => {
                const data = resp.body;
                expect(data.status).toBe(false);
                expect(data.resp.includes('Invalid'));
            });
    });

    it('should update user', async () => {
        const email: string = 'update.user@reaphsoft-workmen.org';
        const repo = AppDataSource.getRepository(User);
        const user0 = new User();
        user0.email = email;
        user0.password = '1234';
        user0.fullname = 'Full Initial Name';
        user0.apartment = '16C';
        user0.address = '39 Ok Street';
        user0.serviceType = 1;
        user0.photoURL = '';
        await repo.save(user0);
        const users = await repo.count();
        expect(users > 0);
        const address = '606 Hilltop Avenue, Jos, Plateau State';
        return request(app.getHttpServer())
            .post('/account/update/user/')
            .field('email', user0.email)
            .field('fullname', user0.fullname)
            .field('apartment', user0.apartment)
            .field('address', address)
            .field('serviceType', user0.serviceType)
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

    it('should change password', async () => {
        const newPassword = '606060';
        const repo = AppDataSource.getRepository(User);
        return request(app.getHttpServer())
            .post('/account/change/password/')
            .field('email', classBasedUser.email)
            .field('new_password', newPassword)
            .field('old_password', classBasedUser.password)
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
                expect(user1!.password == newPassword);
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
