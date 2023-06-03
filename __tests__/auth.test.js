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

  it('should response 400 when request payload not contain needed property username', async () => {
    const requestPayload = {
      email: 'john@gmail.com',
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

  it('should response 400 when request payload not contain needed property password', async () => {
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
      email: 'john@gmail.com',
      username: 'dohok',
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

  it('should response 400 when username unavailable', async () => {
    const requestPayload = {
      email: 'greg@gmail.com',
      username: 'greg',
      password: '123456',
    };

    await UserTableTestHelper.addUser({ username: 'greg' });

    const response = await request(app)
      .post('/pub/register')
      .send(requestPayload)
      .set('Accept', 'application/json');

    const { body } = response;
    expect(response.status).toEqual(400);
    expect(body.message).toBeDefined();
  });

  it('should response 400 when request payload username has an invalid format', async () => {
    const requestPayload = {
      email: 'john',
      username: 'john doe',
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

describe('when POST /pub/login', () => {
  afterEach(async () => {
    await UserTableTestHelper.cleanTable();
  });

  it('should response 200, persisted customer and the access_token', async () => {
    const requestPayload = {
      username: 'dohok',
      password: '123456',
    };

    await UserTableTestHelper.addUser(requestPayload);

    const response = await request(app)
      .post('/pub/login')
      .send(requestPayload)
      .set('Accept', 'application/json');

    const { body } = response;
    expect(response.status).toEqual(200);
    expect(body).toBeInstanceOf(Object);
    expect(body.access_token).toBeDefined();
  });

  it('should response 400, request user paylaod not contain username', async () => {
    const requestPayload = {
      password: '123456',
    };

    const response = await request(app)
      .post('/pub/login')
      .send(requestPayload)
      .set('Accept', 'application/json');

    const { body } = response;
    expect(response.status).toEqual(400);
    expect(body).toBeInstanceOf(Object);
    expect(body.message).toBeDefined();
  });

  it('should response 400, request user paylaod not contain password', async () => {
    const requestPayload = {
      username: 'john',
    };

    const response = await request(app)
      .post('/pub/login')
      .send(requestPayload)
      .set('Accept', 'application/json');

    const { body } = response;
    expect(response.status).toEqual(400);
    expect(body).toBeInstanceOf(Object);
    expect(body.message).toBeDefined();
  });

  it('should response 401 when the password is wrong', async () => {
    const requestPayload = {
      username: 'dohok',
      password: '123456',
    };

    await UserTableTestHelper.addUser(requestPayload);

    const response = await request(app)
      .post('/pub/login')
      .send({ username: requestPayload.username, password: 'secret' })
      .set('Accept', 'application/json');

    const { body } = response;
    expect(response.status).toEqual(401);
    expect(body.message).toBeDefined();
  });

  it('should response 401 when the user is unregistered', async () => {
    const requestPayload = {
      username: 'dohok',
      password: '123456',
    };

    const response = await request(app)
      .post('/pub/login')
      .send({ username: requestPayload.username, password: 'secret' })
      .set('Accept', 'application/json');

    const { body } = response;
    expect(response.status).toEqual(401);
    expect(body.message).toBeDefined();
  });
});
