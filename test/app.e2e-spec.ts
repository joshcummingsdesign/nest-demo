import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { users } from '../src/__fixtures__';

describe('AppModule (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();

    app.init();
  });

  describe('UserModule', () => {
    it('/api/v1/users (GET)', async () => {
      await request(app.getHttpServer())
        .get('/api/v1/users')
        .expect(200)
        .expect(users);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
