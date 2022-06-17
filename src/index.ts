import http, { createServer } from 'http';
import { config } from 'dotenv';
import { resolve } from 'path';
import { cwd } from 'process';
import * as UserController from './controllers/userController';
import {
  USERS_URL, METHOD, CONTENT_TYPE, ERRORS,
} from './constants/api.model';
import { validateUuid } from './utils';

config({ path: resolve(cwd(), '.env') });

export const startServer = () => {
  const server = http.createServer(async (req, res) => {
    try {
      const userId = req.url.split('/')[3];

      if (req.url === USERS_URL) {
        switch (req.method) {
          case METHOD.GET:
            await UserController.getUsers(req, res);
            break;
          case METHOD.POST:
            await UserController.create(req, res);
            break;
          default:
            break;
        }
      } else if (userId) {
        if (validateUuid(userId)) {
          switch (req.method) {
            case METHOD.GET:
              await UserController.getById(req, res, userId);
              break;
            case METHOD.PUT:
              await UserController.update(req, res, userId);
              break;
            case METHOD.DELETE:
              await UserController.remove(req, res, userId);
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
    } catch (err) {
      res.writeHead(500, CONTENT_TYPE);
      res.end(JSON.stringify({ message: ERRORS.SERVER_ERROR }));
    }
  });

  const { PORT } = process.env;

  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();
