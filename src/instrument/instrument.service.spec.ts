import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Instrument } from './entities';
import { InstrumentService } from './instrument.service';
import { mockInstrumentRepository } from './__mocks__/instrument.repository';
import { instruments } from '../__fixtures__';

describe('InstrumenService', () => {
  let instrumentService: InstrumentService;
  let instrumentRepository: Repository<Instrument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InstrumentService,
        {
          provide: getRepositoryToken(Instrument),
          useFactory: mockInstrumentRepository,
        },
      ],
    }).compile();

    instrumentService = module.get<InstrumentService>(InstrumentService);
    instrumentRepository = module.get<Repository<Instrument>>(
      getRepositoryToken(Instrument),
    );
  });

  describe('findAll', () => {
    it('should find all instruments', async () => {
      expect(await instrumentService.findAll()).toBe(instruments);
      expect(instrumentRepository.find).toHaveBeenCalledTimes(1);
    });
  });
});
