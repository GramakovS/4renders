'use client';

import cl from 'clsx';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Home,
  Users,
  FileText,
  MessageCircle,
  Wifi,
  Menu,
  X
} from 'lucide-react';

const navigation = [
  { name: 'Home (SSG)', href: '/', icon: Home },
  { name: 'Users (SSR)', href: '/users', icon: Users },
  { name: 'Posts (CSR)', href: '/posts', icon: FileText },
  { name: 'Chat (ISR)', href: '/chat', icon: MessageCircle },
  { name: 'WebSocket', href: '/websocket', icon: Wifi },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <nav className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:z-40 bg-gradient-to-br from-blue-900 to-purple-900 text-white shadow-xl">
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-white/20">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
              4renders App
            </h1>
            <p className="text-sm text-blue-200 mt-1">
              Rendering Methods Showcase
            </p>
          </div>
          <div className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cl(
                    'flex items-center px-4 py-3 rounded-lg transition-all duration-200',
                    'hover:bg-white/10 hover:scale-[1.02]',
                    isActive
                      ? 'bg-white/20 text-white shadow-lg'
                      : 'text-blue-100 hover:text-white'
                  )}
                >
                  <item.icon
                    size={20}
                    className={cl(
                      'mr-3',
                      isActive ? 'text-blue-200' : 'text-blue-300'
                    )}
                  />
                  <span className="font-medium">{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="ml-auto w-2 h-2 bg-blue-300 rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="p-4 border-t border-white/20">
            <p className="text-xs text-blue-200 text-center mb-1">
              Next.js 4renders App
            </p>
            <p className="text-xs text-blue-200 text-center text-blue-400:hover">
              <Link href={'https://t.me/GSilver27'}
              >
                GSilver27
              </Link>
            </p>
          </div>
        </div>
      </nav>

      <motion.nav
        initial={false}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ type: 'spring', damping: 20 }}
        className="lg:hidden fixed inset-y-0 left-0 z-40 w-70 bg-gradient-to-br from-blue-900 to-purple-900 text-white shadow-xl"
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-white/20">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
              Next.js 4renders App
            </h1>
            <p className="text-sm text-blue-200 mt-1">
              Rendering Methods Showcase
            </p>
          </div>
          <div className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cl(
                    'flex items-center px-4 py-3 rounded-lg transition-all duration-200',
                    'hover:bg-white/10 hover:scale-[1.02]',
                    isActive
                      ? 'bg-white/20 text-white shadow-lg'
                      : 'text-blue-100 hover:text-white'
                  )}
                >
                  <item.icon
                    size={20}
                    className={cl(
                      'mr-3',
                      isActive ? 'text-blue-200' : 'text-blue-300'
                    )}
                  />
                  <span className="font-medium">{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="ml-auto w-2 h-2 bg-blue-300 rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="p-4 border-t border-white/20">
            <p className="text-xs text-blue-200 text-center">
              Next.js 4renders App
            </p>
            <p className="text-xs text-blue-200 text-center text-blue-400:hover">
              <Link href={'https://t.me/GSilver27'}
              >
                GSilver27
              </Link>
            </p>
          </div>
        </div>
      </motion.nav>
    </>
  );
}