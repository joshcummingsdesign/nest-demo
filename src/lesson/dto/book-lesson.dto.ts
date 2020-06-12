import { IsNumber, IsISO8601 } from 'class-validator';

export class BookLessonDto {
  @IsNumber()
  teacherId: number;

  @IsISO8601()
  datetime: string;
}
