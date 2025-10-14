import { User } from "@repo/core";
export interface CreateUserOutputPort {
    handle(result: User): void;
}
export type SafeUser = {
    id: string;
    name: string;
    email: string;
};
export interface ValidateUserOutputPort {
    handle(result: SafeUser | null): void;
}
//# sourceMappingURL=output-port.d.ts.map