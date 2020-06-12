import { User } from '../user/entities';
import { Auth } from '../auth/entities';
import { CreateUserDto, UpdateUserDto } from '../user/dto';
import { auth } from './auth';
import { studentRole, teacherRole } from './role';
import { instrument } from './instrument';

export const student: User = {
  id: 998,
  firstName: 'Josh',
  lastName: 'Cummings',
  email: 'joshcummingsdesign@gmail.com',
  role: studentRole,
  instrument,
} as User;

export const teacher: User = {
  id: 999,
  firstName: 'Victor',
  lastName: 'Wooten',
  email: 'victorwooten@gmail.com',
  role: teacherRole,
  instrument,
} as User;

export const studentFull: User = {
  ...student,
  availability: [],
  lessonsToTake: [],
  lessonsToTeach: [],
};

export const studentAuth: User = { ...studentFull, auth: auth as Auth };

export const users: User[] = [student, teacher];

export const students: User[] = [student];

export const teachers: User[] = [teacher];

export const createUserDto: CreateUserDto = {
  firstName: 'Josh',
  lastName: 'Cummings',
  email: 'joshcummingsdesign@gmail.com',
  password: 'Changeme!',
  instrument: 'guitar',
  role: 'student',
};

export const updateUserDto: UpdateUserDto = {
  firstName: 'Josh',
  lastName: 'Cummings',
  email: 'joshcummingsdesign@gmail.com',
  instrument: 'guitar',
};
