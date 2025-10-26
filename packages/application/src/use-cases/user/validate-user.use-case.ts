import { Inject, Injectable } from '@nestjs/common';
import {
  USER_REPOSITORY,
  type UserRepository,
  Email,
} from '@repo/core'
import { ValidateUserInputPort } from './ports/input-port';
import { VALIDATE_USER_OUTPUT_TOKEN, type ValidateUserOutputPort, type SafeUser } from './ports/output-port';



@Injectable()
export class ValidateUserUseCase implements ValidateUserInputPort {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    
    @Inject(VALIDATE_USER_OUTPUT_TOKEN)
    private readonly outputPort: ValidateUserOutputPort
  ) {}

  async execute(email: string, pass: string): Promise<void> {
    const user = await this.userRepository.findByEmail(Email.create(email));

    if (user && (await user.comparePassword(pass))) {
      await this.outputPort.present(user.toSafeObject());
      return;
    }
    
    await this.outputPort.present(null);
  }
}