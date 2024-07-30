'use client';

import { register } from '@/lib/api/auth.api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegistrationPage() {
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    try {
      const data = await register(formData);

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
        <div className="w-max text-xl">Registration</div>
        <form method="POST" action={handleSubmit} className="mt-6 text-sm">
          <label className="flex flex-col gap-1">
            Email
            <input
              name="email"
              type="email"
              className="rounded-sm bg-neutral-400 px-4 py-2 outline-none dark:bg-neutral-800"
              required
            />
          </label>
          <label className="mt-2 flex flex-col gap-1">
            <div className="flex items-center justify-between">Password</div>
            <input
              name="password"
              type="password"
              className="rounded-sm bg-neutral-400 px-4 py-2 outline-none dark:bg-neutral-800"
              required
            />
          </label>
          <label className="mt-2 flex flex-col gap-1">
            Username
            <input
              name="username"
              type="text"
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
            Sign up
          </button>

          <div className="mt-4 text-center font-light text-gray-300">
            <Link
              href={'/login'}
              className="border-gray-700 pb-1 text-base text-gray-700 hover:border-b 
              dark:border-gray-100 dark:text-neutral-100"
            >
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
