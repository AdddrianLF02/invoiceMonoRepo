import { Inject, Injectable } from '@nestjs/common';
import {
  type UserRepository,
  USER_REPOSITORY,
  User
} from '@repo/core'
import {
  CreateUserDto
} from '../../dtos/user.zod'

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: UserRepository,
  ) {}

  async execute(input: CreateUserDto): Promise<User> {
    const bcrypt = await import('bcrypt');
    const saltRounds = 10;

    try {
      // Log input to track if anything unexpected is being passed
      console.log('Creating user with input:', input);

      // Hash the password securely
      const hashedPassword = await bcrypt.hash(input.password, saltRounds);

      // Create the user object
      const user = User.create({
        name: input.name,
        email: input.email,
        password: hashedPassword,
      });

      // Log the created user (excluding sensitive info like password)
      console.log('User object created:', user);

      // Save the user to the repository
      return await this.userRepository.create(user);
    } catch (error) {
      // Log the error for debugging purposes
      console.error('Error in CreateUserUseCase:', error);

      // Throw a more meaningful error if necessary
      throw new Error('Error creating user, please try again later.');
    }
  }
}
