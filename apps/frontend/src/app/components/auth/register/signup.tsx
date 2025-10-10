"use client";

import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';
import { FormState } from '@/lib/validation';
import { signup } from '../actions/auth';
;

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Signing Up...' : 'Sign Up'}
    </button>
  );
}

export function SignupForm() {
  const initialState: FormState = { errors: {} };
  const [state, formAction] = useFormState(signup, initialState);

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" placeholder="Name" />
        {state?.errors?.name && <p style={{ color: 'red' }}>{state.errors.name.join(', ')}</p>}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="Email" required />
        {state?.errors?.email && <p style={{ color: 'red' }}>{state.errors.email.join(', ')}</p>}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" placeholder="Password" required />
        {state?.errors?.password && (
          <div style={{ color: 'red' }}>
            <p>Password must:</p>
            <ul>
              {state.errors.password.map((error) => (
                <li key={error}>- {error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {state?.errors?._form && <p style={{ color: 'red' }}>{state.errors._form.join(', ')}</p>}

      <SubmitButton />
      <p>
        Already have an account? <Link href="/login">Sign in</Link>
      </p>
    </form>
  );
}
