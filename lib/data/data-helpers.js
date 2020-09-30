const fs = require('fs');
const pool = require('../utils/pool');
const seed = require('./seed');
const request = require('supertest');
const app = require('../app');

beforeEach(() => {
  return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
});

beforeEach(() => {
  return seed();
});

const agent = request.agent(app);
beforeEach(() => {
  return agent
    .post('/api/v1/auth/login')
    .send({
      email: 'test0@test.com',
      password: 'password0',
      profilePhotoUrl: 'testurl0.com'
    });
});

module.exports = {
  getAgent: () => agent
};
