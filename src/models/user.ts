import { v4 as uuidv4 } from 'uuid';
import { users } from '../data/users';
import { IUser } from '../constants/user.model';

export const findAllUsers = (): Promise<IUser[]> => new Promise((resolve, reject) => {
  resolve(users);
});

export const create = (user: IUser): Promise<IUser> => new Promise((resolve, reject) => {
  const newUser: IUser = { id: uuidv4(), ...user };
  users.push(newUser);
  resolve(newUser);
});
