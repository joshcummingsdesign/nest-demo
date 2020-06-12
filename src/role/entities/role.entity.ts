import { Entity, OneToMany, Column, PrimaryGeneratedColumn } from 'typeorm';
import { getEnumKeys } from '../../utils/types-utils';
import { User } from '../../user/entities';

export enum ERole {
  student = 'student',
  teacher = 'teacher',
}
export const roles = getEnumKeys(ERole);
export type RoleName = keyof typeof ERole;

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 7 })
  name: RoleName;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
