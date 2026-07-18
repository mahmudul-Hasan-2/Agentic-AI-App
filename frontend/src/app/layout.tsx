import type { Metadata } from "next";
import { Fira_Code } from "next/font/google"; // ফন্ট পরিবর্তন করা হলো
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Fira Code ফন্ট কনফিগারেশন
const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // প্রয়োজনীয় সব ওয়েট নেওয়া হলো
  variable: "--font-fira-code", // সিএসএস ভ্যারিয়েবল হিসেবে ব্যবহারের জন্য
});

const title = "DevAgent";
const description =
  "Production-ready Agentic AI platform for software projects.";

export const metadata: Metadata = {
  title,
  description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* ফন্টটি বডিতে অ্যাপ্লাই করা হলো এবং টেক্সটের কালার ব্র্যান্ড প্রাইমারি দেওয়া হলো */}
      <body
        className={`${firaCode.className} bg-slate-50 text-brand-primary flex flex-col min-h-screen`}
      >
        {/* Sticky Global Navbar */}
        <Navbar />
        {/* Dynamic Pages */}
        <main className="flex-grow">{children}</main>
        {/* Global Footer */}
        <Footer />
        {/* Custom CSS/JS loaded from public/custom.* */}
        <link rel="stylesheet" href="/custom.css" />
        <script src="/custom.js" defer />
      </body>
    </html>
  );
}
