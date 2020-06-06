import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, Availability, Lesson, UserType } from './entities';
import {
  CreateUserDto,
  UpdateUserDto,
  AddAvailabilityDto,
  BookLessonDto,
} from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Availability)
    private availabilityRepository: Repository<Availability>,
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
  ) {}

  create(user: CreateUserDto): Promise<User> {
    return this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: number, userData: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    await this.userRepository.update(id, userData);
    return Object.assign({}, user, userData);
  }

  async delete(id: number): Promise<User> {
    const user = await this.findOne(id);
    await this.userRepository.delete(id);
    return user;
  }

  /*----------  Availability  ----------*/

  createAvailability(
    userId: number,
    availability: AddAvailabilityDto,
  ): Promise<Availability> {
    return this.availabilityRepository.save({ ...availability, userId });
  }

  findAllAvailability(userId: number): Promise<Availability[]> {
    return this.availabilityRepository.find({ where: { userId } });
  }

  async findOneAvailability(userId: number, id: number): Promise<Availability> {
    const availability = await this.availabilityRepository.findOne({
      where: { userId, id },
    });
    if (!availability) {
      throw new NotFoundException('Availability not found');
    }
    return availability;
  }

  async deleteAvailability(userId: number, id: number): Promise<Availability> {
    const availability = await this.findOneAvailability(userId, id);
    await this.availabilityRepository.delete(id);
    return availability;
  }

  /*----------  Lesson  ----------*/

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
