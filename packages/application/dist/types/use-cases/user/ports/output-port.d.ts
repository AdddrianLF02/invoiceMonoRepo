import { User } from "@repo/core";
export declare const CREATE_USER_OUTPUT_TOKEN = "CREATE_USER_OUTPUT_PORT";
export interface CreateUserOutputPort {
    present(result: User): void;
}
export type SafeUser = {
    id: string;
    name: string;
    email: string;
};
export declare const VALIDATE_USER_OUTPUT_TOKEN = "VALIDATE_USER_OUTPUT_PORT";
export interface ValidateUserOutputPort {
    present(result: SafeUser | null): void;
}
export declare const UPDATE_USER_OUTPUT_TOKEN = "UPDATE_USER_OUTPUT_PORT";
export interface UpdateUserOutputPort {
    present(result: User): void;
}
//# sourceMappingURL=output-port.d.ts.map