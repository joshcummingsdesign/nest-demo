import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { MockJwtModule, getMockToken } from '../utils/test-utils';
import { ERole } from '../role/entities';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { mockLessonService } from './__mocks__/lesson.service';
import { bookLessonDto, student, lesson } from '../__fixtures__';

describe('LessonController', () => {
  let app: INestApplication;
  let lessonService: LessonService;
  let jwtService: JwtService;
  let studentToken: string;
  let teacherToken: string;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [MockJwtModule],
      controllers: [LessonController],
      providers: [{ provide: LessonService, useFactory: mockLessonService }],
    }).compile();

    app = module.createNestApplication();
    lessonService = module.get<LessonService>(LessonService);
    jwtService = module.get<JwtService>(JwtService);
    studentToken = getMockToken(jwtService, ERole.student);
    teacherToken = getMockToken(jwtService, ERole.teacher);

    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('/api/v1/lessons (POST)', () => {
    it('should create and return a lesson', async () => {
      const expectedResult = await lessonService.create(
        student.id,
        bookLessonDto,
      );

      await request(app.getHttpServer())
        .post('/api/v1/lessons')
        .send(bookLessonDto)
        .set('Authorization', studentToken)
        .expect(201)
        .expect(expectedResult);
    });

    it('should only allow students to book a lesson', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/lessons')
        .set('Authorization', teacherToken)
        .expect(403);
    });
  });

  describe('/api/v1/lessons (GET)', () => {
    it('should return all lessons', async () => {
      const expectedResult = await lessonService.findAll(
        student.id,
        student.role.name,
      );

      await request(app.getHttpServer())
        .get('/api/v1/lessons')
        .set('Authorization', studentToken)
        .expect(200)
        .expect(expectedResult);
    });
  });

  describe('/api/v1/lessons/:id (DELETE)', () => {
    it('should delete and return a lesson', async () => {
      const expectedResult = await lessonService.delete(student.id, lesson.id);

      await request(app.getHttpServer())
        .delete('/api/v1/lessons/1')
        .set('Authorization', studentToken)
        .expect(200)
        .expect(expectedResult);
    });

    it('should only allow students to cancel a lesson', async () => {
      await request(app.getHttpServer())
        .delete('/api/v1/lessons/1')
        .set('Authorization', teacherToken)
        .expect(403);
    });
  });
});
