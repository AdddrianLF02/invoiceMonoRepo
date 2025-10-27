import { Inject, Injectable, Scope } from "@nestjs/common";
import { ValidateUserOutputPort, SafeUser } from "@repo/application";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import type { Response } from "express";
import { REQUEST } from "@nestjs/core";

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
            console.warn('[Presenter] Headers already sent, skipping response');
            return;
        }

        if (!safeUser) {
            console.log('[Presenter] Invalid credentials, sending 401');
            this.res.status(401).json({ 
                message: 'Credenciales inválidas',
                error: 'Unauthorized'
            });
            return;
        }

        try {
            const jwtSecret = this.configService.get<string>('JWT_SECRET') || 'una-clave-secreta-muy-segura-en-desarrollo';
            const jwtRefreshSecret = this.configService.get<string>('JWT_REFRESH_SECRET') || 'una-clave-secreta-muy-segura-en-desarrollo-refresh';
            
            console.log('[Presenter] Using JWT secret for token generation:', jwtSecret.substring(0, 10) + '...');
            
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

            console.log('[Presenter] Tokens generated successfully');
            console.log('[Presenter] safeUser:', JSON.stringify(safeUser));

            // Verificar nuevamente antes de enviar la respuesta
            if (this.res.headersSent) {
                console.warn('[Presenter] Headers were sent during token generation, aborting response');
                return;
            }

            console.log('[Presenter] Sending 200 response...');
            this.res.status(200).json({
                message: 'Login exitoso',
                user: safeUser,
                access_token: accessToken,
                refresh_token: refreshToken
            });
            console.log('[Presenter] 200 response sent successfully.');
        } catch (error) {
            console.error('[Presenter] Error generating tokens:', error);
            
            // Verificar antes de enviar respuesta de error
            if (this.res.headersSent) {
                console.warn('[Presenter] Headers already sent, cannot send error response');
                return;
            }
            
            this.res.status(500).json({ 
                message: 'Error interno del servidor',
                error: 'Internal Server Error'
            });
        }
    }
}