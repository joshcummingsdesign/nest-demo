import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Note, SharedNote } from 'src/note/entities';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @OneToMany(() => Note, (note) => note.owner)
  notes: Note[];

  @OneToMany(() => SharedNote, (sharedNote) => sharedNote.target)
  notesSharedWithYou: Note[];

  @OneToMany(() => SharedNote, (sharedNote) => sharedNote.sender)
  notesYouShared: Note[];
}
