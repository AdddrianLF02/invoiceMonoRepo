import { CreateUserDto, UpdateUserDto } from "../../../dtos/user.zod";

// CREATE
export const CREATE_USER_INPUT_TOKEN = "CREATE_USER_INPUT_TOKEN";
export interface CreateUserInputPort {
  execute(input: CreateUserDto): Promise<void>;
}

// VALIDATE
export const VALIDATE_USER_INPUT_TOKEN = "VALIDATE_USER_INPUT_TOKEN";
export interface ValidateUserInputPort {
  execute(email: string, password: string): Promise<void>;
}

// UPDATE
export const UPDATE_USER_INPUT_TOKEN = "UPDATE_USER_INPUT_TOKEN";
export interface UpdateUserInputPort {
  execute(userId: string, input: UpdateUserDto): Promise<void>;
}