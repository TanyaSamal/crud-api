import { IncomingMessage, ServerResponse } from 'http';
import { getBodyData } from '../utils';
import { CONTENT_TYPE, ERRORS } from '../constants/api.model';
import * as User from '../models/user';

export const getUsers = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const users = await User.findAllUsers();
    res.writeHead(200, CONTENT_TYPE);
    res.end(JSON.stringify(users));
  } catch (error) {
    res.writeHead(500, CONTENT_TYPE);
    res.end(JSON.stringify({ message: ERRORS.BAD_REQUEST }));
  }
};

export const createUser = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const body = await getBodyData(req);
    const { username, age, hobbies } = JSON.parse(body);

    if (!username || !age || !hobbies) {
      res.writeHead(400, CONTENT_TYPE);
      res.end(JSON.stringify({ message: ERRORS.MISSING_FIELD }));
    } else {
      const user = { username, age, hobbies };
      const newUser = await User.create(user);

      res.writeHead(201, CONTENT_TYPE);
      res.end(JSON.stringify(newUser));
    }
  } catch (error) {
    res.writeHead(500, CONTENT_TYPE);
    res.end(JSON.stringify({ message: ERRORS.BAD_REQUEST }));
  }
};
