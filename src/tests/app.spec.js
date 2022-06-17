require('dotenv').config();
const supertest = require('supertest');
const http = require('http');

const port = process.env.PORT || 4000;

const request = supertest(`localhost:${port}`);

describe('Test scenario 1', () => {
  let id = '';
  let user = {};

  it('GET api/users request expect an empty array', async () => {
    const res = await request.get('/api/users');
    expect(res.body).toEqual([]);
  });

  it('POST api/users expect a newly created record', async () => {
    const mockRequest = {
      username: 'Name',
      age: 22,
      hobbies: ['hobby'],
    };

    const res = await request.post('/api/users').send(mockRequest);
    id = res.body.id;
    user = { id, ...mockRequest };

    expect(res.body).toEqual(user);
    expect(res.statusCode).toBe(201);
  });

  it('GET api/user/{userId} expect the created record)', async () => {
    const res = await request.get(`/api/users/${id}`);

    expect(res.body).toEqual(user);
    expect(res.statusCode).toBe(200);
  });

  it('PUT api/users/{userId} expect an updated object with the same id', async () => {
    const mockRequest = {
      username: 'NewName',
      age: 33,
      hobbies: ['hobby'],
    };

    const res = await request.put(`/api/users/${id}`).send(mockRequest);
    user = { id, ...mockRequest };

    expect(res.body).toEqual(user);
    expect(res.statusCode).toBe(200);
  });

  it('DELETE api/users/{userId} expect the confirmation of successful deletion)', async () => {
    const res = await request.delete(`/api/users/${id}`);

    expect(res.statusCode).toBe(204);
  });

  it('GET api/users/{userId} deleted object by id expect no such object)', async () => {
    const res = await request.get(`/api/users/${id}`);

    expect(res.statusCode).toBe(404);
    expect(JSON.parse(res.text).message).toBe('User not found');
  });
});

describe('Test scenario 2: bad requests', () => {
  it('POST api/users with missing fields in body expect 400 error', async () => {
    const mockRequest = {
      username: 'Name',
      age: 33,
    };

    const res = await request.post('/api/users').send(mockRequest);

    expect(res.statusCode).toBe(400);
    expect(JSON.parse(res.text).message).toBe('Missing required fields in request body');
  });

  it('POST api/users with body properties in the wrong format expect 400 error', async () => {
    const mockRequest = {
      username: 'Name',
      age: 33,
      hobbies: 'hobby',
    };

    const res = await request.post('/api/users').send(mockRequest);

    expect(res.statusCode).toBe(400);
    expect(JSON.parse(res.text).message).toBe('One of the body properties is in the wrong format');
  });

  it('GET api/user/{userId} with ID in the wrong format expect 400 error', async () => {
    const res = await request.get('/api/users/12345');

    expect(res.statusCode).toBe(400);
    expect(JSON.parse(res.text).message).toBe('Invalid ID format');
  });

  it('GET api/user/{userId} with not existed ID format expect 404 error', async () => {
    const res = await request.get('/api/users/6657d7c6-93a4-4849-b8b5-22af7600272d');

    expect(res.statusCode).toBe(404);
    expect(JSON.parse(res.text).message).toBe('User not found');
  });

  it('PUT api/users/{userId} with ID in the wrong format expect 400 error', async () => {
    const mockRequest = {
      username: 'Name',
      age: 33,
      hobbies: ['hobby'],
    };
    const res = await request.put('/api/users/{12345}').send(mockRequest);

    expect(res.statusCode).toBe(400);
    expect(JSON.parse(res.text).message).toBe('Invalid ID format');
  });

  it('PUT api/user/{userId} with not existed ID format expect 404 error', async () => {
    const mockRequest = {
      username: 'Name',
      age: 33,
      hobbies: ['hobby'],
    };
    const res = await request.put('/api/users/6657d7c6-93a4-4849-b8b5-22af7600272d').send(mockRequest);

    expect(res.statusCode).toBe(404);
    expect(JSON.parse(res.text).message).toBe('User not found');
  });

  describe('Test scenario 3', () => {
    it('POST 2 equal bodies don\'t lead to error', async () => {
      const mockRequest = {
        username: 'Name',
        age: 22,
        hobbies: ['hobby'],
      };

      await request.post('/api/users').send(mockRequest);
      const res2 = await request.post('/api/users').send(mockRequest);
      const id2 = res2.body.id;
      const user2 = { id: id2, ...mockRequest };

      expect(res2.body).toEqual(user2);
      expect(res2.statusCode).toBe(201);
    });

    it('GET api/users after 2 POST requests expect an array with length 2', async () => {
      const res = await request.get('/api/users');

      expect(res.body.length).toBe(2);
    });

    it('DELETE api/users/{userId} 2 requests don\'t lead to error', async () => {
      const res = await request.get('/api/users');
      const id1 = res.body[0].id;
      const id2 = res.body[1].id;

      const res1 = await request.delete(`/api/users/${id1}`);
      const res2 = await request.delete(`/api/users/${id2}`);

      expect(res1.statusCode).toBe(204);
      expect(res2.statusCode).toBe(204);
    });

    it('GET api/users after 2 DELETE requests expect an empty array', async () => {
      const res = await request.get('/api/users');

      expect(res.body).toEqual([]);
    });
  });
});
