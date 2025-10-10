import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(Error) // Captura todos los errores genéricos
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Ha ocurrido un error inesperado en el servidor.';

    // Creamos reglas para nuestros errores de dominio
    if (exception.message.includes('no encontrado')) {
      status = HttpStatus.NOT_FOUND;
      message = exception.message;
    } else if (exception.message.includes('ya existe') || exception.message.includes('ya está en uso')) {
      status = HttpStatus.CONFLICT; // 409 Conflict es mejor para duplicados
      message = exception.message;
    } else if (exception instanceof HttpException) {
        // Si ya es una excepción HTTP, la respetamos
        status = exception.getStatus();
        message = exception.message;
    }

    response
      .status(status)
      .json({
        statusCode: status,
        message: message,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}