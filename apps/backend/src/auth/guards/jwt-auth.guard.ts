import { AuthGuard } from "@nestjs/passport";
import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        // Añadir lógica personalizada aquí si es necesario
        return super.canActivate(context);
    }

    handleRequest(err, user , info) {
        // Puedes lanzar una excepción basada en "info" o "err"
        if(err || !user) {
            throw err || new UnauthorizedException('No se ha podido autenticar');
        }
        return user;
    }
}