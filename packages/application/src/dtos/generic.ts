import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * DTO genérico para respuestas simples de la API.
 */
export class GenericResponseDto {
  @ApiProperty({ example: 'Operación realizada con éxito' })
  message!: string;

  @ApiPropertyOptional({ example: 'c1b2a3d4-e5f6-7890-1234-567890abcdef' })
  id?: string;
}
