import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { parseISO, isBefore, formatISO } from 'date-fns';
import { Availability } from './entities';
import { AddAvailabilityDto } from './dto';

@Injectable()
export class AvailabilityService {
  constructor(
    @InjectRepository(Availability)
    private availabilityRepository: Repository<Availability>,
  ) {}

  async create(
    userId: number,
    addAvailabilityDto: AddAvailabilityDto,
  ): Promise<Availability> {
    const datetime = formatISO(parseISO(addAvailabilityDto.datetime));

    if (isBefore(parseISO(datetime), Date.now())) {
      throw new ConflictException('Availability must be a time in the future');
    }

    const existingAvailability = await this.availabilityRepository.findOne({
      where: { userId, datetime },
    });

    if (existingAvailability) {
      throw new ConflictException('Availability at this time already exists');
    }

    return this.availabilityRepository.save({
      userId,
      datetime,
    });
  }

  findAll(userId: number): Promise<Availability[]> {
    return this.availabilityRepository.find({
      where: { userId },
      order: { datetime: 'ASC' },
    });
  }

  async findOne(userId: number, id: number): Promise<Availability> {
    const availability = await this.availabilityRepository.findOne({
      where: { userId, id },
    });
    if (!availability) {
      throw new NotFoundException('Availability not found');
    }
    return availability;
  }

  findByDatetime(userId: number, datetime: string): Promise<Availability> {
    return this.availabilityRepository.findOne({
      where: { userId, datetime },
    });
  }

  async update(
    userId: number,
    datetime: string,
    available: boolean,
  ): Promise<Availability> {
    const availability = await this.findByDatetime(userId, datetime);
    return this.availabilityRepository.save({
      ...availability,
      available,
    });
  }

  async delete(userId: number, id: number): Promise<Availability> {
    const availability = await this.findOne(userId, id);

    if (!availability.available) {
      throw new ConflictException('There is a lesson at this time');
    }

    await this.availabilityRepository.delete(id);

    return availability;
  }
}
