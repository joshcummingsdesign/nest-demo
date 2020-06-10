import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AvailabilityService } from './availability.service';
import { AvailabilityController } from './availability.controller';
import { mockAvailabilityService } from './__mocks__/availability.service';
import { addAvailabilityDto } from '../__fixtures__';

describe('AvailabilityController', () => {
  let app: INestApplication;
  let availabilityService: AvailabilityService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AvailabilityController],
      providers: [
        { provide: AvailabilityService, useFactory: mockAvailabilityService },
      ],
    }).compile();

    app = module.createNestApplication();
    availabilityService = module.get<AvailabilityService>(AvailabilityService);

    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('/api/v1/availability (POST)', () => {
    it('should create and return an availability', async () => {
      const expectedResult = await availabilityService.create(
        1,
        addAvailabilityDto,
      );

      await request(app.getHttpServer())
        .post('/api/v1/availability')
        .send(addAvailabilityDto)
        .expect(201)
        .expect(expectedResult);
    });
  });

  describe('/api/v1/availability (GET)', () => {
    it("should return current user's availability", async () => {
      const expectedResult = await availabilityService.findAll(1);

      await request(app.getHttpServer())
        .get('/api/v1/availability')
        .expect(200)
        .expect(expectedResult);
    });
  });

  describe('/api/v1/availability/user/:userId (GET)', () => {
    it('should return availability by user id', async () => {
      const expectedResult = await availabilityService.findAll(1);

      await request(app.getHttpServer())
        .get('/api/v1/availability/user/1')
        .expect(200)
        .expect(expectedResult);
    });
  });

  describe('/api/v1/availability/:id (DELETE)', () => {
    it('should delete and return an availability', async () => {
      const expectedResult = await availabilityService.delete(1, 1);

      await request(app.getHttpServer())
        .delete('/api/v1/availability/1')
        .expect(200)
        .expect(expectedResult);
    });
  });
});
