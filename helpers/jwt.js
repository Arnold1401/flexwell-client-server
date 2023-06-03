const jwt = require('jsonwebtoken');

module.exports = {
  // eslint-disable-next-line max-len
  generateToken: (payload) => jwt.sign(payload, process.env.ACCESS_TOKEN_KEY),
  verifyToken: (token) => jwt.verify(token, process.env.ACCESS_TOKEN_KEY),
};
