import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Availability, Lesson } from './entities';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Availability]),
    TypeOrmModule.forFeature([Lesson]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
