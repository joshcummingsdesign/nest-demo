import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, ERole } from './entities';
import { Auth } from '../auth/entities';
import { UserService } from './user.service';
import { CryptoService } from '../crypto/crypto.service';
import { mockUserRepository } from './__mocks__/user.repository';
import { mockAuthRepository } from '../auth/__mocks__/auth.repository';
import { mockCryptoService } from '../crypto/__mocks__/crypto.service';
import {
  user,
  createUserDto,
  auth,
  users,
  teachers,
  students,
} from '../__fixtures__';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;
  let authRepository: Repository<Auth>;
  let cryptoService: CryptoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getRepositoryToken(User), useFactory: mockUserRepository },
        { provide: getRepositoryToken(Auth), useFactory: mockAuthRepository },
        { provide: CryptoService, useFactory: mockCryptoService },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    authRepository = module.get<Repository<Auth>>(getRepositoryToken(Auth));
    cryptoService = module.get<CryptoService>(CryptoService);
  });

  describe('create', () => {
    it('should create user', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

      expect(await userService.create(createUserDto)).toBe(user);
      expect(userRepository.findOne).toHaveBeenCalledTimes(1);
      expect(userRepository.save).toHaveBeenCalledTimes(1);
      expect(cryptoService.hashPassword).toHaveBeenCalledWith(auth.password);
      expect(authRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should throw if user exists', () => {
      expect(userService.create(createUserDto)).rejects.toThrow(
        'User email already exists',
      );
    });
  });

  describe('findAll', () => {
    it('should find all users', async () => {
      expect(await userService.findAll()).toBe(users);
      expect(userRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should find all teachers', async () => {
      jest.spyOn(userRepository, 'find').mockResolvedValue(teachers as User[]);

      expect(await userService.findAll(ERole.teacher)).toBe(teachers);
      expect(userRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should find all students', async () => {
      jest.spyOn(userRepository, 'find').mockResolvedValue(students as User[]);

      expect(await userService.findAll(ERole.student)).toBe(students);
      expect(userRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should find a user by id', async () => {
      expect(await userService.findOne(user.id)).toBe(user);
      expect(userRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should throw if user not found', () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

      expect(userService.findOne(user.id)).rejects.toThrow('User not found');
    });
  });

  describe('findByEmail', () => {
    it('should find a user by email', async () => {
      expect(await userService.findByEmail(user.email)).toBe(user);
      expect(userRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should throw if user not found', () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

      expect(userService.findByEmail(user.email)).rejects.toThrow(
        'User not found',
      );
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      jest.spyOn(userService, 'findOne');

      expect(await userService.update(user.id, user)).toMatchObject(user);
      expect(userService.findOne).toHaveBeenCalledTimes(1);
      expect(userRepository.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      jest.spyOn(userService, 'findOne');

      expect(await userService.delete(user.id)).toBe(user);
      expect(userService.findOne).toHaveBeenCalledTimes(1);
      expect(userRepository.delete).toHaveBeenCalledTimes(1);
    });
  });
});
