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

  describe('when POST /pub/exercises', () => {
    it('should response 201 if headers access_token is valid', async () => {
      // Arrange
      const payload = { name: 'Push to the limit' };
      const response = await request(app)
        .post('/pub/exercises')
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
        .post('/pub/exercises')
        .send({ name: 'Push to the limit' })
        .set('access_token', invalidToken)
        .set('Accept', 'application/json');

      expect(response.status).toEqual(401);
      expect(response.body).toEqual({
        message: 'Invalid token',
      });
    });

    it('should response 400 if the required payload is not provided', async () => {
      const response = await request(app)
        .post('/pub/exercises')
        .send({})
        .set('access_token', validToken)
        .set('Accept', 'application/json');

      expect(response.status).toEqual(400);
      expect(response.body.message).toBeDefined();
    });

    it('should response 401 when data is not login yet', async () => {
      const response = await request(app)
        .post('/pub/exercises')
        .send({ name: 'Push to the limit' })
        .set('Accept', 'application/json');

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

    it('should response 404 when data is not found', async () => {
      const response = await request(app)
        .get('/pub/exercises/09770')
        .set('access_token', validToken);

      expect(response.status).toEqual(404);
      expect(response.body).toEqual({
        message: 'Data not found',
      });
    });
  });

  describe('when DELETE /pub/exercises/:id', () => {
    it('should response 200 if headers access_token is valid', async () => {
      // Arrange
      const exercise = await ExercisesTableTestHelper.addExcercise({ name: 'Latihan otot atas', userId: customer.id });

      // Action
      const response = await request(app)
        .delete(`/pub/exercises/${exercise.id}`)
        .set('access_token', validToken);

      const { body } = response;
      expect(response.status).toEqual(200);
      expect(body).toBeInstanceOf(Object);
      expect(body.message).toBeDefined();
    });

    it('should response 401 if headers access_token is not valid', async () => {
      // Action
      const response = await request(app)
        .delete('/pub/exercises/100')
        .set('access_token', invalidToken);

      const { body } = response;
      expect(response.status).toEqual(401);
      expect(body).toBeInstanceOf(Object);
      expect(body.message).toBeDefined();
    });

    it('should response 401 when data is not login yet', async () => {
      const response = await request(app)
        .delete('/pub/exercises/0977');

      expect(response.status).toEqual(401);
      expect(response.body).toEqual({
        message: 'Invalid token',
      });
    });

    it('should response 403 if headers access_token is unauthorized', async () => {
      // Arrange
      const user = await UsersTableTestHelper.addUser({ username: 'john' });
      const exercise = await ExercisesTableTestHelper.addExcercise({ name: 'Latihan otot atas', userId: user.id });
      const response = await request(app)
        .delete(`/pub/exercises/${exercise.id}`)
        .set('access_token', validToken);

      expect(response.status).toEqual(403);
      expect(response.body).toEqual({
        message: 'You are not authorized',
      });
    });

    it('should response 404 when data is not found', async () => {
      const response = await request(app)
        .delete('/pub/exercises/100')
        .set('access_token', validToken);

      expect(response.status).toEqual(404);
      expect(response.body).toEqual({
        message: 'Data not found',
      });
    });
  });

  // create exercise detail
  describe('when POST /pub/exercises/:id/details', () => {
    it('should response 201 if headers access_token is valid and exerciseId is available', async () => {
      // Arrange
      const exercise = await ExercisesTableTestHelper.addExcercise({ name: 'Latihan otot atas', userId: customer.id });

      const payload = {
        exerciseDetails: [
          {
            bodyPartId: '1369',
            bodyPart: 'lower legs',
            name: 'band two legs calf raise - (band under both legs) v. 2',
            gifUrl: 'http://d205bpvrqc9yn1.cloudfront.net/1369.gif',
            repetition: 10,
            totalSet: 3,
          },
          {
            bodyPartId: '0987',
            bodyPart: 'upper legs',
            name: 'band one arm single leg split squat',
            gifUrl: 'http://d205bpvrqc9yn1.cloudfront.net/0987.gif',
            repetition: 10,
            totalSet: 3,
          },
          {
            bodyPartId: '0748',
            bodyPart: 'chest',
            name: 'smith bench press',
            gifUrl: 'http://d205bpvrqc9yn1.cloudfront.net/0748.gif',
            repetition: 10,
            totalSet: 3,
          },
        ],
      };

      const response = await request(app)
        .post(`/pub/exercises/${exercise.id}/details`)
        .send(payload)
        .set('access_token', validToken)
        .set('Accept', 'application/json');

      // Assert
      const { body } = response;
      const { body: expectedExcercise } = await request(app)
        .get(`/pub/exercises/${exercise.id}`)
        .set('access_token', validToken);
      expect(response.status).toEqual(201);
      expect(body).toBeInstanceOf(Object);
      expect(body.message).toBeDefined();
      expect(expectedExcercise).toBeInstanceOf(Object);
      expect(expectedExcercise.exercises).toBeInstanceOf(Array);
      expect(expectedExcercise.exercises).toHaveLength(3);
    });

    it('should response 401 if headers access_token is not valid', async () => {
      // Arrange
      const exercise = await ExercisesTableTestHelper.addExcercise({ name: 'Latihan otot atas', userId: customer.id });

      const payload = {
        exerciseDetails: [
          {
            bodyPartId: '1369',
            bodyPart: 'lower legs',
            name: 'band two legs calf raise - (band under both legs) v. 2',
            gifUrl: 'http://d205bpvrqc9yn1.cloudfront.net/1369.gif',
            repetition: 10,
            totalSet: 3,
          },
          {
            bodyPartId: '0987',
            bodyPart: 'upper legs',
            name: 'band one arm single leg split squat',
            gifUrl: 'http://d205bpvrqc9yn1.cloudfront.net/0987.gif',
            repetition: 10,
            totalSet: 3,
          },
          {
            bodyPartId: '0748',
            bodyPart: 'chest',
            name: 'smith bench press',
            gifUrl: 'http://d205bpvrqc9yn1.cloudfront.net/0748.gif',
            repetition: 10,
            totalSet: 3,
          },
        ],
      };

      const response = await request(app)
        .post(`/pub/exercises/${exercise.id}/details`)
        .send(payload)
        .set('access_token', invalidToken)
        .set('Accept', 'application/json');

      // Assert
      const { body } = response;
      expect(response.status).toEqual(401);
      expect(body).toBeInstanceOf(Object);
      expect(body.message).toBeDefined();
    });

    it('should response 401 when data is not login yet', async () => {
      // Arrange
      const exercise = await ExercisesTableTestHelper.addExcercise({ name: 'Latihan otot atas', userId: customer.id });
      const payload = {
        exerciseDetails: [
          {
            bodyPartId: '1369',
            bodyPart: 'lower legs',
            name: 'band two legs calf raise - (band under both legs) v. 2',
            gifUrl: 'http://d205bpvrqc9yn1.cloudfront.net/1369.gif',
            repetition: 10,
            totalSet: 3,
          },
          {
            bodyPartId: '0987',
            bodyPart: 'upper legs',
            name: 'band one arm single leg split squat',
            gifUrl: 'http://d205bpvrqc9yn1.cloudfront.net/0987.gif',
            repetition: 10,
            totalSet: 3,
          },
          {
            bodyPartId: '0748',
            bodyPart: 'chest',
            name: 'smith bench press',
            gifUrl: 'http://d205bpvrqc9yn1.cloudfront.net/0748.gif',
            repetition: 10,
            totalSet: 3,
          },
        ],
      };

      const response = await request(app)
        .post(`/pub/exercises/${exercise.id}/details`)
        .send(payload);

      expect(response.status).toEqual(401);
      expect(response.body).toEqual({
        message: 'Invalid token',
      });
    });

    it('should response 404 when data is not found', async () => {
      const response = await request(app)
        .post('/pub/exercises/100/details')
        .set('access_token', validToken);

      expect(response.status).toEqual(404);
      expect(response.body).toEqual({
        message: 'Data not found',
      });
    });
  });
});
