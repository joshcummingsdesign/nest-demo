import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { Auth } from './entities';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Auth]),
    PassportModule,
    forwardRef(() => UserModule),
  ],
  providers: [AuthService, LocalStrategy],
  exports: [TypeOrmModule],
  controllers: [AuthController],
})
export class AuthModule {}
