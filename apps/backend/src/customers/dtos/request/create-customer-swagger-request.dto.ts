import { ApiProperty } from '@nestjs/swagger';
import { CreateCustomerDto } from '@repo/application';
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

export class CreateCustomerSwaggerRequestDto implements CreateCustomerDto {
  @ApiProperty()
  userId!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty({ required: false })
  number?: string;

  @ApiProperty({ type: AddressItemDto, required: false })
  @ValidateNested()
  @Type(() => AddressItemDto)
  @IsOptional()
  street?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  city?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  postalCode?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  country?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  taxId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  taxIdType?: string;
}
