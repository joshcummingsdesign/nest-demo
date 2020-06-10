import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  ParseIntPipe,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards';
import { ReqUser } from '../user/decorators';
import { User } from '../user/entities';
import { Availability } from './entities';
import { AvailabilityService } from './availability.service';
import { AddAvailabilityDto } from './dto';

@Controller('api/v1/availability')
export class AvailabilityController {
  constructor(private availabilityService: AvailabilityService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  addAvailability(
    @ReqUser() user: User,
    @Body() availability: AddAvailabilityDto,
  ): Promise<Availability> {
    // TODO: Only a teacher can add a time they are available
    return this.availabilityService.create(user.id, availability);
  }

  @UseGuards(JwtAuthGuard)
  @Get('self')
  getMyAvailability(@ReqUser() user: User): Promise<Availability[]> {
    // TODO: Only a teacher can check their availability
    return this.availabilityService.findAll(user.id);
  }

  @Get('user/:userId')
  getUserAvailability(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Availability[]> {
    return this.availabilityService.findAll(userId);
  }

  // TODO: Add update availability route, only a teacher can update their own availability

  @UseGuards(JwtAuthGuard)
  @Delete('self/:id')
  deleteAvailability(
    @ReqUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Availability> {
    return this.availabilityService.delete(user.id, id);
  }
}
