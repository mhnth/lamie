'use client';

import { login } from '@/lib/api/auth.api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    try {
      const data = await login(formData);

      if (data?.error) {
        setError(data.error);
      } else {
        router.push('/');
      }
    } catch (error) {
      console.log('ERR handle register submit:', error);
    }
  };

  return (
    <>
      <div className="mx-auto mt-8 w-full max-w-sm rounded-md bg-neutral-100 p-6 dark:bg-neutral-900">
        <div className="w-max text-xl">Log in</div>
        <form
          method="POST"
          action={handleSubmit}
          className="mt-6 max-w-sm text-sm"
        >
          <label className="flex flex-col gap-1">
            Email
            <input
              name="email"
              type="email"
              className="rounded-sm bg-neutral-400 px-4 py-2 outline-none dark:bg-neutral-800"
              required
            />
          </label>
          <label htmlFor="" className="mt-2 flex flex-col gap-1">
            <div className="flex items-center justify-between">
              Password
              <Link
                href={'/'}
                className="block text-right font-light text-teal-500 hover:text-teal-400"
              >
                Forgot?
              </Link>
            </div>
            <input
              name="password"
              type="password"
              className="rounded-sm bg-neutral-400 px-4 py-2 outline-none dark:bg-neutral-800"
              required
            />
          </label>

          {error && (
            <div className="mt-4 rounded-sm border border-red-400 bg-red-200 p-4 text-sm text-red-800">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="mt-6 w-full rounded-sm bg-gradient-to-r from-teal-300 
            to-teal-500 py-2 text-center text-teal-950 hover:to-teal-300"
          >
            Sign in
          </button>

          <div className="mt-4 text-center font-light text-gray-300">
            <Link
              href={'/register'}
              className="border-gray-700 pb-1 text-base text-gray-700 hover:border-b 
              dark:border-gray-100 dark:text-neutral-100"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
