/* eslint-disable no-console */
const request = require('supertest');
const app = require('../app');
const TokenManager = require('../helpers/jwt');
const UsersTableTestHelper = require('../tests/UsersTableTestHelper');

let validToken;
const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIwMUBtYWlsLmNvbSIsImlkIjoxLCJpYXQiOjE2MjI2MDk2NTF9.gShAB2qaCUjlnvNuM1MBWfBVEjDGdqjWSJNMEScXIeE';

const customerTest = {
  username: 'greg',
  email: 'greg@gmail.com',
  password: '123456',
};

beforeAll(async () => {
  try {
    const customer = await UsersTableTestHelper.addUser(customerTest);
    validToken = TokenManager.generateToken({
      id: customer.id,
      username: customer.username,
      email: customer.email,
    });
  } catch (error) {
    console.error(error);
  }
});

afterAll(async () => {
  try {
    await UsersTableTestHelper.cleanTable();
  } catch (error) {
    console.error(error);
  }
});

describe('/pub/bodyparts endpoint', () => {
  describe('when GET /pub/bodyparts', () => {
    it('should response 200 if headers access_token is valid', async () => {
      const response = await request(app)
        .get('/pub/bodyparts')
        .set('access_token', validToken);

      const { body } = response;
      expect(response.status).toEqual(200);
      expect(body).toBeDefined();
      expect(body).toBeInstanceOf(Array);
    });

    it('should response 200 when query params target is defined and if headers access_token is valid', async () => {
      const response = await request(app)
        .get('/pub/bodyparts?target=abs')
        .set('access_token', validToken);

      const { body } = response;
      expect(response.status).toEqual(200);
      expect(body).toBeDefined();
      expect(body).toBeInstanceOf(Array);
      expect(body).toHaveLength(13);
    });

    it('should response 401 if headers access_token is not valid', async () => {
      const response = await request(app)
        .get('/pub/bodyparts')
        .set('access_token', invalidToken);

      expect(response.status).toEqual(401);
      expect(response.body).toEqual({
        message: 'Invalid token',
      });
    });

    it('should response 401 when data is not login yet', async () => {
      const response = await request(app)
        .get('/pub/bodyparts');

      expect(response.status).toEqual(401);
      expect(response.body).toEqual({
        message: 'Invalid token',
      });
    });
  });

  describe('when GET /pub/bodyparts/:id', () => {
    it('should response 200 if headers access_token is valid', async () => {
      const response = await request(app)
        .get('/pub/bodyparts/0977')
        .set('access_token', validToken);

      const { body } = response;
      expect(response.status).toEqual(200);
      expect(body).toBeDefined();
      expect(body).toHaveProperty('id');
      expect(body).toHaveProperty('name');
      expect(body).toHaveProperty('target');
      expect(body).toHaveProperty('bodyPart');
      expect(body).toHaveProperty('gifUrl');
      expect(body).toHaveProperty('equipment');
    });

    it('should response 401 if headers access_token is not valid', async () => {
      const response = await request(app)
        .get('/pub/bodyparts/0977')
        .set('access_token', invalidToken);

      expect(response.status).toEqual(401);
      expect(response.body).toEqual({
        message: 'Invalid token',
      });
    });

    it('should response 401 when data is not login yet', async () => {
      const response = await request(app)
        .get('/pub/bodyparts/0977');

      expect(response.status).toEqual(401);
      expect(response.body).toEqual({
        message: 'Invalid token',
      });
    });

    it('should response 404 when data is not login yet', async () => {
      const response = await request(app)
        .get('/pub/bodyparts/09770')
        .set('access_token', validToken);

      expect(response.status).toEqual(404);
      expect(response.body).toEqual({
        message: 'Data not found',
      });
    });
  });
});
