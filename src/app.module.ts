import {
  Module,
  ValidationPipe,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { validationSchema } from './config';
import { CryptoModule } from './crypto/crypto.module';
import { EmailModule } from './email/email.module';
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
    EmailModule,
    AuthModule,
    RoleModule,
    InstrumentModule,
    UserModule,
    LessonModule,
    AvailabilityModule,
    EmailModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          whitelist: true,
          forbidNonWhitelisted: true,
          forbidUnknownValues: true,
        }),
    },
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
  ],
})
export class AppModule {}
