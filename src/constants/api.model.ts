export enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum ERRORS {
  URL_NOT_FOUND = 'Requested address doesn`t exist',
  NOT_ALLOWED = 'This method isn\'t allowed',
  BAD_REQUEST = 'Bad request',
  MISSING_FIELD = 'Missing required fields in request body',
  USER_NOT_FOUND = 'User not found',
  INVALID_ID = 'Invalid ID format',
}

export const CONTENT_TYPE = { 'Content-Type': 'application/json' };

export const USERS_URL = '/api/users';
