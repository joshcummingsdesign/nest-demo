import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { users } from '../src/__fixtures__';

describe('UserModule (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();

    app.init();
  });

  it('GET /api/v1/users', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/v1/users')
      .expect(200);

    expect(res.body).toMatchSnapshot();
  });

  afterAll(async () => {
    await app.close();
  });
});
