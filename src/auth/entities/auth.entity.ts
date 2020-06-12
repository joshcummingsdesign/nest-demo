import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/entities';

@Entity()
export class Auth {
  @PrimaryColumn()
  userId: number;
  @OneToOne(() => User, (user) => user.auth, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ length: 64 })
  password: string;
}
