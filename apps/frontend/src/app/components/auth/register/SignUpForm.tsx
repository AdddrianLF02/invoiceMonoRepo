'use client'

import { useFormStatus } from 'react-dom'
import { useRouter } from 'next/navigation'
import { useActionState, useEffect } from 'react'
import { signIn } from 'next-auth/react' // ← IMPORTANTE
import { Button } from '../../ui/button' 
import { Input } from '../../ui/input'
import { Label } from '../../ui/label'
import { registerAction, FormState } from '../actions/auth'

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending ? 'Registrando...' : 'Registrarse'}
        </Button>
    )
}

export function SignUpForm() {
    const router = useRouter()
    const initialState: FormState = {}

    const [state, formAction] = useActionState(registerAction, initialState)

    // ⚠️ Aquí movemos el signIn al cliente (evita error de "window is not defined")
   useEffect(() => {
  const autoLogin = async () => {
    if (state.success && state.data) {
      const result = await signIn("credentials", {
        email: state.data.email,
        password: state.data.password,
        redirect: true,
        callbackUrl: "/dashboard"
      });

      if (!result?.ok) {
        console.error("Auto-login falló después del registro.");
      }
    }
  };

  autoLogin();
}, [state, router]);


    return (
        <form action={formAction} className="space-y-4">
            {state.error && !state.fields && (
                <div className="text-red-500 text-sm text-center">{state.error}</div>
            )}

            {/* Nombre */}
            <div className="space-y-1">
                <Label htmlFor="name">Nombre</Label>
                <Input 
                    id="name" 
                    name="name" 
                    placeholder="Tu nombre completo" 
                    type="text" 
                    required 
                />
                {state.fields?.name && (
                    <p className="text-red-500 text-sm">{state.fields.name}</p>
                )}
            </div>

            {/* Email */}
            <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input 
                    id="email" 
                    name="email" 
                    placeholder="usuario@ejemplo.com" 
                    type="email"
                    required
                />
                {state.fields?.email && (
                    <p className="text-red-500 text-sm">{state.fields.email}</p>
                )}
            </div>

            {/* Contraseña */}
            <div className="space-y-1">
                <Label htmlFor="password">Contraseña</Label>
                <Input 
                    id="password" 
                    name="password" 
                    placeholder="••••••••" 
                    type="password" 
                    required
                />
                {state.fields?.password && (
                    <p className="text-red-500 text-sm">{state.fields.password}</p>
                )}
            </div>

            {/* Confirmación */}
            <div className="space-y-1">
                <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                <Input 
                    id="confirmPassword" 
                    name="confirmPassword" 
                    placeholder="••••••••" 
                    type="password" 
                    required
                />
                {state.fields?.confirmPassword && (
                    <p className="text-red-500 text-sm">{state.fields.confirmPassword}</p>
                )}
            </div>

            <SubmitButton />
        </form>
    )
}
