import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(user: CreateUserDto): Promise<User> {
    return this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: number, userData: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    await this.userRepository.update(id, userData);
    return Object.assign({}, user, userData);
  }

  async delete(id: number): Promise<User> {
    const user = await this.findOne(id);
    await this.userRepository.delete(id);
    return user;
  }
}
