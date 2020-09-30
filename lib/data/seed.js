const UserService = require('../services/user-service');

module.exports = async({ userCount = 5 } = {}) => {
  await Promise.all([...Array(userCount)].map((_, i) => {
    return UserService.create({
      email: `test${i}@test.com`,
      password: `password${i}`,
      profilePhotoUrl: `testurl${i}.com`
    });
  }));
};
