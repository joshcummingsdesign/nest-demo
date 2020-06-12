import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findByName(name: InstrumentName): Promise<Instrument> {
    const instrument = await this.instrumentRepository.findOne({ name });
    if (!instrument) {
      throw new NotFoundException('Instrument not found');
    }
    return instrument;
  }
}
