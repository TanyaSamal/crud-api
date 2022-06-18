import { v4 as uuidv4 } from 'uuid';
import { users } from '../data/users';
import { IUser } from '../constants/user.model';

export const getAllUsers = (): Promise<IUser[]> => new Promise((resolve, reject) => {
  resolve(users);
});

export const createUser = (user: IUser): Promise<IUser> => new Promise((resolve, reject) => {
  const newUser: IUser = { id: uuidv4(), ...user };
  users.push(newUser);
  resolve(newUser);
});

export const getUserById = (id: string): Promise<IUser> => new Promise((resolve, reject) => {
  const condidate: IUser = users.find((user) => user.id === id);

  if (condidate) {
    resolve(condidate);
  } else {
    reject();
  }
});

export const updateUser = (updatedUser: IUser, id: string)
  : Promise<IUser> => new Promise((resolve, reject) => {
  const condidateIndex = users.findIndex((user) => user.id === id);

  if (condidateIndex !== -1) {
    users[condidateIndex] = { id, ...updatedUser };
    resolve(users[condidateIndex]);
  } else {
    reject();
  }
});

export const deleteUser = (id: string): Promise<void> => new Promise((resolve, reject) => {
  const condidateIndex = users.findIndex((user) => user.id === id);

  if (condidateIndex !== -1) {
    users.splice(condidateIndex, 1);
    resolve();
  } else {
    reject();
  }
});
