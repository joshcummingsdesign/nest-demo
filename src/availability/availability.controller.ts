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
import { User } from '../user/entities';
import { ReqUser } from '../user/decorators';
import { JwtAuthGuard } from '../auth/guards';
import { RoleGuard } from '../role/guards';
import { Roles } from '../role/decorators';
import { ERole } from '../role/entities';
import { Availability } from './entities';
import { AddAvailabilityDto } from './dto';
import { AvailabilityService } from './availability.service';

@Controller('api/v1/availability')
export class AvailabilityController {
  constructor(private availabilityService: AvailabilityService) {}

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ERole.teacher)
  @Post()
  addAvailability(
    @ReqUser() user: User,
    @Body() availability: AddAvailabilityDto,
  ): Promise<Availability> {
    return this.availabilityService.create(user.id, availability);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ERole.teacher)
  @Get()
  getMyAvailability(@ReqUser() user: User): Promise<Availability[]> {
    return this.availabilityService.findAll(user.id);
  }

  @Get('user/:userId')
  getUserAvailability(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Availability[]> {
    return this.availabilityService.findAll(userId);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ERole.teacher)
  @Delete('self/:id')
  deleteAvailability(
    @ReqUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Availability> {
    return this.availabilityService.delete(user.id, id);
  }
}
