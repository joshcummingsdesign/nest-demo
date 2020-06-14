import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { parseISO, isBefore } from 'date-fns';
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
    const datetime = parseISO(addAvailabilityDto.datetime);

    const existingAvailability = await this.availabilityRepository.findOne({
      where: { userId, datetime },
    });

    if (existingAvailability) {
      throw new ConflictException('Availability at this time already exists');
    }

    if (isBefore(datetime, Date.now())) {
      throw new ConflictException('Availability must be a time in the future');
    }

    return this.availabilityRepository.save({ ...addAvailabilityDto, userId });
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

  async delete(userId: number, id: number): Promise<Availability> {
    // TODO: Check to make sure there is not a lesson at this time
    const availability = await this.findOne(userId, id);
    await this.availabilityRepository.delete(id);
    return availability;
  }
}
