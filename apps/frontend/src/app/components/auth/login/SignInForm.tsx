"use client";

import { useActionState, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Label } from '@radix-ui/react-label';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';

export function SignInForm() {
  const router = useRouter();

  const handleSubmit = async (
    prevState: string | null | undefined,
    formData: FormData
  ): Promise<string | undefined> => {
    const result = await signIn('credentials', {
      redirect: false,
      email: formData.get('email'),
      pass: formData.get('pass'),
    });

    if (result?.error) {
      return 'Invalid credentials. Please try again.';
    } else if (result?.ok) {
      router.push('/dashboard');
    }
  };

  const [error, submitAction, isPending] = useActionState(
    handleSubmit,
    null
  );

  return (
    <form action={submitAction}>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input 
          id="email" 
          name="email" 
          type="email" 
          placeholder="Email" 
          required 
        />
      </div>
      <div>
        <Label htmlFor="pass">Password</Label>
        <Input 
          id="pass" 
          name="pass" 
          type="password" 
          placeholder="Password" 
          required
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Button className='my-2' type="submit" disabled={isPending}>
        {isPending ? 'Iniciando sesión...' : 'Sign In'}
      </Button>
      <p>
        Don't have an account? <Link href="/register"><span className='text-purple-500'>Sign up</span></Link>
      </p>
    </form>
  );
}