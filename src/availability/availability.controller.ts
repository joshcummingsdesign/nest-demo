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
import { ReqUser } from '../user/decorators';
import { JwtAuthGuard, RolesGuard } from '../auth/guards';
import { Roles } from '../auth/decorators';
import { User, ERole } from '../user/entities';
import { Availability } from './entities';
import { AvailabilityService } from './availability.service';
import { AddAvailabilityDto } from './dto';

@Controller('api/v1/availability')
export class AvailabilityController {
  constructor(private availabilityService: AvailabilityService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.teacher)
  @Post()
  addAvailability(
    @ReqUser() user: User,
    @Body() availability: AddAvailabilityDto,
  ): Promise<Availability> {
    return this.availabilityService.create(user.id, availability);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.teacher)
  @Get('self')
  getMyAvailability(@ReqUser() user: User): Promise<Availability[]> {
    return this.availabilityService.findAll(user.id);
  }

  @Get('user/:userId')
  getUserAvailability(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Availability[]> {
    return this.availabilityService.findAll(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('self/:id')
  deleteAvailability(
    @ReqUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Availability> {
    return this.availabilityService.delete(user.id, id);
  }
}
