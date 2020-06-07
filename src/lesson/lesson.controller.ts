import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  ParseIntPipe,
  Delete,
  Query,
  Headers,
} from '@nestjs/common';
import { Lesson } from './entities';
import { LessonService } from './lesson.service';
import { BookLessonDto } from './dto';

@Controller('api/v1/lessons')
export class LessonController {
  constructor(private lessonService: LessonService) {}

  @Post()
  bookLesson(
    @Body() lesson: BookLessonDto,
    @Headers('authorization') authorization: string,
  ): Promise<Lesson> {
    // TODO: Should come from authenticated user
    const userId = parseInt(authorization);
    return this.lessonService.createLesson(userId, lesson);
  }

  @Get()
  getAllLessons(
    @Headers('authorization') authorization: string,
  ): Promise<Lesson[]> {
    // TODO: Should come from authenticated user
    const userId = parseInt(authorization);
    const role = 'student';
    return this.lessonService.findAllLessons(userId, role);
  }

  @Get(':id')
  getLesson(
    @Param('id', ParseIntPipe) id: number,
    @Headers('authorization') authorization: string,
  ): Promise<Lesson> {
    // TODO: Should come from authenticated user
    const userId = parseInt(authorization);
    return this.lessonService.findOneLesson(userId, id);
  }

  @Delete(':id')
  deleteLesson(
    @Param('id', ParseIntPipe) id: number,
    @Headers('authorization') authorization: string,
  ): Promise<Lesson> {
    // TODO: Should come from authenticated user
    const userId = parseInt(authorization);
    return this.lessonService.deleteLesson(userId, id);
  }
}
