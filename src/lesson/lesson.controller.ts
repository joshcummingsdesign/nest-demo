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
import { RoleGuard } from '../role/guards';
import { ERole } from '../role/entities';
import { Roles } from '../role/decorators';
import { ReqUser } from '../user/decorators';
import { User } from '../user/entities';
import { Lesson } from './entities';
import { LessonService } from './lesson.service';
import { BookLessonDto } from './dto';

@Controller('api/v1/lessons')
export class LessonController {
  constructor(private lessonService: LessonService) {}

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ERole.student)
  @Post()
  bookLesson(
    @ReqUser() user: User,
    @Body() lesson: BookLessonDto,
  ): Promise<Lesson> {
    return this.lessonService.create(user.id, lesson);
  }

  @UseGuards(JwtAuthGuard)
  @Get('self')
  getMyLessons(@ReqUser() user: User): Promise<Lesson[]> {
    return this.lessonService.findAll(user.id, user.role.name);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ERole.student)
  @Delete('self/:id')
  deleteLesson(
    @ReqUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Lesson> {
    return this.lessonService.delete(user.id, id);
  }
}
