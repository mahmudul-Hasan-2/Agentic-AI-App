import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // রিকোয়ারমেন্ট অনুযায়ী ৩টি প্রাইমারি কালার
        brand: {
          primary: "#0F172A", // ডিপ স্লেট (প্রধান ব্যাকগ্রাউন্ড ও টেক্সট)
          secondary: "#4F46E5", // ইনডিগো (বাটন, হাইলাইট, প্রাইমারি অ্যাকশন)
          accent: "#06B6D4", // সাইয়ান (এআই ফিচার, ব্যাজ, বর্ডার হাইলাইট)
        },
        neutral: "#F8FAFC", // অফ-হোয়াইট (কার্ড ব্যাকগ্রাউন্ড বা লাইট মোড)
      },
    },
  },
  plugins: [],
};
export default config;
