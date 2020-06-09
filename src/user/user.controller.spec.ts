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
      await request(app.getHttpServer())
        .post('/api/v1/users', createUserDto)
        .expect(201)
        .expect(userService.create(createUserDto));
    });

    it('should return 409 if user exists', async () => {
      jest.spyOn(userService, 'create').mockImplementation(() => {
        throw new ConflictException();
      });

      await request(app.getHttpServer())
        .post('/api/v1/users', createUserDto)
        .expect(409);
    });
  });

  describe('/api/v1/users (GET)', () => {
    it('should return all users', async () => {
      await request(app.getHttpServer())
        .get('/api/v1/users')
        .expect(200)
        .expect(userService.findAll());
    });
  });

  describe('/api/v1/users/:id (GET)', () => {
    it('should return a user by id', async () => {
      await request(app.getHttpServer())
        .get('/api/v1/users/1')
        .expect(200)
        .expect(userService.findOne(1));
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
      await request(app.getHttpServer())
        .patch('/api/v1/users/1', updateUserDto)
        .expect(200)
        .expect(userService.update(1, updateUserDto));
    });
  });

  describe('/api/v1/users/:id (DELETE)', () => {
    it('should delete and return a user', async () => {
      await request(app.getHttpServer())
        .patch('/api/v1/users/1')
        .expect(200)
        .expect(userService.delete(1));
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
