"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import {
  Terminal,
  Compass,
  Cpu,
  Menu,
  X,
  LogOut,
  KeyRound,
  UserPlus,
  FilePlus,
  Settings,
  HelpCircle,
  User,
  MessageSquare, // 🌟 চ্যাট আইকন ইম্পোর্ট করা হলো
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  const isLoggedIn = !!session;

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

  // 🏠 লগআউট থাকা অবস্থায় রাউটসমূহ
  const loggedOutRoutes = [
    { label: "Home", path: "/", icon: Terminal },
    { label: "Explore", path: "/explore", icon: Compass },
    { label: "About", path: "/about", icon: Cpu },
  ];

  // 🛡️ লগইন থাকা অবস্থায় রাউটসমূহ (এখানে AI Chat যুক্ত করা হয়েছে)
  const loggedInRoutes = [
    { label: "Home", path: "/", icon: Terminal },
    { label: "About", path: "/about", icon: Cpu },
    { label: "Explore", path: "/projects", icon: Compass },
    { label: "Post Item", path: "/projects/add", icon: FilePlus },
    { label: "Manage Items", path: "/projects/manage", icon: Settings },
    { label: "AI Chat", path: "/chat", icon: MessageSquare }, // 🌟 চ্যাট উইথ এআই লিংক
    { label: "Help Center", path: "/help", icon: HelpCircle },
  ];

  const activeRoutes = isLoggedIn ? loggedInRoutes : loggedOutRoutes;

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#0A0D14]/80 backdrop-blur-md border-b border-white/[0.06] text-white transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 🚀 Brand Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2.5 text-sm font-semibold tracking-tight group"
          >
            <span className="p-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-400 group-hover:scale-105 transition-transform">
              <Cpu className="w-4 h-4 animate-pulse" />
            </span>
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent text-base">
              DevAgent
            </span>
          </Link>

          {/* 💻 Desktop Links */}
          <div className="hidden lg:flex items-center space-x-1.5">
            {!isPending &&
              activeRoutes.map((route) => {
                const Icon = route.icon;
                const isActive = pathname === route.path;
                return (
                  <Link
                    key={route.path}
                    href={route.path}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all duration-150 ${
                      isActive
                        ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.15)]"
                        : "text-gray-400 hover:text-gray-200 hover:bg-white/[0.04]"
                    }`}
                  >
                    {Icon && <Icon className="w-3.5 h-3.5" />}
                    <span>{route.label}</span>
                  </Link>
                );
              })}
          </div>

          {/* 🛠️ User Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            {isPending ? (
              <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
            ) : isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-900/80 border border-slate-800 rounded-lg text-xs text-slate-300">
                  <User className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="max-w-[110px] truncate font-medium">
                    {session.user?.name}
                  </span>
                </div>

                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs bg-red-950/30 border border-red-500/20 text-red-400 hover:bg-red-900/40 transition-all font-medium"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Exit</span>
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs text-gray-300 hover:text-white hover:bg-white/[0.04] transition-all font-medium"
                >
                  <KeyRound className="w-3.5 h-3.5 text-gray-400" />
                  <span>Sign In</span>
                </Link>
                <Link
                  href="/register"
                  className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs bg-cyan-600 border border-cyan-500/30 text-white hover:bg-cyan-500 transition-all shadow-[0_0_15px_rgba(6,182,212,0.25)] font-medium"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>

          {/* 📱 Mobile Menu Trigger */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 text-gray-400 hover:text-white focus:outline-none bg-slate-900 border border-slate-800 rounded-lg"
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
        <div className="lg:hidden bg-[#0A0D14]/95 backdrop-blur-xl border-t border-white/[0.06] px-4 py-4 space-y-1.5 animate-fadeIn">
          {activeRoutes.map((route) => {
            const Icon = route.icon;
            return (
              <Link
                key={route.path}
                href={route.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-2.5 px-3.5 py-2.5 rounded-lg text-sm font-medium ${
                  pathname === route.path
                    ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                    : "text-gray-400 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                <span>{route.label}</span>
              </Link>
            );
          })}

          <div className="pt-3 mt-3 border-t border-white/[0.06] space-y-2.5">
            {isLoggedIn ? (
              <>
                <div className="px-3.5 py-2 text-xs text-slate-300 flex items-center gap-2 bg-slate-900/60 rounded-lg border border-slate-800">
                  <User className="w-4 h-4 text-cyan-400" />
                  <span>
                    Signed in as:{" "}
                    <b className="text-white">{session.user?.name}</b>
                  </span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg text-sm bg-red-950/30 border border-red-500/20 text-red-400 font-medium hover:bg-red-900/40"
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
                  className="flex items-center justify-center space-x-1.5 py-2.5 rounded-lg text-xs font-medium text-gray-300 border border-slate-800 hover:bg-white/[0.04]"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center space-x-1.5 py-2.5 rounded-lg text-xs font-medium bg-cyan-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.25)]"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Register</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
