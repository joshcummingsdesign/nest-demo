import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Headers,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { Availability } from './entities';
import { AvailabilityService } from './availability.service';
import { AddAvailabilityDto } from './dto';

@Controller('api/v1/availability')
export class AvailabilityController {
  constructor(private availabilityService: AvailabilityService) {}

  @Post()
  addAvailability(
    @Body() availability: AddAvailabilityDto,
    @Headers('authorization') authorization: string,
  ): Promise<Availability> {
    // TODO: Should come from authenticated user
    const userId = parseInt(authorization);
    return this.availabilityService.createAvailability(userId, availability);
  }

  @Get()
  getMyAvailability(
    @Headers('authorization') authorization: string,
  ): Promise<Availability[]> {
    // TODO: Should come from authenticated user
    const userId = parseInt(authorization);
    return this.availabilityService.findAllAvailability(userId);
  }

  @Get(':userId')
  getUserAvailability(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Availability[]> {
    return this.availabilityService.findAllAvailability(userId);
  }

  @Delete(':id')
  deleteAvailability(
    @Param('id', ParseIntPipe) id: number,
    @Headers('authorization') authorization: string,
  ): Promise<Availability> {
    // TODO: Should come from authenticated user
    const userId = parseInt(authorization);
    return this.availabilityService.deleteAvailability(userId, id);
  }
}
