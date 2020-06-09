import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { EConfigOptions } from 'src/config';

@Injectable()
export class CryptoService {
  constructor(private configService: ConfigService) {}

  hashPassword(password: string): Promise<string> {
    const saltRounds = this.configService.get<number>(
      EConfigOptions.CRYPTO_SALT_ROUNDS,
    );
    return bcrypt.hash(password, saltRounds);
  }

  comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
