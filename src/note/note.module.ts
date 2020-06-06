import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { Note, SharedNote } from './entities';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Note]),
    TypeOrmModule.forFeature([SharedNote]),
    UserModule,
  ],
  controllers: [NoteController],
  providers: [NoteService],
})
export class NoteModule {}
