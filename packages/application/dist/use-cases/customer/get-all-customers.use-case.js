"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllCustomersUseCase = void 0;
const core_1 = require("@repo/core");
class GetAllCustomersUseCase {
    uow;
    outputPort;
    constructor(uow, outputPort) {
        this.uow = uow;
        this.outputPort = outputPort;
    }
    async execute(userId) {
        const uid = core_1.UserId.fromString(userId);
        const customers = await this.uow.customerRepository.findByUserId(uid);
        this.outputPort.present(customers);
    }
}
exports.GetAllCustomersUseCase = GetAllCustomersUseCase;
//# sourceMappingURL=get-all-customers.use-case.js.map