import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards';
import { ReqUser } from './decorators';
import { User } from './entities';
import { RoleName } from '../role/entities';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto';

@Controller('api/v1/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  createUser(@Body() user: CreateUserDto): Promise<User> {
    return this.userService.create(user);
  }

  @Get()
  getAllUsers(@Query('role') role: RoleName): Promise<User[]> {
    return this.userService.findAll(role);
  }

  @UseGuards(JwtAuthGuard)
  @Get('self')
  getSelf(@ReqUser() user: User): Promise<User> {
    return this.userService.findOne(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('self')
  updateSelf(
    @ReqUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(user.id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('self')
  deleteSelf(@ReqUser() user: User): Promise<User> {
    return this.userService.delete(user.id);
  }
}
