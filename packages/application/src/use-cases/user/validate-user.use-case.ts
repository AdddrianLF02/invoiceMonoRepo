import { Inject, Injectable } from '@nestjs/common';
import {
  USER_REPOSITORY,
  type UserRepository,
  Email,
  User
} from '@repo/core'
import { ValidateUserInputPort } from './ports/input-port';
import { VALIDATE_USER_OUTPUT_TOKEN, type ValidateUserOutputPort } from './ports/output-port';



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
      this.outputPort.present(user.toSafeObject());
      return;
    }
    
    this.outputPort.present(null);
  }
}