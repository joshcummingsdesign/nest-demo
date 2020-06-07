import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from 'src/user/entities';

@Entity()
export class Auth {
  @PrimaryColumn()
  userId: number;

  @Column()
  password: string;

  @OneToOne(() => User, (user) => user.auth)
  @JoinColumn({ name: 'userId' })
  user: User;
}
