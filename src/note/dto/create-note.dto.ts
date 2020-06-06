import { IsString, IsNumber } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  text: string;

  @IsNumber()
  ownerId: number;
}
