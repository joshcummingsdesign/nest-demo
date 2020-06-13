import { IsNumber, IsDateString } from 'class-validator';

export class BookLessonDto {
  @IsNumber()
  teacherId: number;

  @IsDateString()
  datetime: string;
}
