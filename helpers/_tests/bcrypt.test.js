const bcrypt = require('bcryptjs');
const BcryptPasswordHash = require('../bcrypt');

describe('BcryptPasswordHash', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  describe('hash function', () => {
    it('should encrypt password correctly', () => {
      // Arrange
      const spyHash = jest.spyOn(bcrypt, 'hashSync');

      // Action
      const encryptedPassword = BcryptPasswordHash.hashPassword('plain_password');

      // Assert
      expect(typeof encryptedPassword).toEqual('string');
      expect(encryptedPassword).not.toEqual('plain_password');
      expect(spyHash).toBeCalledWith('plain_password', 10); // 10 adalah nilai saltRound default untuk BcryptPasswordHash
    });
  });

  describe('comparePassword function', () => {
    it('should return false if password did not match', () => {
      // Arrange
      const spyCompareSync = jest.spyOn(bcrypt, 'compareSync');

      // Act & Assert
      expect(BcryptPasswordHash.comparePassword('plain_password', 'encrypted_password')).toEqual(false);
      expect(spyCompareSync).toBeCalledTimes(1);
      expect(spyCompareSync).toBeCalledWith('plain_password', 'encrypted_password');
    });

    it('should return false if password match', () => {
      // Arrange
      const spyCompareSync = jest.spyOn(bcrypt, 'compareSync');
      const plainPassword = 'secret';
      const encryptedPassword = BcryptPasswordHash.hashPassword(plainPassword);

      // Act & Assert
      expect(BcryptPasswordHash.comparePassword(plainPassword, encryptedPassword))
        .toEqual(true);
      expect(spyCompareSync).toBeCalledTimes(1);
      expect(spyCompareSync).toBeCalledWith(plainPassword, encryptedPassword);
    });
  });
});
