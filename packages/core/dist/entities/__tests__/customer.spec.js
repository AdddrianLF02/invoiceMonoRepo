"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Customer_1 = require("../Customer");
const CustomerId_1 = require("../../value-objects/CustomerId");
const Email_1 = require("../../value-objects/Email");
const Address_1 = require("../../value-objects/Address");
const TaxId_1 = require("../../value-objects/TaxId");
const UserId_1 = require("../../value-objects/UserId");
describe('Customer Entity', () => {
    const validUserId = UserId_1.UserId.create();
    const validEmail = Email_1.Email.create('test@example.com');
    const validAddress = Address_1.Address.create('123 Main St', 'Anytown', '12345', 'USA');
    const validTaxId = TaxId_1.TaxId.create('B12345678');
    const validName = 'Test Customer';
    const validCustomerNumber = 'CUST-001';
    it('should create a Customer instance with valid data', () => {
        const customer = Customer_1.Customer.create(validUserId, validName, validEmail, validAddress, validCustomerNumber, validTaxId);
        expect(customer).toBeInstanceOf(Customer_1.Customer);
        expect(customer.getId()).toBeInstanceOf(CustomerId_1.CustomerId);
        expect(customer.getUserId()).toBe(validUserId);
        expect(customer.getName()).toBe(validName);
        expect(customer.getEmail()).toBe(validEmail);
        expect(customer.getAddress()).toBe(validAddress);
        expect(customer.getNumber()).toBe(validCustomerNumber);
        expect(customer.getTaxId()).toBe(validTaxId);
        expect(customer.getActive()).toBe(true);
        expect(customer.getCreatedAt()).toBeInstanceOf(Date);
        expect(customer.getUpdatedAt()).toBeInstanceOf(Date);
    });
    it('should throw an error if name is empty during creation', () => {
        expect(() => Customer_1.Customer.create(validUserId, '', validEmail, validAddress, validCustomerNumber, validTaxId)).toThrow('Customer name cannot be empty');
    });
    it('should return a new instance with updated details when update methods are called', () => {
        const initialCustomer = Customer_1.Customer.create(validUserId, validName, validEmail, validAddress, validCustomerNumber, validTaxId);
        const initialUpdatedAt = initialCustomer.getUpdatedAt();
        const newName = 'Updated Customer';
        const newEmail = Email_1.Email.create('updated@example.com');
        const newAddress = Address_1.Address.create('456 New Ave', 'Newville', '67890', 'Canada');
        const newTaxId = TaxId_1.TaxId.create('A87654321');
        const newNumber = 'CUST-002';
        const updatedCustomer = initialCustomer
            .updateName(newName)
            .updateEmail(newEmail)
            .updateAddress(newAddress)
            .updateTaxId(newTaxId)
            .updateNumber(newNumber);
        expect(updatedCustomer).not.toBe(initialCustomer);
        expect(updatedCustomer.getId()).toBe(initialCustomer.getId());
        expect(updatedCustomer.getUserId()).toBe(initialCustomer.getUserId());
        expect(updatedCustomer.getName()).toBe(newName);
        expect(updatedCustomer.getEmail()).toBe(newEmail);
        expect(updatedCustomer.getAddress()).toBe(newAddress);
        expect(updatedCustomer.getTaxId()).toBe(newTaxId);
        expect(updatedCustomer.getNumber()).toBe(newNumber);
        expect(updatedCustomer.getUpdatedAt().getTime()).toBeGreaterThan(initialUpdatedAt.getTime());
    });
    it('should correctly activate and deactivate a customer', () => {
        const customer = Customer_1.Customer.create(validUserId, validName, validEmail, validAddress, validCustomerNumber, validTaxId);
        const deactivated = customer.deactivate();
        expect(deactivated.getActive()).toBe(false);
        const reactivated = deactivated.activate();
        expect(reactivated.getActive()).toBe(true);
    });
    it('should throw if updateName receives invalid data', () => {
        const customer = Customer_1.Customer.create(validUserId, validName, validEmail, validAddress, validCustomerNumber, validTaxId);
        expect(() => customer.updateName('')).toThrow();
    });
});
//# sourceMappingURL=customer.spec.js.map