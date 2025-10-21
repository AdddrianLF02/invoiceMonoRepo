import { Inject, Injectable } from '@nestjs/common';
import { Email, type IUnitOfWork, User, UserRepository, CustomerRepository, UserId } from '@repo/core';
import { UpdateUserDto } from '../../dtos/user.zod';
import { UpdateUserInputPort } from './ports/input-port';
import { type UpdateUserOutputPort, UPDATE_USER_OUTPUT_TOKEN } from './ports/output-port';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UpdateUserUseCase implements UpdateUserInputPort {
  constructor(
    private readonly unitOfWork: IUnitOfWork,
    @Inject(UPDATE_USER_OUTPUT_TOKEN)
    private readonly outputPort: UpdateUserOutputPort,
  ) {}

  async execute(userId: string, input: UpdateUserDto): Promise<void> {
    const userRepository = this.unitOfWork.userRepository;
    const customerRepository = this.unitOfWork.customerRepository;
    
    // Buscar el usuario por ID
    const user = await userRepository.findById(UserId.fromString(userId));
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Verificar si hay cambio de email y si ya existe
    if (input.email && input.email !== user.getEmail().getValue()) {
      const existingUser = await userRepository.findByEmail(Email.create(input.email));
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
      updatedUser = updatedUser.updateEmail(Email.create(input.email));
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
            updatedCustomer = updatedCustomer.updateEmail(Email.create(input.email));
          }
          
          await customerRepository.update(updatedCustomer);
        }
      }
      
      // Presentar el resultado a través del puerto de salida
      this.outputPort.present(savedUser);
    });
  }
}