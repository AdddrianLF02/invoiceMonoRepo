import { CreateUserDto, UpdateUserDto } from "../../../dtos/user.zod";
export declare const CREATE_USER_INPUT_TOKEN = "CREATE_USER_INPUT_TOKEN";
export interface CreateUserInputPort {
    execute(input: CreateUserDto): Promise<void>;
}
export declare const GET_USER_PROFILE_INPUT_TOKEN = "GET_USER_PROFILE_INPUT_TOKEN";
export interface GetUserProfileInputPort {
    execute(userId: string): Promise<void>;
}
export declare const VALIDATE_USER_INPUT_TOKEN = "VALIDATE_USER_INPUT_TOKEN";
export interface ValidateUserInputPort {
    execute(email: string, password: string): Promise<void>;
}
export declare const UPDATE_USER_INPUT_TOKEN = "UPDATE_USER_INPUT_TOKEN";
export interface UpdateUserInputPort {
    execute(userId: string, input: UpdateUserDto): Promise<void>;
}
//# sourceMappingURL=input-port.d.ts.map