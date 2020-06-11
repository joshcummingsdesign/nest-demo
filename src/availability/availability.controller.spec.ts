import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { MockJwtModule, getMockToken } from '../utils/test-utils';
import { ERole } from '../user/entities';
import { AvailabilityService } from './availability.service';
import { AvailabilityController } from './availability.controller';
import { mockAvailabilityService } from './__mocks__/availability.service';
import { addAvailabilityDto, teacher, availability } from '../__fixtures__';

describe('AvailabilityController', () => {
  let app: INestApplication;
  let availabilityService: AvailabilityService;
  let jwtService: JwtService;
  let studentToken: string;
  let teacherToken: string;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [MockJwtModule],
      controllers: [AvailabilityController],
      providers: [
        { provide: AvailabilityService, useFactory: mockAvailabilityService },
      ],
    }).compile();

    app = module.createNestApplication();
    availabilityService = module.get<AvailabilityService>(AvailabilityService);
    jwtService = module.get<JwtService>(JwtService);
    studentToken = getMockToken(jwtService, ERole.student);
    teacherToken = getMockToken(jwtService, ERole.teacher);

    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('/api/v1/availability (POST)', () => {
    it('should create and return an availability', async () => {
      const expectedResult = await availabilityService.create(
        teacher.id,
        addAvailabilityDto,
      );

      await request(app.getHttpServer())
        .post('/api/v1/availability')
        .send(addAvailabilityDto)
        .set('Authorization', teacherToken)
        .expect(201)
        .expect(expectedResult);
    });

    it('should only allow teachers to add availability', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/availability')
        .set('Authorization', studentToken)
        .expect(403);
    });
  });

  describe('/api/v1/availability (GET)', () => {
    it("should return the user's availability", async () => {
      const expectedResult = await availabilityService.findAll(teacher.id);

      await request(app.getHttpServer())
        .get('/api/v1/availability')
        .set('Authorization', teacherToken)
        .expect(200)
        .expect(expectedResult);
    });

    it('should only allow teachers to view own availability', async () => {
      await request(app.getHttpServer())
        .get('/api/v1/availability')
        .set('Authorization', studentToken)
        .expect(403);
    });
  });

  describe('/api/v1/availability/user/:userId (GET)', () => {
    it('should return availability by user id', async () => {
      const expectedResult = await availabilityService.findAll(teacher.id);

      await request(app.getHttpServer())
        .get('/api/v1/availability/user/1')
        .expect(200)
        .expect(expectedResult);
    });
  });

  describe('/api/v1/availability/self/:id (DELETE)', () => {
    it('should delete and return an availability', async () => {
      const expectedResult = await availabilityService.delete(
        teacher.id,
        availability.id,
      );

      await request(app.getHttpServer())
        .delete('/api/v1/availability/self/1')
        .set('Authorization', teacherToken)
        .expect(200)
        .expect(expectedResult);
    });

    it('should only allow teachers to delete an availability', async () => {
      await request(app.getHttpServer())
        .delete('/api/v1/availability/self/1')
        .set('Authorization', studentToken)
        .expect(403);
    });
  });
});
