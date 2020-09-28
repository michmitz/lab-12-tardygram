const User = require('../models/user');
const bcrypt = require('bcryptjs');

const create = async({ email, password, profilePhotoUrl }) => {
  const passwordHash = await bcrypt.hash(password, 14);
  return User.insert({ email, passwordHash, profilePhotoUrl });
};

module.exports = {
  create
};
