import { IJwtPayload } from '../auth/interfaces';
import { Auth } from '../auth/entities';

export const auth: Omit<Auth, 'user'> = {
  userId: 1,
  password: 'Changeme!',
};

export const jwtPayload: IJwtPayload = {
  access_token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Impvc2hjdW1taW5nc2Rlc2lnbkBnbWFpbC5jb20iLCJzdWIiOjEsImlhdCI6MTU5MTc0ODUyMywiZXhwIjoxNTkxNzQ4NTMzfQ.jgWsQFZOdYX0e3oPzAByc3uwDPhYNtfNsk1a8Akp5uE',
};
