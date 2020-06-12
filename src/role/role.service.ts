import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, RoleName } from './entities';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private instrumentRepository: Repository<Role>,
  ) {}

  async findByName(name: RoleName): Promise<Role> {
    const role = await this.instrumentRepository.findOne({ name });
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return role;
  }
}
