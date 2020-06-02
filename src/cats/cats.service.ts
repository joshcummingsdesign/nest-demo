import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat as CatEntity } from './entities/cat.entity';
import { Repository } from 'typeorm';
import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(CatEntity)
    private catRepository: Repository<CatEntity>,
  ) {}

  async create(cat: CreateCatDto): Promise<Cat> {
    const existingCat = await this.findByName(cat.name);
    if (existingCat) {
      throw new ConflictException(
        `A Cat with the name ${existingCat.name} already exists.`,
      );
    }
    return this.catRepository.save(cat);
  }

  findAll(): Promise<Cat[]> {
    return this.catRepository.find();
  }

  async findOne(id: number): Promise<Cat> {
    const cat = await this.catRepository.findOne(id);
    if (!cat) {
      throw new NotFoundException();
    }
    return cat;
  }

  private async findByName(name: string): Promise<Cat> {
    const cats = await this.catRepository.find();
    return cats.find((cat) => cat.name === name);
  }
}
