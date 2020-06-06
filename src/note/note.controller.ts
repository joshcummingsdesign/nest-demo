import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { Note } from './entities';
import { CreateNoteDto, ShareNoteDto } from './dto';
import { NoteService } from './note.service';

@Controller('api/v1/notes')
export class NoteController {
  constructor(private noteService: NoteService) {}

  @Post()
  createNote(@Body() note: CreateNoteDto): Promise<Note> {
    return this.noteService.save(note);
  }

  @Post('share')
  async shareNote(@Body() note: ShareNoteDto): Promise<{ message: string }> {
    await this.noteService.share(note);
    return { message: `A note with the id of ${note.noteId} has been shared.` };
  }

  @Get()
  getAllNotes(): Promise<Note[]> {
    return this.noteService.find();
  }

  @Get(':id')
  getNote(@Param('id', ParseIntPipe) id: number): Promise<Note> {
    return this.noteService.findOne(id);
  }

  @Get('user/:userId')
  getUserNotes(@Param('userId', ParseIntPipe) userId: number): Promise<Note[]> {
    return this.noteService.findByUser(userId);
  }

  @Get('user/:userId/shared')
  getSharedNotes(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Note[]> {
    return this.noteService.findSharedWith(userId);
  }

  @Get('user/:userId/sent')
  getAllUserNotes(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Note[]> {
    return this.noteService.findSharedBy(userId);
  }

  @Delete(':id')
  deleteNote(@Param('id', ParseIntPipe) id: number): Promise<Note> {
    return this.noteService.delete(id);
  }
}
