import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Auth } from './entities';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { CryptoService } from '../crypto/crypto.service';
import { mockAuthRepository } from './__mocks__/auth.repository';
import { mockUserService } from '../user/__mocks__/user.service';
import { mockCryptoService } from '../crypto/__mocks__/crypto.service';
import { user, userAuth, createUserDto } from '../__fixtures__';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let cryptoService: CryptoService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'secretKey',
          signOptions: { expiresIn: '10s' },
        }),
      ],
      providers: [
        AuthService,
        { provide: getRepositoryToken(Auth), useFactory: mockAuthRepository },
        { provide: UserService, useFactory: mockUserService },
        { provide: CryptoService, useFactory: mockCryptoService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    cryptoService = module.get<CryptoService>(CryptoService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('validateUser', () => {
    it('should validate a user', async () => {
      expect(
        await authService.validateUser({
          email: createUserDto.email,
          password: createUserDto.password,
        }),
      ).toMatchObject(user);

      expect(userService.findByEmail).toHaveBeenCalledWith(user.email, {
        withAuth: true,
      });

      expect(cryptoService.comparePassword).toHaveBeenCalledWith(
        createUserDto.password,
        userAuth.auth.password,
      );
    });

    it('should throw on invalid password', () => {
      jest.spyOn(cryptoService, 'comparePassword').mockResolvedValue(false);

      expect(
        authService.validateUser({
          email: createUserDto.email,
          password: createUserDto.password,
        }),
      ).rejects.toThrow('Unauthorized');
    });
  });

  describe('login', () => {
    it('should authenticate a user', () => {
      jest.spyOn(jwtService, 'sign');

      expect(authService.login(userAuth)).toMatchObject({
        access_token: expect.any(String),
      });

      expect(jwtService.sign).toHaveBeenCalledWith({
        username: user.email,
        sub: user.id,
      });
    });
  });

  describe('validateJwtPayload', () => {
    it('should validate user by token payload', async () => {
      expect(
        await authService.validateJwtPayload({
          id: user.id,
          email: user.email,
        }),
      ).toBe(user);

      expect(userService.findOne).toHaveBeenCalledWith(user.id);
    });
  });
});
