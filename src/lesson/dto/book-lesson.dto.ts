import { IsString, IsNumber } from 'class-validator';

export class BookLessonDto {
  @IsNumber()
  teacherId: number;

  @IsString()
  date: string;

  @IsString()
  time: string;
}
