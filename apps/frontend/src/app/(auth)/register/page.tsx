import { SignUpForm } from '../../components/auth/register/SignUpForm' // Ajustar ruta de importación
import Link from 'next/link'

export default function RegisterPage() {
  return (
    <> {/* Fragmento para evitar duplicar la envoltura de layout */}
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-gray-900">
          Crear una cuenta nueva
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Únete a nuestra plataforma para empezar a crear facturas
        </p>
      </div>
      <SignUpForm />
      <p className="mt-6 text-center text-sm text-gray-600">
        ¿Ya tienes una cuenta?{' '}
        <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
          Iniciar Sesión
        </Link>
      </p>
    </>
  )
}