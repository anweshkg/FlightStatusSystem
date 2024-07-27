'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
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
}