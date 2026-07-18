"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserPlus, Loader2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👁️ শো/হাইড স্টেট
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error: authError } = await authClient.signUp.email({
      email,
      password,
      name,
      callbackURL: "/items/manage",
    });

    setLoading(false);
    if (authError) {
      toast.error(
        authError.message || "Registration failed. Please try again.",
      );
    } else {
      toast.success("Account created successfully! Redirecting to login...");
      router.push("/login");
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-[#1E293B] rounded-custom border border-slate-700 shadow-xl">
      <div className="flex justify-center mb-4 text-secondary">
        <UserPlus className="w-12 h-12" />
      </div>

      <h2 className="text-2xl font-bold text-center mb-2 text-slate-100">
        Create <span className="text-secondary">DevAgent</span> Account
      </h2>
      <p className="text-center text-slate-400 text-xs mb-6">
        Join the elite Agentic AI workspace today.
      </p>

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-slate-300">
            Full Name
          </label>
          <input
            type="text"
            required
            className="w-full p-3 bg-[#0F172A] border border-slate-600 rounded-custom text-slate-200 focus:outline-none focus:border-secondary transition-all"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-slate-300">
            Email Address
          </label>
          <input
            type="email"
            required
            className="w-full p-3 bg-[#0F172A] border border-slate-600 rounded-custom text-slate-200 focus:outline-none focus:border-secondary transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* পাসওয়ার্ড ইনপুট উইথ টগল বাটন */}
        <div>
          <label className="block text-sm font-medium mb-1 text-slate-300">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              className="w-full p-3 pr-12 bg-[#0F172A] border border-slate-600 rounded-custom text-slate-200 focus:outline-none focus:border-secondary transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 mt-2 bg-secondary hover:bg-blue-700 text-white font-semibold rounded-custom transition duration-200 flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign Up"}
        </button>
      </form>

      <p className="text-sm text-center text-slate-400 mt-4">
        Already have an account?{" "}
        <Link href="/login" className="text-accent hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  );
}
