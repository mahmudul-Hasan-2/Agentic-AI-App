import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="w-full min-h-[85vh] flex flex-col items-center justify-center bg-[#0F172A] py-12 px-4 sm:px-6 lg:px-8">
      {/* 🛠️ রিকোয়ারমেন্টের ডিজাইন রুলস অনুযায়ী রেসপনসিভ কন্টেইনার */}
      <div className="w-full max-w-md space-y-8 animate-fadeIn">{children}</div>
    </div>
  );
}
