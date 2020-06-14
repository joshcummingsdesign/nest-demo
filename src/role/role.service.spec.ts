import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities';
import { RoleService } from './role.service';
import { mockRoleRepository } from './__mocks__/role.repository';
import { studentRole } from '../__fixtures__';

describe('RoleService', () => {
  let roleService: RoleService;
  let roleRepository: Repository<Role>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleService,
        {
          provide: getRepositoryToken(Role),
          useFactory: mockRoleRepository,
        },
      ],
    }).compile();

    roleService = module.get<RoleService>(RoleService);
    roleRepository = module.get<Repository<Role>>(getRepositoryToken(Role));
  });

  describe('findAll', () => {
    it('should find role by name', async () => {
      expect(await roleService.findByName(studentRole.name)).toBe(studentRole);
      expect(roleRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should throw if role not found', () => {
      jest.spyOn(roleRepository, 'findOne').mockResolvedValue(undefined);
      expect(roleService.findByName(studentRole.name)).rejects.toThrow(
        'Role not found',
      );
    });
  });
});
