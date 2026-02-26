import { User } from '../../entities/User';
import { Email } from '../../value-objects/Email';

describe('User', () => {
  it('should create a user with valid data', () => {
    // Arrange
    const name = 'John Doe';
    const email = 'john.doe@example.com';
    const password = 'password123';

    // Act
    const user = User.create({
      name,
      email,
      password
    });

    // Assert
    expect(user).toBeDefined();
    expect(user.getName()).toBe(name);
    expect(user.getEmail().getValue()).toBe(email);
    expect(user.getCreatedAt()).toBeInstanceOf(Date);
    expect(user.getUpdatedAt()).toBeInstanceOf(Date);
  });

  it('should throw an error when creating a user with invalid email', () => {
    // Arrange
    const name = 'John Doe';
    const invalidEmail = 'invalid-email';
    const password = 'password123';

    // Act & Assert
    expect(() => {
      User.create({
        name,
        email: invalidEmail,
        password
      });
    }).toThrow();
  });

  it('should throw an error when creating a user with short password', () => {
    // Arrange
    const name = 'John Doe';
    const email = 'john.doe@example.com';
    const shortPassword = '123';

    // Act & Assert
    expect(() => {
      User.create({
        name,
        email,
        password: shortPassword
      });
    }).toThrow();
  });
});