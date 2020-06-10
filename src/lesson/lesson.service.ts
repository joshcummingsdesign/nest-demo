import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './entities';
import { BookLessonDto } from './dto';
import { Role } from '../user/entities';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
  ) {}

  create(userId: number, lesson: BookLessonDto): Promise<Lesson> {
    // TODO: Make sure the teacher is available at this time
    // TODO: Update availability at this time to false
    return this.lessonRepository.save({ ...lesson, studentId: userId });
  }

  findAll(userId: number, role: Role): Promise<Lesson[]> {
    return this.lessonRepository.find({
      where: role === 'teacher' ? { teacherId: userId } : { studentId: userId },
    });
  }

  async findOne(userId: number, id: number): Promise<Lesson> {
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

  async delete(userId: number, id: number): Promise<Lesson> {
    // TODO: Update the teacher's availability when cancelling
    const lesson = await this.findOne(userId, id);
    await this.lessonRepository.delete(id);
    return lesson;
  }
}
