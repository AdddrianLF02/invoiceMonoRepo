"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerEntitySchema = void 0;
const zod_1 = require("zod");
const CustomerId_1 = require("../value-objects/CustomerId");
const Email_1 = require("../value-objects/Email");
const Address_1 = require("../value-objects/Address");
const TaxId_1 = require("../value-objects/TaxId");
exports.CustomerEntitySchema = zod_1.z.object({
    id: CustomerId_1.CustomerIdSchema,
    name: zod_1.z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    email: Email_1.EmailSchema,
    address: Address_1.AddressSchema,
    number: zod_1.z.string(), // O un schema más específico si tiene un formato
    taxId: TaxId_1.TaxIdSchema,
    active: zod_1.z.boolean(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
//# sourceMappingURL=Customer.schema.js.map