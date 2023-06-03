const jwt = require('jsonwebtoken');

module.exports = {
  generateToken: ({ id, email }) => jwt.sign({ id, email }, process.env.ACCESS_TOKEN_KEY),
  verifyToken: (token) => jwt.verify(token, process.env.ACCESS_TOKEN_KEY),
};
