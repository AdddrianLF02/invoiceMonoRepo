import { Injectable, ExecutionContext, UnauthorizedException, CanActivate } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from '@nestjs/config';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { Logger } from '@nestjs/common'; // <-- Importa Logger

@Injectable()
export class AuthGuard implements CanActivate {
    private readonly logger = new Logger(AuthGuard.name); // <-- Añade una instancia de Logger
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector,
        private configService: ConfigService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // Verificar si la ruta es pública
        
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        const request = context.switchToHttp().getRequest();
        this.logger.debug(`Ruta: ${request.url} - ¿Es Pública?: ${isPublic}`);

        if (isPublic) {
            return true;
        }

        const token = this.extractTokenFromHeader(request);
        if (!token) {
            this.logger.warn('No se ha proporcionado un token en la solicitud');
            throw new UnauthorizedException('No se ha proporcionado un token');
        }
        

        try {
           
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get<string>('JWT_SECRET') || 'una-clave-secreta-muy-segura-en-desarrollo'
            });
            
            request['user'] = payload;
            this.logger.debug('[AuthGuard] Token verified successfully, payload:', { sub: payload.sub, email: payload.email });
        } catch (error) {
            const err = error as Error;
            console.log('[AuthGuard] Token verification failed:', err.message);
            throw new UnauthorizedException('Token inválido');
        }

        return true;
    }

    private extractTokenFromHeader(request: Request): string | null {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : null;
    }
}