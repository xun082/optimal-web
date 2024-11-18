'use client';

import React from 'react';
import { useTheme } from 'next-themes';

import { SidebarTrigger } from '@/components/ui/sidebar';

const Header = () => {
  const { setTheme, theme } = useTheme();

  const switchTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <header className="w-full p-4 shadow-md flex justify-between items-center">
      {/* 顶部导航栏 */}
      <nav className="flex space-x-4 items-center">
        <SidebarTrigger />
      </nav>
      <div className="flex space-x-4">
        <button onClick={switchTheme}>切</button>
        <button>🔍</button>
        <button>🔔</button>
        <button>👤</button>
      </div>
    </header>
  );
};

export default Header;
