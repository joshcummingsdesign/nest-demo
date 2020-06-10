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
import { Lesson } from './entities';
import { LessonService } from './lesson.service';
import { BookLessonDto } from './dto';
import { JwtAuthGuard } from '../auth/guards';
import { ReqUser } from '../user/decorators';
import { User } from '../user/entities';

@Controller('api/v1/lessons')
export class LessonController {
  constructor(private lessonService: LessonService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  bookLesson(
    @ReqUser() user: User,
    @Body() lesson: BookLessonDto,
  ): Promise<Lesson> {
    // TODO: Only a student can book a lesson
    return this.lessonService.create(user.id, lesson);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllLessons(@ReqUser() user: User): Promise<Lesson[]> {
    return this.lessonService.findAll(user.id, user.role);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteLesson(
    @ReqUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Lesson> {
    // TODO: Only a student can cancel a lesson
    return this.lessonService.delete(user.id, id);
  }
}
