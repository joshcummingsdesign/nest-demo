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
} from '@nestjs/common';
import { User, Availability, Lesson, UserType } from './entities';
import { UserService } from './user.service';
import {
  CreateUserDto,
  UpdateUserDto,
  AddAvailabilityDto,
  BookLessonDto,
} from './dto';

@Controller('api/v1/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  createUser(@Body() user: CreateUserDto): Promise<User> {
    return this.userService.create(user);
  }

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.delete(id);
  }

  /*----------  Availability  ----------*/

  @Post(':userId/availability')
  addAvailability(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() availability: AddAvailabilityDto,
  ): Promise<Availability> {
    return this.userService.createAvailability(userId, availability);
  }

  @Get(':userId/availability')
  getAllAvailaiblity(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Availability[]> {
    return this.userService.findAllAvailability(userId);
  }

  @Get(':userId/availability/:id')
  getAvailaiblity(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Availability> {
    return this.userService.findOneAvailability(userId, id);
  }

  @Delete(':userId/availability/:id')
  deleteAvailaiblity(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Availability> {
    return this.userService.deleteAvailability(userId, id);
  }

  /*----------  Lesson  ----------*/

  @Post(':userId/lessons')
  bookLesson(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() lesson: BookLessonDto,
  ): Promise<Lesson> {
    return this.userService.createLesson(userId, lesson);
  }

  @Get(':userId/lessons')
  getAllLessons(
    @Param('userId', ParseIntPipe) userId: number,
    @Query('type') type: UserType,
  ): Promise<Lesson[]> {
    return this.userService.findAllLessons(userId, type);
  }

  @Get(':userId/lessons/:id')
  getLesson(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Lesson> {
    return this.userService.findOneLesson(userId, id);
  }

  @Delete(':userId/lessons/:id')
  deleteLesson(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Lesson> {
    return this.userService.deleteLesson(userId, id);
  }
}
