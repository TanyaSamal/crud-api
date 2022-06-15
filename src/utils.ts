import { IncomingMessage } from 'http';
import { validate, version } from 'uuid';
import { IUser } from './constants/user.model';

export const getBodyData = (req: IncomingMessage)
  : Promise<string> => new Promise((resolve, reject) => {
  try {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      resolve(body);
    });
  } catch (error) {
    reject(error);
  }
});

export const validateUuid = (uuid: string): boolean => validate(uuid) && version(uuid) === 4;

export const validateBody = (userBody: IUser): boolean => {
  const isNameString = (typeof userBody.username === 'string');
  const isAgeNumber = (typeof userBody.age === 'number');
  const isHobbyArray = Array.isArray(userBody.hobbies);

  let isHobbyElString = true;

  if (isHobbyArray) {
    userBody.hobbies.forEach((hobby) => {
      if (typeof hobby !== 'string') {
        isHobbyElString = false;
      }
    });
  }

  return isNameString && isAgeNumber && isHobbyArray && isHobbyElString;
};
