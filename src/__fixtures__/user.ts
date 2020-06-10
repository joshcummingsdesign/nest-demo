import { auth } from './auth';

export const user: any = {
  id: 1,
  firstName: 'Josh',
  lastName: 'Cummings',
  email: 'joshcummingsdesign@gmail.com',
  instrument: 'Bass',
  role: 'student',
};

export const userAuth: any = { ...user, auth };

export const users: any[] = [user];

export const createUserDto: any = {
  firstName: 'Josh',
  lastName: 'Cummings',
  email: 'joshcummingsdesign@gmail.com',
  password: 'Changeme!',
  instrument: 'Bass',
  role: 'student',
};

export const updateUserDto: any = {
  firstName: 'Josh',
  lastName: 'Cummings',
  email: 'joshcummingsdesign@gmail.com',
  instrument: 'Bass',
  role: 'student',
};
