const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/user-service');
const { getAgent } = require('../lib/data/data-helpers');

describe('lab-12-tardygram routes', () => {
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
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'test0@test.com',
        password: 'password0',
        profilePhotoUrl: 'testurl0.com'
      });

    expect(response.body).toEqual({
      id: expect.any(String),
      email: 'test0@test.com',
      profilePhotoUrl: 'testurl0.com'
    });
  });

  it('verifies a user via GET', async() => {
    const response = await getAgent()
      .get('/api/v1/auth/verify');
      
    expect(response.body).toEqual({
      id: expect.any(String),
      email: 'test0@test.com'
    });

    const responseWithoutAUser = await request(app)
      .get('/api/v1/auth/verify');

    expect(responseWithoutAUser.body).toEqual({
      status: 500,
      message: 'jwt must be provided'
    });
  });
});
