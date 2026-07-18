"use client";

import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Mail, Globe, ArrowUpRight, Cpu } from "lucide-react";

export default function Footer() {
  // ক্যাটাগরি ওয়াইজ কন্টেন্ট বাড়ানোর জন্য ডাটা স্ট্রাকচার

  const footerSections = [
    {
      title: "Platform",
      links: [
        { label: "Explore Projects", path: "/projects" },
        { label: "AI Analyzer", path: "/ai-analyzer" },
        { label: "Advanced Vetting", path: "/vetting" },
        { label: "Pricing Plans", path: "/pricing" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", path: "/docs" },
        { label: "API Reference", path: "/api" },
        { label: "System Status", path: "/status" },
        { label: "Community", path: "/community" },
      ],
    },
    {
      title: "Legal & Trust",
      links: [
        { label: "Privacy Policy", path: "/privacy" },
        { label: "Terms of Service", path: "/terms" },
        { label: "Security Architecture", path: "/security" },
        { label: "Cookie Settings", path: "#" },
      ],
    },
  ];

  return (
    <footer className="w-full bg-[#0A0D14] border-t border-white/[0.05] text-gray-500 pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top Part: Grid System with enhanced content */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-white/[0.03]">
          {/* Column 1 & 2: Brand Description (Takes more space on desktop) */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <span className="p-1 bg-cyan-500/10 border border-cyan-500/30 rounded-md text-cyan-400">
                <Cpu className="w-3.5 h-3.5" />
              </span>
              <span className="text-white font-semibold tracking-wide text-sm">
                DevAgent
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              Next-generation decentralized autonomous platform automating
              technical sourcing, vetting, and intelligent workspace matching
              for global engineering teams.
            </p>
          </div>

          {/* Column 3, 4, 5: Dynamic Sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-3">
              <h4 className="text-white font-medium tracking-wider text-xs uppercase">
                {section.title}
              </h4>
              <ul className="space-y-2 text-xs">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.path}
                      className="hover:text-cyan-400 text-gray-500 flex items-center transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Part: Copyright and Socials */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 text-xs">
          {/* Left Side */}
          <div className="flex items-center space-x-2 text-gray-600">
            <p>© 2026 Core Intelligence Architecture. All rights reserved.</p>
          </div>

          {/* Right Side Socials (No import changes) */}
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-gray-600 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <FaGithub className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="text-gray-600 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="text-gray-600 hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <FaTwitter className="w-4 h-4" />
            </a>
            <a
              href="mailto:support@devagent.ai"
              className="text-gray-600 hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
