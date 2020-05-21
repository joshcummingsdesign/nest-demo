import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { INestApplication } from '@nestjs/common';
import { Cat } from 'src/cats/interfaces/cat.interface';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const cat: Cat = {
    name: 'Ace',
    age: 10,
    breed: 'Domestic Shorthair',
  };

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/v1/cats (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/v1/cats')
      .send(cat)
      .expect(201)
      .expect(cat);
  });

  it('/api/v1/cats (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/v1/cats')
      .expect(200)
      .expect([cat]);
  });

  it('/api/v1/cats/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/v1/cats/Ace')
      .expect(200)
      .expect(cat);
  });
});
