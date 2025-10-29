import { z } from "zod";

// Zod no expone un método z.email(); debe ser z.string().email()
export const EmailSchema = z.string().email({ message: "El formato del email es inválido" });

export class Email {
    private readonly value: string;

    private constructor(email: string) {
        this.value = email;
    }

    public static create(email: string): Email {
        if(!email) {
            throw new Error('Email cannot be empty');
        }

        // Validación básica de formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Invalid email format');
        }
        return new Email(email);
    }

    public getValue(): string {
        return this.value;
    }

    public equals(email?: Email): boolean {
        if(email === null || email === undefined){
            return false;
        }
        return this.value.toLowerCase() === email.value.toLowerCase();
    }

    public toString(): string {
        return this.value;
    }
}
