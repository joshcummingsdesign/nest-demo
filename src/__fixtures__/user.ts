import { User } from '../user/entities';
import { CreateUserDto, UpdateUserDto } from '../user/dto';
import { auth } from './auth';
import { studentRole, teacherRole } from './role';
import { instrument } from './instrument';
import { Role } from '../role/entities';
import { Instrument } from '../instrument/entities';

export const student: Partial<User> = {
  id: 998,
  firstName: 'Josh',
  lastName: 'Cummings',
  email: 'joshcummingsdesign@gmail.com',
  roleId: 998,
  instrumentId: 996,
  role: studentRole as Role,
  instrument: instrument as Instrument,
};

export const teacher: Partial<User> = {
  id: 999,
  firstName: 'Kurt',
  lastName: 'Rosenwinkel',
  email: 'kurtrosenwinkel@gmail.com',
  roleId: 999,
  instrumentId: 996,
  role: teacherRole as Role,
  instrument: instrument as Instrument,
};

export const studentAuth = { ...student, auth } as User;

export const teacherAuth = {
  ...teacher,
  auth: { ...auth, userId: teacher.id },
} as User;

export const users: Partial<User>[] = [student, teacher];

export const students: Partial<User>[] = [student];

export const teachers: Partial<User>[] = [teacher];

export const createUserDto: CreateUserDto = {
  firstName: 'Josh',
  lastName: 'Cummings',
  email: 'joshcummingsdesign@gmail.com',
  password: 'Changeme1!',
  instrument: 'guitar',
  role: 'student',
};

export const updateUserDto: UpdateUserDto = {
  firstName: 'Josh',
  lastName: 'Cummings',
  instrument: 'guitar',
};

export const createNewUser: CreateUserDto = {
  firstName: 'Victor',
  lastName: 'Wooten',
  email: 'victorwooten@gmail.com',
  password: 'Changeme1!',
  instrument: 'bass',
  role: 'teacher',
};

export const updateNewUser: UpdateUserDto = {
  firstName: 'Victor',
  lastName: 'Wooten',
  instrument: 'bass',
};
