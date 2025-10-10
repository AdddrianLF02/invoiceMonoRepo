import { User } from "../entities/User";
import { Email } from "../value-objects/Email";

export interface UserRepository {
    create(user: User): Promise<User>;
    findByEmail(email: Email): Promise<User | null>;
}