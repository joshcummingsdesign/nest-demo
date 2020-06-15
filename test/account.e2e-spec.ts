import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { createNewUser, updateNewUser } from '../src/__fixtures__';

describe('Account (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();

    app.init();
  });

  it('should view all instruments', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/v1/instruments')
      .expect(200);

    expect(res.body).toMatchSnapshot();
  });

  it('should create, read, update, delete', async () => {
    // Create account
    const createRes = await request(app.getHttpServer())
      .post('/api/v1/users')
      .send(createNewUser)
      .expect(201);

    expect(createRes.body).toMatchSnapshot();

    // Login
    const loginRes = await request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send({ username: createNewUser.email, password: createNewUser.password })
      .expect(201);

    expect(loginRes.body).toMatchObject({
      access_token: expect.any(String),
    });

    const token = `Bearer ${loginRes.body.access_token}`;

    // Read account
    const readRes = await request(app.getHttpServer())
      .get('/api/v1/users/self')
      .set('Authorization', token)
      .expect(200);

    expect(readRes.body).toMatchSnapshot();

    // Update account
    const updateRes = await request(app.getHttpServer())
      .patch('/api/v1/users/self')
      .send(updateNewUser)
      .set('Authorization', token)
      .expect(200);

    expect(updateRes.body).toMatchSnapshot();

    // Delete account
    const deleteRes = await request(app.getHttpServer())
      .delete('/api/v1/users/self')
      .set('Authorization', token)
      .expect(200);

    expect(deleteRes.body).toMatchSnapshot();

    await request(app.getHttpServer())
      .get('/api/v1/users/self')
      .set('Authorization', token)
      .expect(404);
  });

  afterAll(async () => {
    await app.close();
  });
});
