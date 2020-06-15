import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './entities';
import { LessonService } from './lesson.service';
import { mockLessonRepository } from './__mocks__/lesson.repository';
import { student, lesson, lessons, bookLessonDto } from '../__fixtures__';
import { AvailabilityService } from '../availability/availability.service';
import { mockAvailabilityService } from '../availability/__mocks__/availability.service';

describe('LessonService', () => {
  let lessonService: LessonService;
  let lessonRepository: Repository<Lesson>;
  let availabilityService: AvailabilityService;
  let realDateNow: () => number;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LessonService,
        {
          provide: getRepositoryToken(Lesson),
          useFactory: mockLessonRepository,
        },
        {
          provide: AvailabilityService,
          useFactory: mockAvailabilityService,
        },
      ],
    }).compile();

    lessonService = module.get<LessonService>(LessonService);
    lessonRepository = module.get<Repository<Lesson>>(
      getRepositoryToken(Lesson),
    );
    availabilityService = module.get<AvailabilityService>(AvailabilityService);
  });

  beforeAll(() => {
    realDateNow = Date.now.bind(global.Date);
    const dateNowStub = jest.fn(() => 1592164576240);
    global.Date.now = dateNowStub;
  });

  afterAll(() => {
    global.Date.now = realDateNow;
  });

  describe('create', () => {
    it('should create a lesson', async () => {
      jest.spyOn(lessonRepository, 'findOne').mockResolvedValue(undefined);
      jest.spyOn(lessonRepository, 'save');

      expect(await lessonService.create(student.id, bookLessonDto)).toBe(
        lesson,
      );
      expect(lessonRepository.findOne).toHaveBeenCalledTimes(1);
      expect(lessonRepository.save).toHaveBeenCalledTimes(1);
      expect(availabilityService.findByDatetime).toHaveBeenCalledTimes(1);
      expect(availabilityService.update).toHaveBeenCalledWith(
        bookLessonDto.teacherId,
        bookLessonDto.datetime,
        false,
      );
    });

    it('should not allow availability in the past', () => {
      jest.spyOn(lessonRepository, 'findOne').mockResolvedValue(undefined);

      expect(
        lessonService.create(student.id, {
          ...bookLessonDto,
          datetime: '2019-06-11T10:00:00Z',
        }),
      ).rejects.toThrow('Lesson must be a time in the future');
    });

    it('should throw if lesson exists', () => {
      expect(lessonService.create(student.id, bookLessonDto)).rejects.toThrow(
        'A lesson at the given time already exists',
      );
    });

    it('should throw if teacher is not available', () => {
      jest.spyOn(lessonRepository, 'findOne').mockResolvedValue(undefined);
      jest
        .spyOn(availabilityService, 'findByDatetime')
        .mockResolvedValue(undefined);

      expect(lessonService.create(student.id, bookLessonDto)).rejects.toThrow(
        'Teacher is not available at this time',
      );
    });
  });

  describe('findAll', () => {
    it('should find all lessons', async () => {
      expect(await lessonService.findAll(student.id, student.role.name)).toBe(
        lessons,
      );
      expect(lessonRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should find a lesson by id', async () => {
      expect(await lessonService.findOne(student.id, lesson.id)).toBe(lesson);
      expect(lessonRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should throw if lesson not found', () => {
      jest.spyOn(lessonRepository, 'findOne').mockResolvedValue(undefined);

      expect(lessonService.findOne(student.id, lesson.id)).rejects.toThrow(
        'Lesson not found',
      );
    });
  });

  describe('findByDatetime', () => {
    it('should find a lesson by datetime', async () => {
      expect(
        await lessonService.findByDatetime(student.id, lesson.datetime),
      ).toBe(lesson);
      expect(lessonRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete', () => {
    it('should delete a lesson', async () => {
      jest.spyOn(lessonService, 'findOne');

      expect(await lessonService.delete(student.id, lesson.id)).toBe(lesson);
      expect(lessonService.findOne).toHaveBeenCalledTimes(1);
      expect(lessonRepository.delete).toHaveBeenCalledTimes(1);
      expect(availabilityService.update).toHaveBeenCalledWith(
        lesson.teacherId,
        lesson.datetime,
        true,
      );
    });
  });
});
