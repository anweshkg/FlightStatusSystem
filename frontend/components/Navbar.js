'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bell } from 'lucide-react';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    router.push('/');
  };

  return (
    <nav className="bg-indigo-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold">
          Flight Status System - Hack To Hire 24
        </Link>
        <div className="space-x-4">
          <Link href="/" className="text-white hover:text-indigo-200">
            Home
          </Link>
          {isLoggedIn ? (
            <>
              <Link href="/profile" className="text-white hover:text-indigo-200">
                Profile
              </Link>
              <div className="relative inline-block">
                <Link href="/notifications" className="text-white hover:text-indigo-200 relative">
                  <Bell size={17} />
                </Link>
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </div>
              <button onClick={handleLogout} className="text-white hover:text-indigo-200">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-white hover:text-indigo-200">
                Login
              </Link>
              <Link href="/register" className="text-white hover:text-indigo-200">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};