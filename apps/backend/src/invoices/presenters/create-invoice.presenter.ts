import { Injectable, Scope, HttpStatus } from '@nestjs/common';
import { Response } from 'express'; // Importamos el tipo nativo de Express
import { Invoice } from '@repo/core';
import { CreateInvoiceOutputPort, InvoiceResponseDto } from '@repo/application';


/**
 * [CRÍTICO] Debe ser de Scope.REQUEST para manejar el estado 'responseManager'
 * de forma segura por cada petición concurrente.
 */
@Injectable({ scope: Scope.REQUEST })
export class CreateInvoicePresenter implements CreateInvoiceOutputPort {
  // Almacena el objeto Response nativo para la petición actual
  private responseManager: Response;

  /**
   * Método de Inicialización. Lo llama el Controller para transferir el control
   * del flujo de respuesta HTTP.
   */
  setResponseManager(res: Response): void {
    this.responseManager = res;
  }

  /**
   * Método del Output Port: Es llamado por el Caso de Uso.
   * Su responsabilidad es: Mapear la Entidad y ENVIAR la respuesta HTTP.
   */
  present(invoice: Invoice): void {
    if (!this.responseManager) {
        throw new Error('Response manager not initialized in presenter. Controller must call setResponseManager.');
    }
    
    // 1. Mapeo a View Model (Response DTO)
    const responseDto: InvoiceResponseDto = {
      id: invoice.getId().toString(),
      // ... mapeo de todos los Value Objects (Money, Status, etc.)
      total: invoice.getSubtotal().getAmountInCents(),
      issueDate: invoice.getIssueDate().toISOString().split('T')[0],
      // ...
    } as InvoiceResponseDto;

    // 2. Envío de Respuesta: El Presenter cierra el ciclo de I/O.
    this.responseManager.status(HttpStatus.CREATED).json(responseDto);
  }
}