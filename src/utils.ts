import { IncomingMessage } from 'http';

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
