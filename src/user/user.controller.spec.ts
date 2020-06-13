import {
  INestApplication,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { ERole } from '../role/entities';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { mockUserService } from './__mocks__/user.service';
import { MockJwtModule, getMockToken } from '../utils/test-utils';
import { createUserDto, updateUserDto, student } from '../__fixtures__';

describe('UserController', () => {
  let app: INestApplication;
  let userService: UserService;
  let jwtService: JwtService;
  let token: string;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [MockJwtModule],
      controllers: [UserController],
      providers: [{ provide: UserService, useFactory: mockUserService }],
    }).compile();

    app = module.createNestApplication();
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
    token = getMockToken(jwtService, ERole.student);

    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('POST /api/v1/users', () => {
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

  describe('GET /api/v1/users', () => {
    it('should return all users', async () => {
      const expectedResult = await userService.findAll();

      await request(app.getHttpServer())
        .get('/api/v1/users')
        .expect(200)
        .expect(expectedResult);
    });

    it('should return all teachers', async () => {
      const expectedResult = await userService.findAll(ERole.teacher);

      await request(app.getHttpServer())
        .get('/api/v1/users?role=teacher')
        .expect(200)
        .expect(expectedResult);
    });

    it('should return all students', async () => {
      const expectedResult = await userService.findAll(ERole.student);

      await request(app.getHttpServer())
        .get('/api/v1/users?role=student')
        .expect(200)
        .expect(expectedResult);
    });
  });

  describe('GET /api/v1/users/id/:userId', () => {
    it('should return a user by id', async () => {
      const expectedResult = await userService.findOne(student.id);

      await request(app.getHttpServer())
        .get('/api/v1/users/id/1')
        .expect(200)
        .expect(expectedResult);
    });

    it('should return 404 if user not found', async () => {
      jest.spyOn(userService, 'findOne').mockImplementation(() => {
        throw new NotFoundException();
      });

      await request(app.getHttpServer()).get('/api/v1/users/id/1').expect(404);
    });
  });

  describe('GET /api/v1/users/self', () => {
    it('should return the current user', async () => {
      const expectedResult = await userService.findOne(student.id);

      await request(app.getHttpServer())
        .get('/api/v1/users/self')
        .set('Authorization', token)
        .expect(200)
        .expect(expectedResult);
    });
  });

  describe('PATCH /api/v1/users/self', () => {
    it('should update and return the current user', async () => {
      const expectedResult = await userService.update(
        student.id,
        updateUserDto,
      );

      await request(app.getHttpServer())
        .patch('/api/v1/users/self')
        .send(updateUserDto)
        .set('Authorization', token)
        .expect(200)
        .expect(expectedResult);
    });
  });

  describe('DELETE /api/v1/users/self', () => {
    it('should delete and return the current user', async () => {
      const expectedResult = await userService.delete(student.id);

      await request(app.getHttpServer())
        .delete('/api/v1/users/self')
        .set('Authorization', token)
        .expect(200)
        .expect(expectedResult);
    });
  });
});
