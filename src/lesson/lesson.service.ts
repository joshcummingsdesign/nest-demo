import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './entities';
import { BookLessonDto } from './dto';
import { RoleName, ERole } from '../role/entities';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
  ) {}

  async create(userId: number, bookLessonDto: BookLessonDto): Promise<Lesson> {
    // TODO: Make sure the teacher is available at this time
    // TODO: Update availability at this time to false
    const existingLesson = await this.lessonRepository.findOne({
      datetime: bookLessonDto.datetime,
    });

    if (existingLesson) {
      throw new ConflictException('A lesson at the given time already exists');
    }

    return this.lessonRepository.save({ ...bookLessonDto, studentId: userId });
  }

  findAll(userId: number, role: RoleName): Promise<Lesson[]> {
    const query =
      role === ERole.teacher ? { teacherId: userId } : { studentId: userId };
    return this.lessonRepository.find({ ...query, order: { datetime: 'ASC' } });
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

  async findByDatetime(userId: number, datetime: string): Promise<Lesson> {
    return this.lessonRepository.findOne({
      where: [
        { studentId: userId, datetime },
        { teacherId: userId, datetime },
      ],
    });
  }

  async delete(userId: number, id: number): Promise<Lesson> {
    // TODO: Update the teacher's availability when cancelling
    const lesson = await this.findOne(userId, id);
    await this.lessonRepository.delete(id);
    return lesson;
  }
}
