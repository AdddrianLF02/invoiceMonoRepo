import { Customer } from "@repo/core";
import { CustomerResponseSwaggerDto } from "../dtos/response/customer-swagger-response.dto";

export class CustomerMapper {
    static toResponse(customer: Customer): CustomerResponseSwaggerDto {
        return {
            id: customer.getId().toString(),
            userId: customer.getUserId().toString(),
            name: customer.getName(),
            email: customer.getEmail().getValue(),
            number: customer.getNumber(),
            street: customer.getAddress().getStreet(),
            city: customer.getAddress().getCity(),
            postalCode: customer.getAddress().getPostalCode(),
            country: customer.getAddress().getCountry(),
            taxId: customer.getTaxId()?.getValue(),
            taxIdType: customer.getTaxId?.().getType() ?? undefined,
            isActive: customer.isActive(),
            createdAt: customer.getCreatedAt().toISOString(),
            updatedAt: customer.getUpdatedAt().toISOString(),
        }
    }
}