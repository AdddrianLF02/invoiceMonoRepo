import { ApiProperty } from '@nestjs/swagger';

class AddressItemDto {
  @ApiProperty()
  street!: string;

  @ApiProperty()
  city!: string;

  @ApiProperty()
  postalCode!: string;

  @ApiProperty()
  country!: string;
}

export class CustomerResponseSwaggerDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef' })
  id!: string;

  @ApiProperty()
  userId!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty({ required: false })
  number?: string;

  @ApiProperty({ type: AddressItemDto })
  street!: string;

  @ApiProperty()
  city!: string;

  @ApiProperty()
  postalCode!: string;

  @ApiProperty()
  country!: string;

  @ApiProperty({ required: false })
  taxId?: string;

  @ApiProperty({ required: false })
  taxIdType?: string;

  @ApiProperty()
  isActive!: boolean;

  @ApiProperty()
  createdAt!: string;

  @ApiProperty()
  updatedAt!: string;
}
