import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { validationSchema } from './config';
import { CryptoModule } from './crypto/crypto.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { InstrumentModule } from './instrument/instrument.module';
import { UserModule } from './user/user.module';
import { LessonModule } from './lesson/lesson.module';
import { AvailabilityModule } from './availability/availability.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validationSchema }),
    TypeOrmModule.forRoot(),
    CryptoModule,
    AuthModule,
    RoleModule,
    InstrumentModule,
    UserModule,
    LessonModule,
    AvailabilityModule,
  ],
})
export class AppModule {}
