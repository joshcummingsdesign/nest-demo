import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { mockLessonService } from './__mocks__/lesson.service';
import { bookLessonDto } from '../__fixtures__';

describe('LessonController', () => {
  let app: INestApplication;
  let lessonService: LessonService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [LessonController],
      providers: [{ provide: LessonService, useFactory: mockLessonService }],
    }).compile();

    app = module.createNestApplication();
    lessonService = module.get<LessonService>(LessonService);

    await app.init();
  });

  describe('/api/v1/lessons (POST)', () => {
    it('should create and return a lesson', async () => {
      const expectedResult = await lessonService.create(1, bookLessonDto);

      await request(app.getHttpServer())
        .post('/api/v1/lessons')
        .send(bookLessonDto)
        .expect(201)
        .expect(expectedResult);
    });
  });

  // TODO: test students and teachers
  describe('/api/v1/lessons (GET)', () => {
    it('should return all lessons', async () => {
      const expectedResult = await lessonService.findAll(1, 'student');

      await request(app.getHttpServer())
        .get('/api/v1/lessons')
        .expect(200)
        .expect(expectedResult);
    });
  });

  describe('/api/v1/lessons/:id (DELETE)', () => {
    it('should delete and return a lesson', async () => {
      const expectedResult = await lessonService.delete(1, 1);

      await request(app.getHttpServer())
        .delete('/api/v1/lessons/1')
        .expect(200)
        .expect(expectedResult);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
