const { Router } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const UserService = require('../services/user-service');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

const attachCookie = (user, res) => {
  const token = UserService.makeToken(user);
  res.cookie('session', token, {
    maxAge: ONE_DAY_IN_MS,
    httpOnly: true,
    sameSite: 'none'
  });
};

// eslint-disable-next-line new-cap
module.exports = Router()
  .post('/signup', (req, res, next) => {
    UserService
      .create(req.body)
      .then(user => {
        attachCookie(user, res);
        res.send(user);
      })
      .catch(next);
  })

  .post('/login', (req, res, next) => {
    UserService
      .authorize(req.body)
      .then(user => {
        attachCookie(user, res);
        res.send(user);
      })
      .catch(next);
  });
