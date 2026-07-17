"use client";

import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Mail, Globe, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const quickLinks = [
    { label: "Explore", path: "/projects" },
    { label: "Dashboard", path: "/" },
    { label: "Privacy", path: "/privacy" },
    { label: "Terms", path: "/terms" },
  ];

  return (
    <footer className="w-full bg-brand-primary border-t border-brand-accent/10 text-gray-400 py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        {/* Left Side: Brand & Copyright */}
        <div className="flex items-center space-x-2">
          <span className="text-white font-medium">DevAgent</span>
          <span className="text-gray-600">|</span>
          <p>© 2026 Core Intelligence Architecture.</p>
        </div>

        {/* Center: Minimal Navigation */}
        <div className="flex items-center space-x-4">
          {quickLinks.map((link) => (
            <a
              key={link.path}
              href={link.path}
              className="hover:text-brand-accent flex items-center transition-colors"
            >
              {link.label}
              <ArrowUpRight className="w-2.5 h-2.5 ml-0.5 opacity-50" />
            </a>
          ))}
        </div>

        {/* Right Side: Clean Social Icons */}
        <div className="flex items-center space-x-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            <FaGithub className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            <FaLinkedin className="w-4 h-4" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            <FaTwitter className="w-4 h-4" />
          </a>
          <a
            href="mailto:support@devagent.ai"
            className="hover:text-white transition-colors"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
