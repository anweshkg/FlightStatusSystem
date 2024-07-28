"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, Menu, X } from "lucide-react";
import { useUserContext } from "@/context/UserContext";

export default function Navbar() {
  const { userData, setUserData } = useUserContext();
  const [notificationCount, setNotificationCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserData(null);
    router.push("/");
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-white text-xl font-bold">
                Flight Status System
              </span>
              <span className="text-indigo-200 text-sm ml-2">
                Indigo Hack To Hire '24 by Anwesh [anweshkg@gmail.com]
              </span>
            </Link>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-4">
            {userData && (
              <div className="relative">
                <Link
                  href="/notifications"
                  className="text-white hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <Bell size={20} />
                  {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {notificationCount}
                    </span>
                  )}
                </Link>
              </div>
            )}
            <NavLink href="/">Search Flights</NavLink>
            {userData ? (
              <>
                <NavLink href="/profile">Profile</NavLink>
                <button
                  onClick={handleLogout}
                  className="text-white hover:bg-indigo-500 hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink href="/login">Login</NavLink>
                <NavLink href="/register">Register</NavLink>
              </>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-indigo-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-800 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {userData && (
              <MobileNavLink href="/notifications">
                Notifications
                {notificationCount > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                    {notificationCount}
                  </span>
                )}
              </MobileNavLink>
            )}
            <MobileNavLink href="/">Search Flights</MobileNavLink>
            {userData ? (
              <>
                <MobileNavLink href="/profile">Profile</MobileNavLink>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:text-indigo-200 hover:bg-indigo-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <MobileNavLink href="/login">Login</MobileNavLink>
                <MobileNavLink href="/register">Register</MobileNavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="text-white hover:bg-indigo-500 hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-indigo-200 hover:bg-indigo-700"
    >
      {children}
    </Link>
  );
}
