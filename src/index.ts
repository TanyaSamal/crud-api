import http from 'http';
import dotenv from 'dotenv';
import * as UserController from './controllers/userController';
import {
  USERS_URL, METHOD, CONTENT_TYPE, ERRORS,
} from './constants/api.model';

dotenv.config();

const server = http.createServer((req, res) => {
  if (req.url === USERS_URL && req.method === METHOD.GET) {
    UserController.getUsers(req, res);
  } else if (req.url === USERS_URL && req.method === METHOD.POST) {
    UserController.createUser(req, res);
  } else {
    res.writeHead(404, CONTENT_TYPE);
    res.end(JSON.stringify({ message: ERRORS.URL_NOT_FOUND }));
  }
});

const { PORT } = process.env;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
