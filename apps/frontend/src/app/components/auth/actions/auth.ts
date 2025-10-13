'use server';

import { RegisterSchema } from "@repo/application";
import { z } from "zod";

// Tipo compartido
export interface FormState {
  success?: boolean;
  error?: string;
  fields?: {
    email?: string;
    password?: string;
    name?: string;
    confirmPassword?: string;
  };
  data?: {
    email: string;
    password: string;
  };
}

const BACKEND_URL = 'http://localhost:3000';

export async function registerAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const data = {
    name: String(formData.get('name') || ''),
    email: String(formData.get('email') || ''),
    password: String(formData.get('password') || ''),
    confirmPassword: String(formData.get('confirmPassword') || ''),
  };

  const validation = RegisterSchema.safeParse(data);
  if (!validation.success) {
    const fieldErrors = validation.error.flatten().fieldErrors;

    return {
      error: fieldErrors.confirmPassword?.includes('Las contraseñas no coinciden.')
        ? 'Las contraseñas no coinciden.'
        : 'Por favor, revisa los campos inválidos.',
      fields: {
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
        confirmPassword: fieldErrors.confirmPassword?.[0],
      }
    };
  }

  const { name, email, password } = validation.data;

  try {
    const res = await fetch(`${BACKEND_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const responseBody = await res.json();

    if (!res.ok) {
      if (res.status === 409) {
        return { error: 'El email ya está registrado.' };
      }
      return { error: responseBody.message || 'Error desconocido durante el registro.' };
    }

    console.log("✅ Registro exitoso en backend:", { name, email });

    // ✅ Devuelve la data al componente cliente para que haga el signIn
    return {
      success: true,
      data: { email, password }
    };

  } catch (error) {
    console.error('❌ Error en registerAction:', error);
    return { error: 'Ocurrió un error inesperado en el servidor.' };
  }
}
