import Link from 'next/link';
import React from 'react';
import { SwitchThemeButton } from './sw-theme-btn';

interface navbarProps {}

export const Navbar: React.FC<navbarProps> = ({}) => {
  return (
    <header
      className="sticky1 top-0 z-50 border-b border-neutral-200
               bg-stone-100 dark:border-neutral-800 dark:bg-neutral-900"
    >
      <div className="flex items-center gap-5">
        <SwitchThemeButton />
        <Link
          className="rounded-md bg-gray-300 px-3 py-1 hover:bg-sky-400 hover:text-white dark:bg-neutral-800"
          href={`/login`}
        >
          Sign In
        </Link>
      </div>
    </header>
  );
};
