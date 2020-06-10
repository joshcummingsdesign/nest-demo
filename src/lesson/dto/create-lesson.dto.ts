import { IsString, IsNumber } from 'class-validator';

export class CreateLessonDto {
  @IsNumber()
  teacherId: number;

  @IsString()
  date: string;

  @IsString()
  time: string;
}
