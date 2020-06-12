import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Availability } from './entities';
import { AddAvailabilityDto } from './dto';

@Injectable()
export class AvailabilityService {
  constructor(
    @InjectRepository(Availability)
    private availabilityRepository: Repository<Availability>,
  ) {}

  create(
    userId: number,
    availability: AddAvailabilityDto,
  ): Promise<Availability> {
    // TODO: Check to make sure you are not already available at this time
    return this.availabilityRepository.save({ ...availability, userId });
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
