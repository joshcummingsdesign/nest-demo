import { Module, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { EConfigOptions } from '../config';
import { Auth } from './entities';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy, JwtStrategy } from './strategies';
import { UserModule } from '../user/user.module';
import { CryptoModule } from '../crypto/crypto.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Auth]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        privateKey: configService.get<string>(EConfigOptions.JWT_PRIVATE_KEY),
        publicKey: configService.get<string>(EConfigOptions.JWT_PUBLIC_KEY),
        signOptions: {
          expiresIn: configService.get<string>(EConfigOptions.JWT_EXPIRE_TIME),
          algorithm: 'RS256',
        },
      }),
    }),
    forwardRef(() => UserModule),
    CryptoModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [TypeOrmModule],
})
export class AuthModule {}
