import { Inject, Injectable, Scope } from "@nestjs/common";
import { ValidateUserOutputPort, SafeUser } from "@repo/application";
import type { Response } from "express";
import { JwtService } from "@nestjs/jwt";

@Injectable({ scope: Scope.REQUEST })
export class ValidateUserPresenter implements ValidateUserOutputPort {
    constructor(
        @Inject('EXPRESS_RESPONSE') private readonly res: Response,
        private readonly jwtService: JwtService
    ) {}

    present(safeUser: SafeUser | null): void {
        if (!safeUser) {
            this.res.status(401).json({ message: 'Credenciales inválidas' });
            return;
        }

        const payload = { sub: safeUser.id, email: safeUser.email };
        const token = this.jwtService.sign(payload);
        
        this.res.status(200).json({
            access_token: token,
            user: safeUser
        });
    }
}