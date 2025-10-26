import { Inject, Injectable, Scope } from "@nestjs/common";
import { ValidateUserOutputPort, SafeUser } from "@repo/application";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import type { Response } from "express";

@Injectable({ scope: Scope.REQUEST })
export class ValidateUserPresenter implements ValidateUserOutputPort {
    constructor(
        @Inject('EXPRESS_RESPONSE') private readonly res: Response,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {}

    async present(safeUser: SafeUser | null): Promise<void> {
        // Verificar si ya se enviaron headers para evitar el error
        if (this.res.headersSent) {
            console.warn('Headers already sent, skipping response');
            return;
        }

        if (!safeUser) {
            this.res.status(401).json({ 
                message: 'Credenciales inválidas',
                error: 'Unauthorized'
            });
            return;
        }

        try {
            const jwtSecret = this.configService.get<string>('JWT_SECRET') || 'dev-secret-key-change-in-production';
            const jwtRefreshSecret = this.configService.get<string>('JWT_REFRESH_SECRET') || 'dev-refresh-secret-key-change-in-production';

            const [accessToken, refreshToken] = await Promise.all([
                this.jwtService.signAsync(
                    { sub: safeUser.id, email: safeUser.email },
                    { secret: jwtSecret, expiresIn: '15m' }
                ),
                this.jwtService.signAsync(
                    { sub: safeUser.id, email: safeUser.email },
                    { secret: jwtRefreshSecret, expiresIn: '7d' }
                )
            ]);

            // Verificar nuevamente antes de enviar la respuesta
            if (!this.res.headersSent) {
                this.res.status(200).json({
                    message: 'Login exitoso',
                    user: safeUser,
                    access_token: accessToken,
                    refresh_token: refreshToken
                });
            }
        } catch (error) {
            console.error('Error generating tokens:', error);
            if (!this.res.headersSent) {
                this.res.status(500).json({ 
                    message: 'Error interno del servidor',
                    error: 'Internal Server Error'
                });
            }
        }
    }
}