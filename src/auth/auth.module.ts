import { Module, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { EConfigOptions } from 'src/config';
import { Auth } from './entities';
import { AuthService } from './auth.service';
import { LocalStrategy, JwtStrategy } from './strategies';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { CryptoModule } from 'src/crypto/crypto.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Auth]),
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>(EConfigOptions.JWT_SECRET),
        signOptions: {
          expiresIn: configService.get<string>(EConfigOptions.JWT_EXPIRE_TIME),
        },
      }),
    }),
    forwardRef(() => UserModule),
    CryptoModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [TypeOrmModule],
  controllers: [AuthController],
})
export class AuthModule {}
