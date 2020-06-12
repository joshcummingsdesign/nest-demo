import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities';
import { Auth } from '../auth/entities';
import { RoleName } from '../role/entities';
import { CryptoService } from '../crypto/crypto.service';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
    private cryptoService: CryptoService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      email: createUserDto.email,
    });

    if (existingUser) {
      throw new ConflictException('User email already exists');
    }

    const { password, role, instrument, ...userData } = createUserDto;

    // TODO: Fix deletion of instrument issue
    const data = {
      ...userData,
      role: { name: role },
      instrument: { name: instrument },
    };

    const createdUser = await this.userRepository.save(data);
    const hashedPassword = await this.cryptoService.hashPassword(password);

    await this.authRepository.save({
      userId: createdUser.id,
      password: hashedPassword,
    });

    return createdUser;
  }

  findAll(role?: RoleName): Promise<User[]> {
    const query = role ? { role: { name: role } } : undefined;
    return this.userRepository.find(query);
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmail(
    email: string,
    options?: { withAuth: boolean },
  ): Promise<User> {
    const relations = options && options.withAuth ? ['auth'] : undefined;
    const user = await this.userRepository.findOne({ email }, { relations });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    const { instrument, ...userData } = updateUserDto;

    const data = {
      ...userData,
      instrument: {
        name: instrument,
      },
    };

    await this.userRepository.update(id, data);

    return Object.assign({}, user, data);
  }

  async delete(id: number): Promise<User> {
    const user = await this.findOne(id);
    await this.userRepository.delete(id);
    return user;
  }
}
