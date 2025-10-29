import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsIn } from 'class-validator';

// Define los nombres válidos de las plantillas que aceptas
const validTemplateNames = ['classic', 'minimal', 'modern'];

export class GeneratePdfRequestDto {
  @ApiProperty({
    description: 'Nombre de la plantilla a usar para generar el PDF.',
    example: 'modern',
    enum: validTemplateNames, // Ayuda a Swagger UI
  })
  @IsNotEmpty({ message: 'El nombre de la plantilla no puede estar vacío.' })
  @IsString({ message: 'El nombre de la plantilla debe ser un texto.' })
  @IsIn(validTemplateNames, { message: 'Nombre de plantilla no válido.' }) // Valida contra la lista
  templateName: string;
}