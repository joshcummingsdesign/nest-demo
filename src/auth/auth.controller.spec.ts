import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies';
import { mockAuthService } from './__mocks__/auth.service';
import { userAuth } from '../__fixtures__';

describe('UserController', () => {
  let app: INestApplication;
  let authService: AuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useFactory: mockAuthService },
        LocalStrategy,
      ],
    }).compile();

    app = module.createNestApplication();
    authService = module.get<AuthService>(AuthService);

    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('/api/v1/auth/login (POST)', () => {
    it('should log user in', async () => {
      const expectedResult = authService.login(userAuth);

      await request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send({
          username: userAuth.email,
          password: userAuth.auth.password,
        })
        .expect(201)
        .expect(expectedResult);
    });
  });
});
