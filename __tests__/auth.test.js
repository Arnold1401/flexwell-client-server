const request = require('supertest');
const app = require('../app');
const UserTableTestHelper = require('../tests/UsersTableTestHelper');

afterAll(async () => {
  await UserTableTestHelper.cleanTable();
});

describe('when POST /pub/register', () => {
  afterEach(async () => {
    await UserTableTestHelper.cleanTable();
  });

  it('should response 201 and persisted customer user', async () => {
    const requestPayload = {
      email: 'john@gmail.com',
      username: 'johndoe',
      password: '123456',
    };

    const response = await request(app)
      .post('/pub/register')
      .send(requestPayload)
      .set('Accept', 'application/json');

    const { body } = response;
    expect(response.status).toEqual(201);
    expect(body.message).toBeDefined();
  });

  it('should response 400 when request payload not contain needed property email', async () => {
    const requestPayload = {
      username: 'john',
      password: 'secret',
    };
    const response = await request(app)
      .post('/pub/register')
      .send(requestPayload)
      .set('Accept', 'application/json');

    const { body } = response;
    expect(response.status).toEqual(400);
    expect(body.message).toBeDefined();
  });

  it('should response 400 when request payload username contain restricted character', async () => {
    const requestPayload = {
      email: 'john@gmail.com',
      username: 'john doe',
      password: 'secret',
    };
    const response = await request(app)
      .post('/pub/register')
      .send(requestPayload)
      .set('Accept', 'application/json');

    const { body } = response;
    expect(response.status).toEqual(400);
    expect(body.message).toBeDefined();
  });

  it('should response 400 when request payload password length less than six characters', async () => {
    const requestPayload = {
      username: 'john',
      email: 'dohok@gmail.com',
      password: 'jslf',
    };
    const response = await request(app)
      .post('/pub/register')
      .send(requestPayload)
      .set('Accept', 'application/json');

    const { body } = response;
    expect(response.status).toEqual(400);
    expect(body.message).toBeDefined();
  });

  it('should response 400 when an email unavailable', async () => {
    const requestPayload = {
      username: 'greg',
      email: 'greg@gmail.com',
      password: '123456',
    };

    await UserTableTestHelper.addUser({ email: 'greg@gmail.com' });

    const response = await request(app)
      .post('/pub/register')
      .send(requestPayload)
      .set('Accept', 'application/json');

    const { body } = response;
    expect(response.status).toEqual(400);
    expect(body.message).toBeDefined();
  });

  it('should response 400 when request payload email has an invalid format', async () => {
    const requestPayload = {
      username: 'greg',
      email: 'greg.com',
      password: '123456',
    };

    const response = await request(app)
      .post('/pub/register')
      .send(requestPayload)
      .set('Accept', 'application/json');

    const { body } = response;
    expect(response.status).toEqual(400);
    expect(body.message).toBeDefined();
  });
});
