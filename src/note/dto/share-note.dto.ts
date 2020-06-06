import { IsNumber } from 'class-validator';

export class ShareNoteDto {
  @IsNumber()
  senderId: number;

  @IsNumber()
  targetId: number;

  @IsNumber()
  noteId: number;
}
