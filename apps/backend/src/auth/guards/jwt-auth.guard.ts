import { AuthGuard } from "@nestjs/passport";
import { Injectable, ExecutionContext, UnauthorizedException, CanActivate } from '@nestjs/common';
import { Observable } from "rxjs";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        // Añadir lógica personalizada aquí si es necesario
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if(!token) {
            throw new UnauthorizedException('No se ha proporcionado un token');
        }
        try {
            const payload = this.jwtService.verifyAsync(token, {
                secret: process.env.jwtSecretKey
            });
            request['user'] = payload
        } catch (error) {
            throw new UnauthorizedException('Token inválido');
        }

        return true
    }

    private extractTokenFromHeader(request: Request): string | null {
        const [type, token] = request.headers.authorization?.split(' ') ?? []
        return type === 'Bearer' ? token : null;
    }

    handleRequest(err, user , info) {
        const reason = typeof info === 'string' ? info : info?.message;
        if(err || !user) {
            throw err || new UnauthorizedException(reason || 'No se ha podido autenticar');
        }
        return user;
    }
}