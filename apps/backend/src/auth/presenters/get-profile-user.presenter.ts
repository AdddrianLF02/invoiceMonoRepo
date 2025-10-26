import { Inject } from "@nestjs/common";
import { GetUserProfileOutputPort, SafeUser } from "@repo/application";
import { type Response } from "express";

export class GetProfileUserPresenter implements GetUserProfileOutputPort {
    constructor(
        @Inject('EXPRESS_RESPONSE') private readonly res: Response
    ) {}

  async present(result: SafeUser | null): Promise<void> {
     this.res.status(200).json(result);
  } 
}