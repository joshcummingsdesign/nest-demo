import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note, SharedNote } from './entities';
import { CreateNoteDto, ShareNoteDto } from './dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
    @InjectRepository(SharedNote)
    private sharedNoteRepository: Repository<SharedNote>,
    private userService: UserService,
  ) {}

  save(note: CreateNoteDto): Promise<Note> {
    return this.noteRepository.save(note);
  }

  async share(note: ShareNoteDto): Promise<SharedNote> {
    // Make sure the sender, target, and note all exist
    await this.userService.findOne(note.senderId);
    await this.userService.findOne(note.targetId);
    await this.findOne(note.noteId);

    return this.sharedNoteRepository.save(note);
  }

  find(): Promise<Note[]> {
    return this.noteRepository.find();
  }

  async findOne(id: number): Promise<Note> {
    const note = await this.noteRepository.findOne(id);
    if (!note) {
      throw new NotFoundException(`A note with an id of ${id} does not exist.`);
    }
    return note;
  }

  async findByUser(userId: number): Promise<Note[]> {
    // Make sure user exists
    await this.userService.findOne(userId);

    return this.noteRepository.find({ ownerId: userId });
  }

  async findSharedWith(userId: number): Promise<Note[]> {
    // Make sure user exists
    await this.userService.findOne(userId);

    const res = await this.sharedNoteRepository.find({
      where: { targetId: userId },
      relations: ['note'],
    });

    return res.map((item) => item.note);
  }

  async findSharedBy(userId: number): Promise<Note[]> {
    // Make sure user exists
    await this.userService.findOne(userId);

    return this.noteRepository
      .createQueryBuilder('n')
      .leftJoin(SharedNote, 'sn', 'sn."noteId" = n.id')
      .where('sn."senderId" = :userId', { userId })
      .getMany();
  }

  async delete(id: number): Promise<Note> {
    // Make sure note exists
    const note = await this.findOne(id);

    await this.noteRepository.delete({ id });

    return note;
  }
}
