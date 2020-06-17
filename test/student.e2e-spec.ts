import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { studentAuth, teacher, bookLessonDto } from '../src/__fixtures__';

describe('Student (e2e)', () => {
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
        username: studentAuth.email,
        password: studentAuth.auth.password,
      })
      .then((res) => `Bearer ${res.body.access_token}`);
  });

  afterAll(() => {
    global.Date.now = realDateNow;
  });

  it('should view all teachers', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/v1/users?role=teacher')
      .expect(200);

    expect(res.body).toMatchSnapshot();
  });

  it('should view teacher availability', async () => {
    const res = await request(app.getHttpServer())
      .get(`/api/v1/availability/user/${teacher.id}`)
      .set('Authorization', token)
      .expect(200);

    expect(res.body).toMatchSnapshot();
  });

  it('should create, read, delete lesson', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/api/v1/lessons')
      .send(bookLessonDto)
      .set('Authorization', token)
      .expect(201);

    expect(createRes.body).toMatchSnapshot();

    const readRes = await request(app.getHttpServer())
      .get('/api/v1/lessons/self')
      .set('Authorization', token)
      .expect(200);

    expect(readRes.body).toMatchSnapshot();

    const deleteRes = await request(app.getHttpServer())
      .delete(`/api/v1/lessons/self/${createRes.body.id}`)
      .set('Authorization', token)
      .expect(200);

    expect(deleteRes.body).toMatchSnapshot();
  });

  afterAll(async () => {
    await app.close();
  });
});
