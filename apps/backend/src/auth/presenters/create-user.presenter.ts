import { Inject, Injectable, Scope } from "@nestjs/common";
import { CreateUserOutputPort } from "@repo/application";
import type { Response } from "express";
import { User } from "@repo/core";

@Injectable({ scope: Scope.REQUEST })
export class CreateUserPresenter implements CreateUserOutputPort {
    constructor(
        @Inject('EXPRESS_RESPONSE') private readonly res: Response
    ) {}

    present(user: User): void {
        // Evitar enviar respuesta si ya fue enviada
        if (this.res.headersSent) return;
        const safeUser = user.toSafeObject();
        this.res.status(201).json(safeUser);
    }
}