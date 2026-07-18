"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Terminal,
  Compass,
  Cpu,
  Menu,
  X,
  LogOut,
  UserPlus,
  KeyRound,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [auth, setAuth] = useState({ isLoggedIn: false });

  const loggedOutRoutes = [
    { label: "Home", path: "/", icon: Terminal },
    { label: "Explore", path: "/projects", icon: Compass },
    { label: "About", path: "/about", icon: Cpu },
  ];

  const loggedInRoutes = [
    { label: "Dashboard", path: "/", icon: Terminal },
    { label: "Explore", path: "/projects", icon: Compass },
    { label: "Post", path: "/items/add" },
    { label: "Manage", path: "/items/manage" },
    { label: "AI Insights", path: "/ai-analyzer" },
  ];

  const activeRoutes = auth.isLoggedIn ? loggedInRoutes : loggedOutRoutes;

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#0A0D14]/70 backdrop-blur-md border-b border-white/[0.05] text-white transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 text-md font-semibold tracking-tight"
          >
            <span className="p-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-400 animate-pulse">
              <Cpu className="w-4 h-4" />
            </span>
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              DevAgent
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {activeRoutes.map((route) => {
              const Icon = route.icon;
              const isActive = pathname === route.path;
              return (
                <Link
                  key={route.path}
                  href={route.path}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium tracking-wide transition-all duration-150 ${
                    isActive
                      ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.1)]"
                      : "text-gray-400 hover:text-gray-200 hover:bg-white/[0.03]"
                  }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  <span>{route.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            {auth.isLoggedIn ? (
              <button
                onClick={() => setAuth({ isLoggedIn: false })}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-md text-xs bg-red-950/30 border border-red-500/20 text-red-400 hover:bg-red-900/30 transition-all"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Exit</span>
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-md text-xs text-gray-400 hover:text-white hover:bg-white/[0.03] transition-all"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </Link>
                <Link
                  href="/register"
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-md text-xs bg-cyan-600 border border-cyan-500/30 text-white hover:bg-cyan-500 transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1 text-gray-400 hover:text-white"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0A0D14] border-t border-white/[0.05] px-4 py-3 space-y-1">
          {activeRoutes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md text-sm ${
                pathname === route.path
                  ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                  : "text-gray-400 hover:bg-white/[0.03]"
              }`}
            >
              {route.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-white/[0.05] space-y-1">
            {auth.isLoggedIn ? (
              <button
                onClick={() => {
                  setAuth({ isLoggedIn: false });
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-center space-x-1 px-3 py-2 rounded-md text-sm bg-red-950/30 text-red-400"
              >
                <LogOut className="w-4 h-4" />
                <span>Exit Workspace</span>
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="block text-center px-3 py-2 rounded-md text-sm text-gray-400 hover:bg-white/[0.03]"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="block text-center px-3 py-2 rounded-md text-sm bg-cyan-600 text-white"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
