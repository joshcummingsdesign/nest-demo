import { Controller, Get } from '@nestjs/common';
import { InstrumentService } from './instrument.service';
import { Instrument } from './entities';

@Controller('api/v1/instruments')
export class InstrumentController {
  constructor(private instrumentService: InstrumentService) {}

  @Get()
  async getAllInstruments(): Promise<Instrument[]> {
    return this.instrumentService.findAll();
  }
}
