const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/user-service');

describe('lab-12-tardygram routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('signs up a user via POST', async() => {
    const response = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'test@test.com',
        password: 'password',
        profilePhotoUrl: 'testurl.com' 
      });

    expect(response.body).toEqual({
      id: expect.any(String),
      email: 'test@test.com',
      profilePhotoUrl: 'testurl.com' 
    });
  });

  it('logs in a user via POST', async() => {
    const user = await UserService.create({
      email: 'test@test.com',
      password: 'password',
      profilePhotoUrl: 'testurl.com' 
    });

    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'test@test.com',
        password: 'password',
        profilePhotoUrl: 'testurl.com'
      });

    expect(response.body).toEqual({
      id: user.id,
      email: 'test@test.com',
      profilePhotoUrl: 'testurl.com'
    });
  });

  it('verifies a user via GET', async() => {
    const agent = request.agent(app);
    await agent
      .post('/api/v1/auth/signup')
      .send({
        email: 'test@test.com',
        password: 'password',
        profilePhotoUrl: 'testurl.com'
      });

    const response = await agent
      .get('/api/v1/auth/verify');
      
    expect(response.body).toEqual({
      id: expect.any(String),
      email: 'test@test.com'
    });

    const responseWithoutAUser = await request(app)
      .get('/api/v1/auth/verify');

    expect(responseWithoutAUser.body).toEqual({
      status: 500,
      message: 'jwt must be provided'
    });
  });
});
