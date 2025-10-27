import { Inject } from "@nestjs/common";
import { GetUserProfileOutputPort, SafeUser } from "@repo/application";
import { type Response } from "express";

export class GetProfileUserPresenter implements GetUserProfileOutputPort {
    constructor(
        @Inject('EXPRESS_RESPONSE') private readonly res: Response
    ) {}

  async present(result: SafeUser | null): Promise<void> {
     // Evitar enviar respuesta si ya fue enviada
     if (this.res.headersSent) return;
     this.res.status(200).json(result);
  } 
}