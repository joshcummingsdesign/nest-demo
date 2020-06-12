import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Instrument } from './entities';
import { InstrumentService } from './instrument.service';
import { InstrumentController } from './instrument.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Instrument])],
  providers: [InstrumentService],
  exports: [InstrumentService],
  controllers: [InstrumentController],
})
export class InstrumentModule {}
