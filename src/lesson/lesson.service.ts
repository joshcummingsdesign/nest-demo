import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { parseISO, isBefore } from 'date-fns';
import { Lesson } from './entities';
import { BookLessonDto } from './dto';
import { RoleName, ERole } from '../role/entities';
import { AvailabilityService } from '../availability/availability.service';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
    private availabilityService: AvailabilityService,
  ) {}

  async create(userId: number, bookLessonDto: BookLessonDto): Promise<Lesson> {
    const datetime = parseISO(bookLessonDto.datetime);

    if (isBefore(datetime, Date.now())) {
      throw new ConflictException('Lesson must be a time in the future');
    }

    const existingLesson = await this.lessonRepository.findOne({
      where: { studentId: userId, datetime: parseISO(bookLessonDto.datetime) },
    });

    if (existingLesson) {
      throw new ConflictException('A lesson at the given time already exists');
    }

    const teacherAvailability = await this.availabilityService.findByDatetime(
      bookLessonDto.teacherId,
      bookLessonDto.datetime,
    );

    if (!teacherAvailability || !teacherAvailability.available) {
      throw new ConflictException('Teacher is not available at this time');
    }

    await this.availabilityService.update(
      bookLessonDto.teacherId,
      bookLessonDto.datetime,
      false,
    );

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
    const lesson = await this.findOne(userId, id);

    await this.availabilityService.update(
      lesson.teacherId,
      lesson.datetime,
      true,
    );

    await this.lessonRepository.delete(id);
    return lesson;
  }
}
