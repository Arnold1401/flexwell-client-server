const { ValidationError, ValidationErrorItem } = require('sequelize');
const { User } = require('../index');
const UsersTableTestHelper = require('../../tests/UsersTableTestHelper');

describe('User Entities', () => {
  describe('CreateUser function', () => {
    afterEach(async () => {
      await UsersTableTestHelper.cleanTable();
    });

    it('should throw error when payload did not contain needed property', async () => {
      // Arrange
      const payload = {};

      // Action & Assert
      await expect(User.create(payload)).rejects.toThrowError(new ValidationError('', [
        new ValidationErrorItem('Username is required', 'notNull Violation'),
        new ValidationErrorItem('Email is required', 'notNull Violation'),
        new ValidationErrorItem('Password is required', 'notNull Violation'),
        new ValidationErrorItem('Role is required', 'notNull Violation'),
      ]));
    });

    it('should throw error when the email format is invalid', async () => {
      // Arrange
      const payload = {
        email: 'john',
        username: 'johndoe',
        password: 'abcfgfgfgf',
        fullName: 'John Doe',
        gender: 'Male',
        role: 'Client',
      };

      // Action & Assert
      await expect(User.create(payload)).rejects.toThrowError(new ValidationError('', [new ValidationErrorItem('Invalid email format', 'Validation error')]));
    });

    it('should throw error when username contain more than 50 character', async () => {
      // Arrange
      const payload = {
        email: 'john@gmail.com',
        username: 'johndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoejohndoe',
        password: 'abcfgfgfgf',
        fullName: 'John Doe',
        gender: 'Male',
        role: 'Client',
      };

      // Action & Assert
      await expect(User.create(payload)).rejects.toThrowError(new ValidationError('', [new ValidationErrorItem('Password must have length between 2 and 50', 'Validation error')]));
    });

    it('should throw error when username contain restricted character', async () => {
      // Arrange
      const payload = {
        email: 'john@gmail.com',
        username: 'john doe',
        password: 'secret',
        fullName: 'John Doe',
        gender: 'Male',
        role: 'Client',
      };

      // Action & Assert
      await expect(User.create(payload)).rejects.toThrowError(new ValidationError('', [new ValidationErrorItem('Username contain restricted character', 'Validation error')]));
    });
    it('should throw error when username is unavailable', async () => {
      // Arrange
      const payload = {
        email: 'john@gmail.com',
        username: 'johndoe',
        password: 'secret',
        fullName: 'John Doe',
        gender: 'Male',
        role: 'Client',
      };

      await UsersTableTestHelper.addUser({ username: 'johndoe' });

      // Action & Assert
      await expect(User.create(payload)).rejects.toThrowError(new ValidationError('Username must be unique'));
    });
    it('should throw error when username is unavailable', async () => {
      // Arrange
      const payload = {
        email: 'john@gmail.com',
        username: 'johndoe',
        password: 'secret',
        fullName: 'John Doe',
        gender: 'Male',
        role: 'Client',
      };

      await UsersTableTestHelper.addUser({ email: 'john@gmail.com' });

      // Action & Assert
      await expect(User.create(payload)).rejects.toThrowError(new ValidationError('Email must be unique'));
    });

    it('should return created user correctly', async () => {
      // Arrange
      const payload = {
        email: 'john@gmail.com',
        username: 'johndoe',
        password: 'secret',
        fullName: 'John Doe',
        gender: 'Male',
        role: 'Client',
      };

      // Action
      const createdUser = await User.create(payload);

      // Action & Assert
      expect(createdUser).toEqual(expect.objectContaining({
        id: 1,
        email: 'john@gmail.com',
        username: 'johndoe',
        fullName: 'John Doe',
        gender: 'Male',
        role: 'Client',
      }));
    });
  });
});
