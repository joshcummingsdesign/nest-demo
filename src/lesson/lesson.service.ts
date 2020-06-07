import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './entities';
import { BookLessonDto } from './dto';
import { UserType } from 'src/user/entities';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
  ) {}

  createLesson(userId: number, lesson: BookLessonDto): Promise<Lesson> {
    return this.lessonRepository.save({ ...lesson, studentId: userId });
  }

  findAllLessons(userId: number, type?: UserType): Promise<Lesson[]> {
    return this.lessonRepository.find({
      where: type === 'teacher' ? { teacherId: userId } : { studentId: userId },
    });
  }

  async findOneLesson(userId: number, id: number): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOne({
      where: [
        { id, studentId: userId },
        { id, teacherId: userId },
      ],
    });
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }
    return lesson;
  }

  async deleteLesson(userId: number, id: number): Promise<Lesson> {
    const lesson = await this.findOneLesson(userId, id);
    await this.lessonRepository.delete(id);
    return lesson;
  }
}
