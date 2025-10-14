import { Inject, Injectable } from '@nestjs/common';
import {
  USER_REPOSITORY,
  type UserRepository,
  Email,
  User
} from '@repo/core'
import { ValidateUserInputPort } from './ports/input-port';


export type SafeUser = ReturnType<User['toSafeObject']>;

@Injectable()
export class ValidateUserUseCase implements ValidateUserInputPort {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(email: string, pass: string): Promise<SafeUser | null> {
    const user = await this.userRepository.findByEmail(Email.create(email));

    if (user && (await user.comparePassword(pass))) {
      
      return user.toSafeObject();
    }
    
    return null;
  }
}