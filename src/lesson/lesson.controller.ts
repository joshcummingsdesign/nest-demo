import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { Lesson } from './entities';
import { LessonService } from './lesson.service';
import { BookLessonDto } from './dto';
import { user } from '../auth.mock';

@Controller('api/v1/lessons')
export class LessonController {
  constructor(private lessonService: LessonService) {}

  @Post()
  bookLesson(@Body() lesson: BookLessonDto): Promise<Lesson> {
    // TODO: Only a student can book a lesson
    // TODO: user should come from auth
    return this.lessonService.createLesson(user.id, lesson);
  }

  @Get()
  getAllLessons(): Promise<Lesson[]> {
    // TODO: user should come from auth
    return this.lessonService.findAllLessons(user.id, user.role);
  }

  @Delete(':id')
  deleteLesson(@Param('id', ParseIntPipe) id: number): Promise<Lesson> {
    // TODO: Only a student can cancel a lesson
    // TODO: user should come from auth
    return this.lessonService.deleteLesson(user.id, id);
  }
}
