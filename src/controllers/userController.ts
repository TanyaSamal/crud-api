import { IncomingMessage, ServerResponse } from 'http';
import { getBodyData, validateBody } from '../utils';
import { CONTENT_TYPE, ERRORS } from '../constants/api.model';
import * as User from '../models/user';

export const getUsers = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const users = await User.getAllUsers();

    res.writeHead(200, CONTENT_TYPE);
    res.end(JSON.stringify(users));
  } catch (error) {
    res.writeHead(500, CONTENT_TYPE);
    res.end(JSON.stringify({ message: ERRORS.BAD_REQUEST }));
  }
};

export const create = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const body = await getBodyData(req);
    const { username, age, hobbies } = JSON.parse(body);

    if (!username || !age || !hobbies) {
      res.writeHead(400, CONTENT_TYPE);
      res.end(JSON.stringify({ message: ERRORS.MISSING_FIELD }));
    } else {
      const user = { username, age, hobbies };

      if (!validateBody(user)) {
        res.writeHead(400, CONTENT_TYPE);
        res.end(JSON.stringify({ message: ERRORS.INVALID_FIELD }));
      } else {
        const newUser = await User.createUser(user);

        res.writeHead(201, CONTENT_TYPE);
        res.end(JSON.stringify(newUser));
      }
    }
  } catch (error) {
    res.writeHead(500, CONTENT_TYPE);
    res.end(JSON.stringify({ message: ERRORS.BAD_REQUEST }));
  }
};

export const getById = async (req: IncomingMessage, res: ServerResponse, id: string) => {
  try {
    const condidate = await User.getUserById(id);

    res.writeHead(200, CONTENT_TYPE);
    res.end(JSON.stringify(condidate));
  } catch (error) {
    res.writeHead(404, CONTENT_TYPE);
    res.end(JSON.stringify({ message: ERRORS.USER_NOT_FOUND }));
  }
};

export const update = async (req: IncomingMessage, res: ServerResponse, id: string) => {
  try {
    const body = await getBodyData(req);
    const { username, age, hobbies } = JSON.parse(body);

    if (!username || !age || !hobbies) {
      res.writeHead(400, CONTENT_TYPE);
      res.end(JSON.stringify({ message: ERRORS.MISSING_FIELD }));
    } else {
      const condidate = { username, age, hobbies };

      if (!validateBody(condidate)) {
        res.writeHead(400, CONTENT_TYPE);
        res.end(JSON.stringify({ message: ERRORS.INVALID_FIELD }));
      } else {
        const updatedUser = await User.updateUser(condidate, id);

        res.writeHead(200, CONTENT_TYPE);
        res.end(JSON.stringify(updatedUser));
      }
    }
  } catch (error) {
    res.writeHead(404, CONTENT_TYPE);
    res.end(JSON.stringify({ message: ERRORS.USER_NOT_FOUND }));
  }
};

export const remove = async (req: IncomingMessage, res: ServerResponse, id: string) => {
  try {
    await User.deleteUser(id);
    res.writeHead(204, CONTENT_TYPE);
    res.end();
  } catch (error) {
    res.writeHead(404, CONTENT_TYPE);
    res.end(JSON.stringify({ message: ERRORS.USER_NOT_FOUND }));
  }
};
