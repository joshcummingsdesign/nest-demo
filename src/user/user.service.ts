import {
  Injectable,
  NotFoundException,
  ConflictException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities';
import { RoleName } from '../role/entities';
import { CryptoService } from '../crypto/crypto.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { InstrumentService } from '../instrument/instrument.service';
import { RoleService } from '../role/role.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
    private cryptoService: CryptoService,
    private instrumentService: InstrumentService,
    private roleService: RoleService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, role, instrument, ...userData } = createUserDto;

    const existingUser = await this.userRepository.findOne({
      email: createUserDto.email,
    });

    if (existingUser) {
      throw new ConflictException('User email already exists');
    }

    const foundRole = await this.roleService.findByName(createUserDto.role);
    const foundInstrument = await this.instrumentService.findByName(
      createUserDto.instrument,
    );

    const mergedUser = new User({
      ...userData,
      role: foundRole,
      instrument: foundInstrument,
    });

    const createdUser = await this.userRepository.save(mergedUser);

    const hashedPassword = await this.cryptoService.hashPassword(password);

    await this.authService.create(createdUser.id, hashedPassword);

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

    let instrument = user.instrument;
    if (updateUserDto.instrument) {
      instrument = await this.instrumentService.findByName(
        updateUserDto.instrument,
      );
    }

    const mergedUser = new User({ ...user, ...updateUserDto, instrument });

    return await this.userRepository.save(mergedUser);
  }

  async delete(id: number): Promise<User> {
    const user = await this.findOne(id);
    await this.userRepository.delete(id);
    return user;
  }
}
