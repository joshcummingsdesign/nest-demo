import { User } from '../user/entities';
import { Auth } from '../auth/entities';
import { CreateUserDto, UpdateUserDto } from '../user/dto';
import { auth } from './auth';

export const user: Omit<User, 'auth'> = {
  id: 1,
  firstName: 'Josh',
  lastName: 'Cummings',
  email: 'joshcummingsdesign@gmail.com',
  instrument: 'Bass',
  role: 'student',
  availability: [],
  lessonsToTake: [],
  lessonsToTeach: [],
};

export const userAuth: User = { ...user, auth: auth as Auth };

export const users: Omit<User, 'auth'>[] = [user];

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
