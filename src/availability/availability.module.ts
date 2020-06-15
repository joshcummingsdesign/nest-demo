import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Availability } from './entities';
import { AvailabilityService } from './availability.service';
import { AvailabilityController } from './availability.controller';
import { LessonModule } from '../lesson/lesson.module';

@Module({
  imports: [TypeOrmModule.forFeature([Availability]), LessonModule],
  controllers: [AvailabilityController],
  providers: [AvailabilityService],
})
export class AvailabilityModule {}
