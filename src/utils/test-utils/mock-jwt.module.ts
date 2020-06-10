import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MockJwtStrategy } from './mock-jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '10s' },
    }),
  ],
  providers: [MockJwtStrategy],
  exports: [JwtModule],
})
export class MockJwtModule {}
