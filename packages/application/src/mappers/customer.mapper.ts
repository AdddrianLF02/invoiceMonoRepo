
// import { Customer } from 'src/domain/entities/Customer';
// import { Injectable } from '@nestjs/common';
// import { CustomerResponseDto } from '../dtos/customer.zod';

// @Injectable()
// export class CustomerMapper {
//   /**
//    * Convierte una entidad Customer del dominio a un DTO
//    */
//   toDto(customer: Customer): CustomerResponseDto {
//     return {
//       id: customer.getId().getValue(),
//       name: customer.getName(),
//       email: customer.getEmail().getValue(),
//       number: customer.getNumber(),
//       street: customer.getAddress()?.getStreet(),
//       city: customer.getAddress()?.getCity(),
//       postalCode: customer.getAddress()?.getPostalCode(),
//       country: customer.getAddress()?.getCountry(),
//       taxId: customer.getTaxId()?.getValue(),
//       taxIdType: customer.getTaxId()?.getType(),  
//       isActive: customer.isActive(),
//       createdAt: customer.getCreatedAt().toISOString(),
//       updatedAt: customer.getUpdatedAt().toISOString(),
//     };
//   }
// }