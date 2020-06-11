import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { MockJwtModule, getMockToken } from '../utils/test-utils';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { mockLessonService } from './__mocks__/lesson.service';
import { bookLessonDto, user, lesson } from '../__fixtures__';

describe('LessonController', () => {
  let app: INestApplication;
  let lessonService: LessonService;
  let jwtService: JwtService;
  let token: string;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [MockJwtModule],
      controllers: [LessonController],
      providers: [{ provide: LessonService, useFactory: mockLessonService }],
    }).compile();

    app = module.createNestApplication();
    lessonService = module.get<LessonService>(LessonService);
    jwtService = module.get<JwtService>(JwtService);
    token = getMockToken(jwtService);

    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('/api/v1/lessons (POST)', () => {
    it('should create and return a lesson', async () => {
      const expectedResult = await lessonService.create(user.id, bookLessonDto);

      await request(app.getHttpServer())
        .post('/api/v1/lessons')
        .send(bookLessonDto)
        .set('Authorization', token)
        .expect(201)
        .expect(expectedResult);
    });
  });

  describe('/api/v1/lessons (GET)', () => {
    it('should return all lessons', async () => {
      const expectedResult = await lessonService.findAll(user.id, user.role);

      await request(app.getHttpServer())
        .get('/api/v1/lessons')
        .set('Authorization', token)
        .expect(200)
        .expect(expectedResult);
    });
  });

  describe('/api/v1/lessons/:id (DELETE)', () => {
    it('should delete and return a lesson', async () => {
      const expectedResult = await lessonService.delete(user.id, lesson.id);

      await request(app.getHttpServer())
        .delete('/api/v1/lessons/1')
        .set('Authorization', token)
        .expect(200)
        .expect(expectedResult);
    });
  });
});
