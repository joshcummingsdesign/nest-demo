import { User } from '../user/entities';
import { Auth } from '../auth/entities';
import { CreateUserDto, UpdateUserDto } from '../user/dto';
import { auth } from './auth';

type ParitalUser = Omit<
  User,
  'auth' | 'availability' | 'lessonsToTake' | 'lessonsToTeach'
>;

export const student: ParitalUser = {
  id: 998,
  firstName: 'Josh',
  lastName: 'Cummings',
  email: 'joshcummingsdesign@gmail.com',
  instrument: 'Bass',
  role: 'student',
};

export const teacher: ParitalUser = {
  id: 999,
  firstName: 'Victor',
  lastName: 'Wooten',
  email: 'victorwooten@gmail.com',
  instrument: 'Bass',
  role: 'teacher',
};

export const studentFull: Omit<User, 'auth'> = {
  ...student,
  availability: [],
  lessonsToTake: [],
  lessonsToTeach: [],
};

export const studentAuth: User = { ...studentFull, auth: auth as Auth };

export const users: ParitalUser[] = [student, teacher];

export const students: ParitalUser[] = [student];

export const teachers: ParitalUser[] = [teacher];

export const createUserDto: CreateUserDto = {
  firstName: 'Josh',
  lastName: 'Cummings',
  email: 'joshcummingsdesign@gmail.com',
  password: 'Changeme!',
  instrument: 'Bass',
  role: 'student',
};

export const updateUserDto: UpdateUserDto = {
  firstName: 'Josh',
  lastName: 'Cummings',
  email: 'joshcummingsdesign@gmail.com',
  instrument: 'Bass',
};
