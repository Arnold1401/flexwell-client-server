/* eslint-disable no-console */
const request = require('supertest');
const app = require('../app');
const TokenManager = require('../helpers/jwt');
const UsersTableTestHelper = require('../tests/UsersTableTestHelper');
const ExercisesTableTestHelper = require('../tests/ExercisesTableTestHelper');
const ExerciseDetailsTableTestHelper = require('../tests/ExerciseDetailsTableTestHelper');
const exerciseTest = require('../data/challenges.json');
const exerciseDetailTest = require('../data/challengeDetails.json');

let validToken;
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
    const customer = await UsersTableTestHelper.addUser(customerTest);
    validToken = TokenManager.generateToken({
      id: customer.id,
      username: customer.username,
      email: customer.email,
    });
    await ExercisesTableTestHelper.addExcercises(exerciseTest);
    await ExerciseDetailsTableTestHelper.addExcerciseDetails(exerciseDetailTest);
  } catch (error) {
    console.error(error);
  }
});

afterAll(async () => {
  try {
    await UsersTableTestHelper.cleanTable();
    await ExercisesTableTestHelper.cleanTable();
    await ExerciseDetailsTableTestHelper.cleanTable();
  } catch (error) {
    console.error(error);
  }
});

describe('/pub/exercises endpoint', () => {
  describe('when GET /pub/exercises', () => {
    it('should response 200 if headers access_token is valid', async () => {
      const response = await request(app)
        .get('/pub/exercises?type=Challenge')
        .set('access_token', validToken);

      const { body } = response;
      expect(response.status).toEqual(200);
      expect(body).toBeDefined();
      expect(body).toBeInstanceOf(Array);
    });

    it('should response 200 when query params type is equal to Challenge and if headers access_token is valid', async () => {
      const response = await request(app)
        .get('/pub/exercises?type=Challenge')
        .set('access_token', validToken);

      const { body } = response;
      expect(response.status).toEqual(200);
      expect(body).toBeDefined();
      expect(body).toBeInstanceOf(Array);
    });

    it('should response 200 if headers access_token is valid', async () => {
      const response = await request(app)
        .get('/pub/exercises')
        .set('access_token', validToken);

      const { body } = response;
      expect(response.status).toEqual(200);
      expect(body).toBeDefined();
      expect(body).toBeInstanceOf(Array);
    });

    it('should response 200 when query params type is equal to Challenge and if headers access_token is valid', async () => {
      const response = await request(app)
        .get('/pub/exercises')
        .set('access_token', validToken);

      const { body } = response;
      expect(response.status).toEqual(200);
      expect(body).toBeDefined();
      expect(body).toBeInstanceOf(Array);
    });

    it('should response 401 if headers access_token is not valid', async () => {
      const response = await request(app)
        .get('/pub/exercises?type=Challenge')
        .set('access_token', invalidToken);

      expect(response.status).toEqual(401);
      expect(response.body).toEqual({
        message: 'Invalid token',
      });
    });

    it('should response 401 when data is not login yet', async () => {
      const response = await request(app)
        .get('/pub/exercises?type=Challenge');

      expect(response.status).toEqual(401);
      expect(response.body).toEqual({
        message: 'Invalid token',
      });
    });
  });

  describe('when GET /pub/exercises/:id', () => {
    it('should response 200 if headers access_token is valid', async () => {
      const response = await request(app)
        .get('/pub/exercises/1')
        .set('access_token', validToken);

      const { body } = response;
      expect(response.status).toEqual(200);
      expect(body).toBeDefined();
      expect(body).toBeInstanceOf(Object);
    });

    it('should response 401 if headers access_token is not valid', async () => {
      const response = await request(app)
        .get('/pub/exercises/0977')
        .set('access_token', invalidToken);

      expect(response.status).toEqual(401);
      expect(response.body).toEqual({
        message: 'Invalid token',
      });
    });

    it('should response 401 when data is not login yet', async () => {
      const response = await request(app)
        .get('/pub/exercises/0977');

      expect(response.status).toEqual(401);
      expect(response.body).toEqual({
        message: 'Invalid token',
      });
    });

    it('should response 404 when data is not login yet', async () => {
      const response = await request(app)
        .get('/pub/exercises/09770')
        .set('access_token', validToken);

      expect(response.status).toEqual(404);
      expect(response.body).toEqual({
        message: 'Data not found',
      });
    });
  });
});
