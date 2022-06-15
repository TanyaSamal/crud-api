import http from 'http';
import { config } from 'dotenv';
import * as UserController from './controllers/userController';
import {
  USERS_URL, METHOD, CONTENT_TYPE, ERRORS,
} from './constants/api.model';
import { validateUuid } from './utils';

config();

const server = http.createServer((req, res) => {
  const userId = req.url.split('/')[3];

  if (req.url === USERS_URL) {
    switch (req.method) {
      case METHOD.GET:
        UserController.getUsers(req, res);
        break;
      case METHOD.POST:
        UserController.create(req, res);
        break;
      default:
        break;
    }
  } else if (userId) {
    if (validateUuid(userId)) {
      switch (req.method) {
        case METHOD.GET:
          UserController.getById(req, res, userId);
          break;
        case METHOD.PUT:
          UserController.update(req, res, userId);
          break;
        case METHOD.DELETE:
          UserController.remove(req, res, userId);
          break;
        default:
          break;
      }
    } else {
      res.writeHead(400, CONTENT_TYPE);
      res.end(JSON.stringify({ message: ERRORS.INVALID_ID }));
    }
  } else {
    res.writeHead(404, CONTENT_TYPE);
    res.end(JSON.stringify({ message: ERRORS.URL_NOT_FOUND }));
  }
});

const { PORT } = process.env;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
