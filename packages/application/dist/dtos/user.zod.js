"use strict";
// packages/application/src/dtos/user.zod.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserSchema = exports.CreateUserSchema = exports.LoginSchema = exports.UpdateUserDto = exports.CreateUserDto = exports.LoginDto = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const core_1 = require("@repo/core");
Object.defineProperty(exports, "LoginSchema", { enumerable: true, get: function () { return core_1.LoginSchema; } });
Object.defineProperty(exports, "CreateUserSchema", { enumerable: true, get: function () { return core_1.CreateUserSchema; } });
Object.defineProperty(exports, "UpdateUserSchema", { enumerable: true, get: function () { return core_1.UpdateUserSchema; } });
class LoginDto extends (0, nestjs_zod_1.createZodDto)(core_1.LoginSchema) {
}
exports.LoginDto = LoginDto;
class CreateUserDto extends (0, nestjs_zod_1.createZodDto)(core_1.CreateUserSchema) {
}
exports.CreateUserDto = CreateUserDto;
class UpdateUserDto extends (0, nestjs_zod_1.createZodDto)(core_1.UpdateUserSchema) {
}
exports.UpdateUserDto = UpdateUserDto;
//# sourceMappingURL=user.zod.js.map