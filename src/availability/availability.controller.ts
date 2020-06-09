import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { Availability } from './entities';
import { AvailabilityService } from './availability.service';
import { AddAvailabilityDto } from './dto';
// TODO: Delete the auth.mock file
import { user } from '../auth.mock';

@Controller('api/v1/availability')
export class AvailabilityController {
  constructor(private availabilityService: AvailabilityService) {}

  @Post()
  addAvailability(
    @Body() availability: AddAvailabilityDto,
  ): Promise<Availability> {
    // TODO: Only a teacher can add a time they are available
    // TODO: user should come from auth
    return this.availabilityService.createAvailability(user.id, availability);
  }

  @Get()
  getMyAvailability(): Promise<Availability[]> {
    // TODO: Only a teacher can check their availability
    // TODO: user should come from auth
    return this.availabilityService.findAllAvailability(user.id);
  }

  @Get(':userId')
  getUserAvailability(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Availability[]> {
    return this.availabilityService.findAllAvailability(userId);
  }

  // TODO: Add update availability route, only a teacher can update their own availability

  @Delete(':id')
  deleteAvailability(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Availability> {
    // TODO: user should come from auth
    return this.availabilityService.deleteAvailability(user.id, id);
  }
}
