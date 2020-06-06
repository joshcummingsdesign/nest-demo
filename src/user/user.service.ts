import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  save(user: CreateUserDto): Promise<User> {
    return this.userRepository.save(user);
  }

  find(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`A user with an id of ${id} does not exist.`);
    }
    return user;
  }

  async delete(id: number): Promise<User> {
    const user = await this.findOne(id);
    await this.userRepository.delete({ id });
    return user;
  }
}
