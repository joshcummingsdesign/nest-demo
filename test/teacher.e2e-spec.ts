import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { teacherAuth, addAvailabilityDto } from '../src/__fixtures__';

describe('Teacher (e2e)', () => {
  let app: INestApplication;
  let token: string;
  let realDateNow: () => number;

  beforeAll(async () => {
    realDateNow = Date.now.bind(global.Date);
    const dateNowStub = jest.fn(() => 1592164576240);
    global.Date.now = dateNowStub;

    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();

    app.init();

    token = await request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send({
        username: teacherAuth.email,
        password: teacherAuth.auth.password,
      })
      .then((res) => `Bearer ${res.body.access_token}`);
  });

  afterAll(() => {
    global.Date.now = realDateNow;
  });

  it('should view all lessons', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/v1/lessons/self')
      .set('Authorization', token)
      .expect(200);

    expect(res.body).toMatchSnapshot();
  });

  it('should create, read, delete availability', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/api/v1/availability')
      .send(addAvailabilityDto)
      .set('Authorization', token)
      .expect(201);

    expect(createRes.body).toMatchSnapshot();

    const readRes = await request(app.getHttpServer())
      .get('/api/v1/availability/self')
      .set('Authorization', token)
      .expect(200);

    expect(readRes.body).toMatchSnapshot();

    const deleteRes = await request(app.getHttpServer())
      .delete(`/api/v1/availability/self/${createRes.body.id}`)
      .set('Authorization', token)
      .expect(200);

    expect(deleteRes.body).toMatchSnapshot();
  });

  afterAll(async () => {
    await app.close();
  });
});
