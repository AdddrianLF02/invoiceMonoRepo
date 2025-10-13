// apps/frontend/src/app/components/auth/actions/auth.ts
'use server';

import { RegisterSchema } from "@repo/application";
import { z } from "zod";
import { signIn } from "next-auth/react"; // Necesario para el auto-login

// Define el estado que devolverá la Server Action (para useFormState)
export interface FormState {
    error?: string;
    success?: string;
    fields?: { email?: string, password?: string, confirmPassword?: string };
}

// URL base de tu backend NestJS (debería estar en variables de entorno)
const BACKEND_URL = 'http://localhost:3000'; 

/**
 * Registra un nuevo usuario y, si tiene éxito, inicia sesión automáticamente.
 * @param prevState El estado previo (se ignora aquí, pero es requerido por useFormState).
 * @param formData Los datos del formulario enviados por el cliente.
 */
export async function registerAction(
    prevState: FormState,
    formData: FormData
): Promise<FormState> {
    const data = {
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
    };

    // 1. Validación del lado del servidor con Zod
    const validation = RegisterSchema.safeParse(data);
    if (!validation.success) {
        // Retornar errores específicos de Zod
        const fieldErrors = validation.error.flatten().fieldErrors;
        return { 
            error: 'Por favor, revisa los campos inválidos.', 
            fields: {
                email: fieldErrors.email?.[0],
                password: fieldErrors.password?.[0],
            }
        };
    }

    const { email, password } = validation.data;

    try {
        // 2. Llamada a la API de registro de NestJS
        const res = await fetch(`${BACKEND_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const responseBody = await res.json();

        // 3. Manejo de errores (ej. 409 Conflict - Email ya registrado)
        if (!res.ok) {
            if (res.status === 409) {
                return { error: 'El email ya está registrado.' };
            }
            return { error: responseBody.message || 'Error desconocido durante el registro.' };
        }

        // 4. Registro exitoso y auto-login usando NextAuth
        // Usamos signIn para iniciar la sesión con las credenciales recién registradas.
        const signInResult = await signIn("credentials", {
            email,
            password,
            redirect: false, // Controlamos la redirección manualmente
        });

        if (signInResult?.error) {
            return { error: 'Registro exitoso, pero el inicio de sesión automático falló. Intenta iniciar sesión manualmente.' };
        }

        // Si todo va bien, el componente de cliente gestionará el redirect.
        return { success: '¡Registro y sesión iniciada con éxito!' };

    } catch (error) {
        console.error('Error en registerAction:', error);
        return { error: 'Ocurrió un error inesperado en el servidor.' };
    }
}