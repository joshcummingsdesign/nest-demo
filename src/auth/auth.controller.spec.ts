import { INestApplication } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies';
import { mockAuthService } from './__mocks__/auth.service';
import { userAuth } from '../__fixtures__';

describe('UserController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [PassportModule],
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useFactory: mockAuthService },
        LocalStrategy,
      ],
    }).compile();

    app = module.createNestApplication();

    await app.init();
  });

  describe('/api/v1/auth/login (POST)', () => {
    it('should authenticate user', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/auth/login', {
          username: userAuth.email,
          password: userAuth.password,
        } as any)
        .expect(201);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
