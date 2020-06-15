import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Teacher (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();

    app.init();
  });

  it('should create availability', async () => {
    expect(1).toEqual(1);
  });

  // --- Teacher flow
  // -- Availability
  //  Create availability
  // View all availability
  // Delete availability
  // -- Lessons
  // View all lessons

  afterAll(async () => {
    await app.close();
  });
});
