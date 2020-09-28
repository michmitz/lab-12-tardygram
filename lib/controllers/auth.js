const { Router } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const UserService = require('../services/user-service');


// eslint-disable-next-line new-cap
module.exports = Router()
  .post('/signup', (req, res, next) => {
    UserService
      .create(req.body)
      .then(user => {
        res.send(user);
      })
      .catch(next);
  });
