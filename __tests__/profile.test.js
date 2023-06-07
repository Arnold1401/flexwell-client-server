/* eslint-disable no-console */
const request = require('supertest');
const app = require('../app');
const TokenManager = require('../helpers/jwt');
const UsersTableTestHelper = require('../tests/UsersTableTestHelper');

let validToken;
let customer;
const invalidToken = TokenManager.generateToken({
  id: 100,
  username: 'john',
  email: 'john@gmail.com',
});

const customerTest = {
  username: 'greg',
  email: 'greg@gmail.com',
  password: '123456',
};

beforeAll(async () => {
  try {
    customer = await UsersTableTestHelper.addUser(customerTest);
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

describe('/pub/profiles endpoint', () => {
  describe('when POST /pub/profiles', () => {
    it('should response 201 if headers access_token is valid', async () => {
      // Arrange
      const payload = {
        fullName: 'john doe',
        gender: 'Male',
        dateOfBirth: new Date(),
      };
      const response = await request(app)
        .post('/pub/profiles')
        .send(payload)
        .set('access_token', validToken)
        .set('Accept', 'application/json');

      const { body } = response;
      expect(response.status).toEqual(201);
      expect(body).toBeInstanceOf(Object);
      expect(body.message).toBeDefined();
    });

    it('should response 401 if headers access_token is not valid', async () => {
      const response = await request(app)
        .post('/pub/profiles')
        .send({})
        .set('access_token', invalidToken)
        .set('Accept', 'application/json');

      expect(response.status).toEqual(401);
      expect(response.body).toEqual({
        message: 'Invalid token',
      });
    });

    it('should response 401 when data is not login yet', async () => {
      const response = await request(app)
        .post('/pub/profiles')
        .send({})
        .set('Accept', 'application/json');

      expect(response.status).toEqual(401);
      expect(response.body).toEqual({
        message: 'Invalid token',
      });
    });
  });

  describe('when GET /pub/profiles', () => {
    it('should response 200 and response body must be an Object if headers access_token is valid', async () => {
      const response = await request(app)
        .get('/pub/profiles')
        .set('access_token', validToken);

      const { body } = response;
      expect(response.status).toEqual(200);
      expect(body).toBeDefined();
      expect(body).toBeInstanceOf(Object);
    });

    it('should response 401 when data is not login yet', async () => {
      const response = await request(app)
        .get('/pub/profiles');

      expect(response.status).toEqual(401);
      expect(response.body).toEqual({
        message: 'Invalid token',
      });
    });
  });
});

describe('/pub/profiles/bodies endpoint', () => {
  describe('when GET /pub/profiles/bodies', () => {
    it('should response 200 and response body must be an Array if headers access_token is valid', async () => {
      const response = await request(app)
        .get('/pub/profiles/bodies')
        .set('access_token', validToken);

      const { body } = response;
      expect(response.status).toEqual(200);
      expect(body).toBeDefined();
      expect(body).toBeInstanceOf(Array);
    });

    it('should response 401 when data is not login yet', async () => {
      const response = await request(app)
        .get('/pub/profiles/bodies');

      expect(response.status).toEqual(401);
      expect(response.body).toEqual({
        message: 'Invalid token',
      });
    });
  });

  describe('when POST /pub/profiles/bodies', () => {
    it('should response 201 if headers access_token is valid', async () => {
      // Arrange
      const payload = {
        biceps: 8,
        waist: 9,
        chest: 8,
        shoulder: 8,
        thigh: 10,
        calf: 10,
        height: 8,
        weight: 9,
        date: new Date(),
      };
      const response = await request(app)
        .post('/pub/profiles/bodies')
        .send(payload)
        .set('access_token', validToken)
        .set('Accept', 'application/json');

      const { body } = response;
      expect(response.status).toEqual(201);
      expect(body).toBeInstanceOf(Object);
      expect(body.message).toBeDefined();
    });

    it('should response 201 if headers access_token is valid', async () => {
      const response = await request(app)
        .post('/pub/profiles/bodies')
        .send({})
        .set('access_token', validToken)
        .set('Accept', 'application/json');

      const { body } = response;
      expect(response.status).toEqual(201);
      expect(body).toBeInstanceOf(Object);
      expect(body.message).toBeDefined();
    });

    it('should response 400 if headers access_token is valid', async () => {
      // Arrange
      const payload = {
        biceps: 8,
        waist: 9,
        chest: 8,
        shoulder: 'ini datatype yang salah',
        thigh: 10,
        calf: 10,
        height: 8,
        weight: 9,
        date: new Date(),
      };
      const response = await request(app)
        .post('/pub/profiles/bodies')
        .send(payload)
        .set('access_token', validToken)
        .set('Accept', 'application/json');

      const { body } = response;
      expect(response.status).toEqual(400);
      expect(body).toBeInstanceOf(Object);
      expect(body.message).toBeDefined();
    });

    it('should response 401 if headers access_token is not valid', async () => {
      // Arrange
      const payload = {
        biceps: 8,
        waist: 9,
        chest: 8,
        shoulder: 8,
        thigh: 10,
        calf: 10,
        height: 8,
        weight: 9,
        date: new Date(),
      };
      const response = await request(app)
        .post('/pub/profiles/bodies')
        .send(payload)
        .set('access_token', invalidToken)
        .set('Accept', 'application/json');

      expect(response.status).toEqual(401);
      expect(response.body).toEqual({
        message: 'Invalid token',
      });
    });

    it('should response 401 when data is not login yet', async () => {
      // Arrange
      const payload = {
        biceps: 8,
        waist: 9,
        chest: 8,
        shoulder: 8,
        thigh: 10,
        calf: 10,
        height: 8,
        weight: 9,
        date: new Date(),
      };
      const response = await request(app)
        .post('/pub/profiles/bodies')
        .send(payload)
        .set('Accept', 'application/json');

      expect(response.status).toEqual(401);
      expect(response.body).toEqual({
        message: 'Invalid token',
      });
    });
  });
});
