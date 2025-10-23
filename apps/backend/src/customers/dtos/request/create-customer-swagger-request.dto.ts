import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested, IsOptional } from 'class-validator';

class AddressItemDto {
  @ApiProperty({ example: 'Calle Falsa 123' })
  street!: string;

  @ApiProperty({ example: 'Springfield' })
  city!: string;

  @ApiProperty({ example: '12345' })
  postalCode!: string;

  @ApiProperty({ example: 'ES' })
  country!: string;
}

export class CreateCustomerSwaggerRequestDto {
  @ApiProperty()
  name!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  number?: string;

  @ApiProperty({ type: AddressItemDto, required: true })
  @ValidateNested()
  @Type(() => AddressItemDto)
  address!: AddressItemDto;

  @ApiProperty({ required: false })
  @IsOptional()
  taxId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  taxIdType?: string;
}
