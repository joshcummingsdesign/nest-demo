import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { InstrumentService } from './instrument.service';
import { InstrumentController } from './instrument.controller';
import { mockInstrumentService } from './__mocks__/instrument.service';

describe('InstrumentController', () => {
  let app: INestApplication;
  let instrumentService: InstrumentService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [InstrumentController],
      providers: [
        { provide: InstrumentService, useFactory: mockInstrumentService },
      ],
    }).compile();

    app = module.createNestApplication();
    instrumentService = module.get<InstrumentService>(InstrumentService);

    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('GET /api/v1/instruments', () => {
    it('should return all instruments', async () => {
      const expectedResult = await instrumentService.findAll();

      await request(app.getHttpServer())
        .get('/api/v1/instruments')
        .expect(200)
        .expect(expectedResult);
    });
  });
});
