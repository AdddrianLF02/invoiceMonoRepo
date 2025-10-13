import Link from 'next/link'
import { SignInForm } from '../../components/auth/login/SignInForm' 

export default function LoginPage() {
  return (
    <> {/* Fragmento para evitar duplicar la envoltura de layout */}
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-gray-900">
          Iniciar Sesión
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Accede a tu cuenta para gestionar tus facturas
        </p>
      </div>
      <SignInForm />
      <p className="mt-6 text-center text-sm text-gray-600">
        ¿No tienes una cuenta?{' '}
        <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
          Regístrate aquí
        </Link>
      </p>
    </>
  )
}