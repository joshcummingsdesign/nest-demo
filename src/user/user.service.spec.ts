import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities';
import { Auth } from '../auth/entities';
import { UserService } from './user.service';
import { CryptoService } from '../crypto/crypto.service';
import { user, createUserDto, auth } from '../__fixtures__';

// TODO: Create a mock for this
jest.mock('../crypto/crypto.service');

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;
  let authRepository: Repository<Auth>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getRepositoryToken(User), useClass: Repository },
        { provide: getRepositoryToken(Auth), useClass: Repository },
        CryptoService,
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    authRepository = module.get<Repository<Auth>>(getRepositoryToken(Auth));
  });

  describe('create', () => {
    it('should create user', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);
      jest.spyOn(userRepository, 'save').mockResolvedValue(user);
      jest.spyOn(authRepository, 'save').mockResolvedValue(auth);

      expect(await userService.create(createUserDto)).toBe(user);
      expect(userRepository.findOne).toHaveBeenCalledTimes(1);
      expect(userRepository.save).toHaveBeenCalledTimes(1);
      expect(authRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should throw if user exists', () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

      expect(userService.create(createUserDto)).rejects.toThrow(
        'User email already exists',
      );
    });
  });
});
