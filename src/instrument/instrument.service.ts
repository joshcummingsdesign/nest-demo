import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Instrument, InstrumentName } from './entities';
import { Repository } from 'typeorm';

@Injectable()
export class InstrumentService {
  constructor(
    @InjectRepository(Instrument)
    private instrumentRepository: Repository<Instrument>,
  ) {}

  findAll(): Promise<Instrument[]> {
    return this.instrumentRepository.find();
  }
}
