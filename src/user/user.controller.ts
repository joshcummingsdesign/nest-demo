import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';

@Controller('api/v1/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  createUser(@Body() user: CreateUserDto): Promise<User> {
    return this.userService.save(user);
  }

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.userService.find();
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.delete(id);
  }
}
