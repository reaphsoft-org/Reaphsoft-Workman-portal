import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule, MEDIA_DIR } from '../src/app.module';
import * as fs from 'fs';
import * as path from 'path';
import { AppDataSource } from '../src/data-source';
import { User } from '../src/entities/User';

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

describe('Accounts Test', () => {
  let app: INestApplication;

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
  });

  it('no image', async () => {
    return request(app.getHttpServer())
      .post('/account/sign/up/')
      .set('Content-Type', 'multipart/form-data')
      .field('accountType', '1') // include any other form fields
      .field('email', 'test0@reaphsoft.com')
      .field('password', 'password')
      .field('fullname', 'Reaph Soft')
      .field('apartment', '15B')
      .field('address', 'NA')
      .field('serviceType', '1')
      .expect(201)
      .then((resp) => {
        const data = resp.body;
        console.log(data);
        expect(data.status).toBe(true);
        expect(data.resp).toBe('Account created successfully');
      });
  }, 10000);

  it('with image', async () => {
    const email: string = 'test1@reaphsoft.com';
    return request(app.getHttpServer())
      .post('/account/sign/up/') // replace with your actual endpoint
      .set('Content-Type', 'multipart/form-data')
      .attach('photo', 'test/icons8-iris-scan-48.png') // attach the image file
      .field('accountType', '1') // include any other form fields
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
          user?.photoURL === path.join('media/u', 'test1reaphsoft-com.png'),
        );
        fs.rmSync(imgPath);
        expect(fs.existsSync(imgPath)).toBe(false);
      });
  }, 10000);

  it('lowercase name', async () => {
    const email: string = 'test1@reaphsoft.com';
    return request(app.getHttpServer())
      .post('/account/sign/up/') // replace with your actual endpoint
      .set('Content-Type', 'multipart/form-data')
      .field('accountType', '1') // include any other form fields
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
      .post('/account/sign/up/') // replace with your actual endpoint
      .set('Content-Type', 'multipart/form-data')
      .field('accountType', '1') // include any other form fields
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
    user0.accountType = 1;
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
      .post('/account/sign/up/') // replace with your actual endpoint
      .set('Content-Type', 'multipart/form-data')
      .field('accountType', '1') // include any other form fields
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
      .post('/account/sign/up/')
      .expect(201)
      .then((resp) => {
        const data = resp.body;
        expect(data.status).toBe(false);
        expect(data.resp).toBe('You did not post any registration data');
      });
  });

  it('test partial post data', async () => {
    return request(app.getHttpServer())
      .post('/account/sign/up/')
      .field('email', 'partialemail@reaphsoft.com')
      .expect(201)
      .then((resp) => {
        const data = resp.body;
        expect(data.status).toBe(false);
        expect(data.resp.includes('Invalid'));
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
