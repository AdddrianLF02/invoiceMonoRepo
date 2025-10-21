"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserUseCase = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@repo/core");
const output_port_1 = require("./ports/output-port");
const bcrypt = __importStar(require("bcrypt"));
let UpdateUserUseCase = class UpdateUserUseCase {
    unitOfWork;
    outputPort;
    constructor(unitOfWork, outputPort) {
        this.unitOfWork = unitOfWork;
        this.outputPort = outputPort;
    }
    async execute(userId, input) {
        const userRepository = this.unitOfWork.userRepository;
        const customerRepository = this.unitOfWork.customerRepository;
        // Buscar el usuario por ID
        const user = await userRepository.findById(core_1.UserId.fromString(userId));
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        // Verificar si hay cambio de email y si ya existe
        if (input.email && input.email !== user.getEmail().getValue()) {
            const existingUser = await userRepository.findByEmail(core_1.Email.create(input.email));
            if (existingUser) {
                throw new Error('El email ya está en uso');
            }
        }
        // Verificar contraseña actual si se está cambiando la contraseña
        if (input.password) {
            const isPasswordValid = await user.comparePassword(input.currentPassword);
            if (!isPasswordValid) {
                throw new Error('La contraseña actual es incorrecta');
            }
        }
        // Actualizar el usuario
        let updatedUser = user;
        if (input.name) {
            updatedUser = updatedUser.updateName(input.name);
        }
        if (input.email) {
            updatedUser = updatedUser.updateEmail(core_1.Email.create(input.email));
        }
        if (input.password) {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(input.password, salt);
            updatedUser = updatedUser.updatePassword(hashedPassword);
        }
        // Guardar los cambios del usuario
        await this.unitOfWork.executeTransaction(async () => {
            const savedUser = await userRepository.update(updatedUser);
            // Si se solicita actualizar la información del cliente asociado
            if (input.updateCustomerInfo && (input.name || input.email)) {
                const customers = await customerRepository.findByUserId(savedUser.getId());
                const customer = customers.length > 0 ? customers[0] : null;
                if (customer) {
                    let updatedCustomer = customer;
                    if (input.name) {
                        updatedCustomer = updatedCustomer.updateName(input.name);
                    }
                    if (input.email) {
                        updatedCustomer = updatedCustomer.updateEmail(core_1.Email.create(input.email));
                    }
                    await customerRepository.update(updatedCustomer);
                }
            }
            // Presentar el resultado a través del puerto de salida
            this.outputPort.present(savedUser);
        });
    }
};
exports.UpdateUserUseCase = UpdateUserUseCase;
exports.UpdateUserUseCase = UpdateUserUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(output_port_1.UPDATE_USER_OUTPUT_TOKEN)),
    __metadata("design:paramtypes", [Object, Object])
], UpdateUserUseCase);
//# sourceMappingURL=update-user.use-case.js.map