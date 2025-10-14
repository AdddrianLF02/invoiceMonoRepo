import { User } from "@repo/core";
import { CreateUserDto } from "../../../dtos/user.zod";
import { SafeUser } from "../validate-user.use-case";
export interface CreateUserInputPort {
    execute(input: CreateUserDto): Promise<User>;
}
export interface ValidateUserInputPort {
    execute(email: string, password: string): Promise<SafeUser | null>;
}
//# sourceMappingURL=input-port.d.ts.map