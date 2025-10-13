"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const result = await signIn('credentials', {
      redirect: false, // No redirigir automáticamente
      email,
      password,
    });

    setIsSubmitting(false);

    if (result?.error) {
      setError("Invalid credentials. Please try again.");
    } else if (result?.ok) {
      // Redirigir al dashboard en caso de éxito
      router.push('/dashboard');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input 
          id="email" 
          name="email" 
          type="email" 
          placeholder="Email" 
          required 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input 
          id="password" 
          name="password" 
          type="password" 
          placeholder="Password" 
          required 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Iniciando sesión...' : 'Sign In'}
      </button>
      <p>
        Don't have an account? <Link href="/register">Sign up</Link>
      </p>
    </form>
  );
}