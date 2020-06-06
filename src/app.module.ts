import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { NoteModule } from './note/note.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, NoteModule],
})
export class AppModule {}
