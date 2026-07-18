"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client"; // 🌟 ইম্পোর্ট পাথ আপডেট করে @/lib/auth-client করা হলো
import { toast } from "sonner";
import {
  Terminal,
  Compass,
  Cpu,
  Menu,
  X,
  LogOut,
  UserPlus,
  KeyRound,
  FilePlus,
  Settings,
  User,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // 🔒 Better Auth থেকে রিয়েল-টাইম সেশন ডাটা রিড করা
  const { data: session, isPending } = authClient.useSession();
  const isLoggedIn = !!session;

  // 🚪 লগআউট হ্যান্ডলার
  const handleSignOut = async () => {
    toast.loading("Ending workspace session...");
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.dismiss();
          toast.success("Logged out successfully. Safe travels!");
          setIsOpen(false);
          router.push("/login");
        },
      },
    });
  };

  // 🏠 লগআউট থাকা অবস্থায় রুটস (৩টি রাউট)
  const loggedOutRoutes = [
    { label: "Home", path: "/", icon: Terminal },
    { label: "Explore", path: "/projects", icon: Compass },
    { label: "About", path: "/about", icon: Cpu },
  ];

  // 🛡️ লগইন থাকা অবস্থায় রুটস (কমপক্ষে ৫টি ফিচার রাউটের অংশ)
  const loggedInRoutes = [
    { label: "Dashboard", path: "/", icon: Terminal },
    { label: "Explore", path: "/projects", icon: Compass },
    { label: "Post Brief", path: "/items/add", icon: FilePlus },
    { label: "Manage", path: "/items/manage", icon: Settings },
  ];

  const activeRoutes = isLoggedIn ? loggedInRoutes : loggedOutRoutes;

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#0A0D14]/70 backdrop-blur-md border-b border-white/[0.05] text-white transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* 🚀 Brand Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 text-md font-semibold tracking-tight"
          >
            <span className="p-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-400">
              <Cpu className="w-4 h-4 animate-pulse" />
            </span>
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              DevAgent
            </span>
          </Link>

          {/* 💻 Desktop Links */}
          <div className="hidden md:flex items-center space-x-1">
            {!isPending &&
              activeRoutes.map((route) => {
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

          {/* 🛠️ User Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {isPending ? (
              <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
            ) : isLoggedIn ? (
              <div className="flex items-center space-x-3">
                {/* প্রোফাইল নেম ব্যাজ */}
                <div className="flex items-center space-x-1.5 px-2.5 py-1 bg-slate-900 border border-slate-700 rounded-md text-[11px] text-slate-300">
                  <User className="w-3 h-3 text-cyan-400" />
                  <span className="max-w-[100px] truncate font-medium">
                    {session.user?.name}
                  </span>
                </div>

                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-md text-xs bg-red-950/30 border border-red-500/20 text-red-400 hover:bg-red-900/30 transition-all font-medium"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Exit</span>
                </button>
              </div>
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
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-md text-xs bg-cyan-600 border border-cyan-500/30 text-white hover:bg-cyan-500 transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)] font-medium"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>

          {/* 📱 Mobile Menu Trigger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1 text-gray-400 hover:text-white focus:outline-none"
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

      {/* 📱 Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-[#0A0D14] border-t border-white/[0.05] px-4 py-3 space-y-1 animate-fadeIn">
          {activeRoutes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md text-sm font-medium ${
                pathname === route.path
                  ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                  : "text-gray-400 hover:bg-white/[0.03]"
              }`}
            >
              {route.label}
            </Link>
          ))}

          <div className="pt-3 mt-2 border-t border-white/[0.05] space-y-2">
            {isLoggedIn ? (
              <>
                <div className="px-3 py-1.5 text-xs text-slate-400 flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-cyan-400" />
                  <span>
                    Logged in as: <b>{session.user?.name}</b>
                  </span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm bg-red-950/30 border border-red-500/20 text-red-400 font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Exit Workspace</span>
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="block text-center py-2 rounded-md text-sm font-medium text-gray-400 border border-slate-800 hover:bg-white/[0.03]"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="block text-center py-2 rounded-md text-sm font-medium bg-cyan-600 text-white"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
