const Jwt = require('jsonwebtoken');
const JwtTokenManager = require('../jwt');

afterEach(() => {
  jest.restoreAllMocks();
});

describe('JwtTokenManager', () => {
  describe('createAcessToken function', () => {
    it('should create accessToken correctly', () => {
      // Arrange
      const payload = {
        id: 1,
        username: 'john',
        email: 'john@gmail.com',
      };
      const spySign = jest.spyOn(Jwt, 'sign').mockReturnValueOnce('mock_token');

      // Action
      const accessToken = JwtTokenManager
        .generateToken(payload);

      // Assert
      expect(spySign)
        .toBeCalledWith(payload, process.env.ACCESS_TOKEN_KEY);
      expect(accessToken).toEqual('mock_token');
    });
  });

  describe('verifyRefreshToken function', () => {
    it('should throw an Error when verification failed', () => {
      // Arrange
      const spyVerify = jest.spyOn(Jwt, 'verify');
      const accessToken = Jwt.sign({ username: 'greg' }, 'secret');

      // Action & Assert
      expect(() => JwtTokenManager.verifyToken(accessToken)).toThrowError();
      expect(spyVerify).toBeCalledWith(accessToken, process.env.ACCESS_TOKEN_KEY);
    });

    it('should not throw Error when access token verified', () => {
      // Arrange
      const spyVerify = jest.spyOn(Jwt, 'verify');
      const accessToken = JwtTokenManager.generateToken({ username: 'john' });

      // Action & Assert
      expect(JwtTokenManager.verifyToken(accessToken).username).toEqual('john');
      expect(spyVerify).toBeCalledWith(accessToken, process.env.ACCESS_TOKEN_KEY);
    });
  });
});
