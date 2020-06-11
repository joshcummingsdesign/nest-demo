import { IsString, IsNumber } from 'class-validator';

export class BookLessonDto {
  @IsNumber()
  teacherId: number;

  // TODO: Require date strings
  @IsString()
  date: string;

  // TODO: Require date strings
  @IsString()
  time: string;
}
