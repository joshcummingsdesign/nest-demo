import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher, Availability } from './entities';
import { TeacherController } from './teacher.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Teacher]),
    TypeOrmModule.forFeature([Availability]),
  ],
  controllers: [TeacherController],
})
export class TeacherModule {}
