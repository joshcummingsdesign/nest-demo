import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Student (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();

    app.init();
  });

  it('should create account', async () => {
    expect(1).toEqual(1);
  });

  // --- Student flow
  // -- Profile
  // Create account
  // Login
  // View profile
  // Update profile
  // -- Availability
  // View all teachers
  // View teacher availability
  // -- Lessons
  // Create a lesson
  // View all lessons
  // Cancel a lesson

  afterAll(async () => {
    await app.close();
  });
});
