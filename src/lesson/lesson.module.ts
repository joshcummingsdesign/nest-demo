import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './entities';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { AvailabilityModule } from '../availability/availability.module';

@Module({
  imports: [TypeOrmModule.forFeature([Lesson]), AvailabilityModule],
  controllers: [LessonController],
  providers: [LessonService],
})
export class LessonModule {}
