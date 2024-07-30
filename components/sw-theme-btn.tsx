'use client';

import React, { useEffect, useState } from 'react';
import { IDarkMode, ILightMode } from './ui/icons';

interface Props {
  classnames?: string;
}

export const SwitchThemeButton: React.FC<Props> = ({ classnames }) => {
  const [mode, setMode] = useState('dark');
  const toggleTheme = () => {
    // const theme = window.matchMedia('(prefers-color-schema:dark)').matches
    //   ? 'dark'
    //   : 'light';

    const cookie = window.document.cookie.match(/themeMode=([a-z])\w+/g);
    let themeCookie = '';

    if (cookie) {
      themeCookie =
        cookie[0].split('=')[1] === 'dark'
          ? 'light'
          : cookie[0].split('=')[1] === 'light'
            ? 'dark'
            : 'dark';
    } else {
      // themeCookie =
      //   theme === 'dark' ? 'light' : theme === 'light' ? 'dark' : 'dark';
      themeCookie = 'dark';
    }

    const cl = window.document.documentElement.classList;
    cl.value = '';
    cl.add(themeCookie);
    window.document.cookie =
      'themeMode=' +
      themeCookie +
      ';Path=/; Expires=' +
      new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString() +
      '; SameSite=Lax';

    setMode(() => themeCookie);
  };

  useEffect(() => {
    const cookie = window.document.cookie.match(/themeMode=([a-z])\w+/g);
    if (!cookie) return;
    const themeCookie = cookie[0].split('=')[1] === 'dark' ? 'dark' : 'light';

    setMode(themeCookie);
  }, []);

  console.log('mode', mode);

  return (
    <div className="h-min w-min cursor-pointer" onClick={toggleTheme}>
      {mode === 'dark' ? (
        <ILightMode className="fill-sky-400" />
      ) : (
        <IDarkMode className={classnames} />
      )}
    </div>
  );
};
