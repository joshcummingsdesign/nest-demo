import { Entity, OneToMany, PrimaryGeneratedColumn, Column } from 'typeorm';
import { getEnumKeys } from '../../utils/types-utils';
import { User } from '../../user/entities';

export enum EInstrument {
  guitar = 'guitar',
  piano = 'piano',
  bass = 'bass',
  drums = 'drums',
}
export const instruments = getEnumKeys(EInstrument);
export type InstrumentName = keyof typeof EInstrument;

@Entity()
export class Instrument {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  name: InstrumentName;

  @OneToMany(() => User, (user) => user.instrument)
  users: User[];
}
