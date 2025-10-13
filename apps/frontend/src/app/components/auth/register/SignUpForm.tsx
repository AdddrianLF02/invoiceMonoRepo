// apps/frontend/src/app/components/auth/register/signup.tsx
'use client'

import { useFormState, useFormStatus } from 'react-dom' // Hooks de Server-Side Form Handling
import { useRouter } from 'next/navigation'
import { useActionState, useEffect } from 'react'
import { Button } from '../../ui/button' 
import { Input } from '../../ui/input'
import { Label } from '../../ui/label' // Usamos Label directamente
import { registerAction, FormState } from '../actions/auth'



// Componente de botón de envío del lado del cliente
function SubmitButton() {
    // 1. useFormStatus: Permite mostrar el estado de envío dentro del formulario de un Server Component
    const { pending } = useFormStatus()
    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending ? 'Registrando...' : 'Registrarse'}
        </Button>
    )
}

// Componente principal de formulario (Client Component para manejar el estado/redirección)
export function SignUpForm() {
    const router = useRouter()
    const initialState: FormState = {}

    // 2. useFormState: Conecta la Server Action con el estado del componente
    const [state, formAction] = useActionState(registerAction, initialState)

    // 3. useEffect: Maneja los efectos secundarios (redirección y notificaciones)
    useEffect(() => {
        if (state.success) {
            
            // Redirigir a dashboard o a donde el middleware de NextAuth proteja.
            router.replace('/dashboard'); 
        } else if (state.error) {
            
        }
    }, [state, router])

    return (
        // 4. Form Action: El formulario llama directamente a la Server Action `formAction`
        <form action={formAction} className="space-y-4">
            {/* Muestra un mensaje de error general (ej. email ya registrado) */}
            {state.error && !state.fields && <div className="text-red-500 text-sm text-center">{state.error}</div>}

            {/* Campo de Email */}
            <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input 
                    id="email" 
                    name="email" // Importante: Debe coincidir con formData.get('email')
                    placeholder="usuario@ejemplo.com" 
                    type="email"
                    required
                />
                {/* Mostrar error específico de campo, si existe */}
                {state.fields?.email && <p className="text-red-500 text-sm">{state.fields.email}</p>}
            </div>

            {/* Campo de Contraseña */}
            <div className="space-y-1">
                <Label htmlFor="password">Contraseña</Label>
                <Input 
                    id="password" 
                    name="password" // Importante: Debe coincidir con formData.get('password')
                    placeholder="••••••••" 
                    type="password" 
                    required
                />
                {state.fields?.password && <p className="text-red-500 text-sm">{state.fields.password}</p>}
            </div>

            {/* Campo de Confirmación de Contraseña */}
            <div className="space-y-1">
                <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                <Input 
                    id="confirmPassword" 
                    name="confirmPassword" // Importante: Debe coincidir con formData.get('confirmPassword')
                    placeholder="••••••••" 
                    type="password" 
                    required
                />
                {state.fields?.confirmPassword && <p className="text-red-500 text-sm">{state.fields.confirmPassword}</p>}
            </div>

            <SubmitButton />
        </form>
    )
}