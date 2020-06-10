import {
  INestApplication,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { mockUserService } from './__mocks__/user.service';
import { createUserDto, updateUserDto } from '../__fixtures__';

describe('UserController', () => {
  let app: INestApplication;
  let userService: UserService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useFactory: mockUserService }],
    }).compile();

    app = module.createNestApplication();
    userService = module.get<UserService>(UserService);

    await app.init();
  });

  describe('/api/v1/users (POST)', () => {
    it('should create and return a user', async () => {
      const expectedResult = await userService.create(createUserDto);

      await request(app.getHttpServer())
        .post('/api/v1/users')
        .send(createUserDto)
        .expect(201)
        .expect(expectedResult);
    });

    it('should return 409 if user exists', async () => {
      jest.spyOn(userService, 'create').mockImplementation(() => {
        throw new ConflictException();
      });

      await request(app.getHttpServer())
        .post('/api/v1/users')
        .send(createUserDto)
        .expect(409);
    });
  });

  describe('/api/v1/users (GET)', () => {
    it('should return all users', async () => {
      const expectedResult = await userService.findAll();

      await request(app.getHttpServer())
        .get('/api/v1/users')
        .expect(200)
        .expect(expectedResult);
    });
  });

  describe('/api/v1/users/:id (GET)', () => {
    it('should return a user by id', async () => {
      const expectedResult = await userService.findOne(1);

      await request(app.getHttpServer())
        .get('/api/v1/users/1')
        .expect(200)
        .expect(expectedResult);
    });

    it('should return 404 if user not found', async () => {
      jest.spyOn(userService, 'findOne').mockImplementation(() => {
        throw new NotFoundException();
      });

      await request(app.getHttpServer()).get('/api/v1/users/1').expect(404);
    });
  });

  describe('/api/v1/users/:id (PATCH)', () => {
    it('should update and return a user', async () => {
      const expectedResult = await userService.update(1, updateUserDto);

      await request(app.getHttpServer())
        .patch('/api/v1/users/1')
        .send(updateUserDto)
        .expect(200)
        .expect(expectedResult);
    });
  });

  describe('/api/v1/users/:id (DELETE)', () => {
    it('should delete and return a user', async () => {
      const expectedResult = await userService.delete(1);

      await request(app.getHttpServer())
        .patch('/api/v1/users/1')
        .expect(200)
        .expect(expectedResult);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
