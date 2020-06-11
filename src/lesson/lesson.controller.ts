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
import { JwtAuthGuard, RolesGuard } from '../auth/guards';
import { Roles } from '../auth/decorators';
import { ReqUser } from '../user/decorators';
import { User, ERole } from '../user/entities';
import { Lesson } from './entities';
import { LessonService } from './lesson.service';
import { BookLessonDto } from './dto';

@Controller('api/v1/lessons')
export class LessonController {
  constructor(private lessonService: LessonService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.student)
  @Post()
  bookLesson(
    @ReqUser() user: User,
    @Body() lesson: BookLessonDto,
  ): Promise<Lesson> {
    return this.lessonService.create(user.id, lesson);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllLessons(@ReqUser() user: User): Promise<Lesson[]> {
    return this.lessonService.findAll(user.id, user.role);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.student)
  @Delete(':id')
  deleteLesson(
    @ReqUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Lesson> {
    return this.lessonService.delete(user.id, id);
  }
}
