// CreateUserUseCase (Clean Architecture)
import {
  UNIT_OF_WORK,
  type IUnitOfWork,
  User
} from '@repo/core'
import {
  CreateUserDto
} from '../../dtos/user.zod'
import { CreateUserInputPort } from './ports/input-port';
import { CREATE_USER_OUTPUT_TOKEN, type CreateUserOutputPort } from './ports/output-port';

export class CreateUserUseCase implements CreateUserInputPort {
  constructor(
    private readonly uow: IUnitOfWork,
    private readonly outputPort: CreateUserOutputPort
  ) { }

  async execute(input: CreateUserDto): Promise<void> {
    await this.uow.executeTransaction(async () => {
      const repo = this.uow.userRepository;
      const bcrypt = await import('bcrypt');
      const saltRounds = 10;

      try {
        // Hash the password securely
        const hashedPassword = await bcrypt.hash(input.password, saltRounds);

        // Create the user object
        const user = User.create({
          name: input.name,
          email: input.email,
          password: hashedPassword
        });

        // Log the created user (excluding sensitive info like password)
        console.log('User object created:', user);

        await repo.create(user);
        this.outputPort.present(user);
      } catch (error) {
        // Log the error for debugging purposes
        console.error('Error creating user:', error);
        throw error;
      }
    });
  }
}
