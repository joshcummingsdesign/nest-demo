import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { LessonModule } from './lesson/lesson.module';
import { AvailabilityModule } from './availability/availability.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    LessonModule,
    AvailabilityModule,
  ],
})
export class AppModule {}
