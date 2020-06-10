import { User } from '../user/entities';
import { Auth } from '../auth/entities';
import { CreateUserDto, UpdateUserDto } from '../user/dto';
import { auth } from './auth';

type ParitalUser = Omit<
  User,
  'auth' | 'availability' | 'lessonsToTake' | 'lessonsToTeach'
>;

export const user: ParitalUser = {
  id: 1,
  firstName: 'Josh',
  lastName: 'Cummings',
  email: 'joshcummingsdesign@gmail.com',
  instrument: 'Bass',
  role: 'student',
};

export const student = user;

export const teacher: ParitalUser = {
  id: 2,
  firstName: 'Victor',
  lastName: 'Wooten',
  email: 'victorwooten@gmail.com',
  instrument: 'Bass',
  role: 'teacher',
};

export const userFull: Omit<User, 'auth'> = {
  ...user,
  availability: [],
  lessonsToTake: [],
  lessonsToTeach: [],
};

export const userAuth: User = { ...userFull, auth: auth as Auth };

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
  role: 'student',
};
