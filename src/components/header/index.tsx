'use client';

import React from 'react';

import { SidebarTrigger } from '@/components/ui/sidebar';

const Header = () => {
  return (
    <header className="w-full p-4 bg-white shadow-md flex justify-between items-center">
      {/* 顶部导航栏 */}
      <nav className="flex space-x-4 items-center">
        <SidebarTrigger />
      </nav>
      <div className="flex space-x-4">
        <button>🔍</button>
        <button>🔔</button>
        <button>👤</button>
      </div>
    </header>
  );
};

export default Header;
