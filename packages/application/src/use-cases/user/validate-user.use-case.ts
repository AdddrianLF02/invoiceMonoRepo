// ValidateUserUseCase (Clean Architecture)
import {
  type UserRepository,
  Email,
} from '@repo/core'
import { ValidateUserInputPort } from './ports/input-port';
import { type ValidateUserOutputPort } from './ports/output-port';



export class ValidateUserUseCase implements ValidateUserInputPort {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly outputPort: ValidateUserOutputPort
  ) { }

  async execute(email: string, pass: string): Promise<void> {
    const user = await this.userRepository.findByEmail(Email.create(email));

    if (user && (await user.comparePassword(pass))) {
      await this.outputPort.present(user.toSafeObject());
      return;
    }

    await this.outputPort.present(null);
  }
}