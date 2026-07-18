"use client";

import React, { useEffect, useState, useRef } from "react";

interface CounterProps {
  target: string;
  duration?: number;
}

export default function AnimatedCounter({
  target = "0",
  duration = 1500,
}: CounterProps) {
  const safeTarget =
    typeof target === "string" ? target : String(target || "0");
  const numericString = safeTarget.replace(/[^0-9.]/g, "");
  const suffix = safeTarget.replace(/[0-9.]/g, "");
  const isFloat = safeTarget.includes(".");

  const [count, setCount] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  // ১. স্ক্রোল ট্র্যাক করার জন্য IntersectionObserver (মাঝের স্পেস রিমুভড)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (elementRef.current) observer.unobserve(elementRef.current);
        }
      },
      { threshold: 0.1 },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // ২. কাউন্টিং অ্যানিমেশন লজিক
  useEffect(() => {
    if (!isIntersecting) return;

    const targetNum = parseFloat(numericString);
    if (isNaN(targetNum)) return;

    let start = 0;
    const end = targetNum;
    const totalSteps = 60;
    const stepTime = duration / totalSteps;
    const increment = end / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [numericString, duration, isIntersecting]);

  return (
    <span ref={elementRef}>
      {isFloat ? count.toFixed(1) : Math.floor(count)}
      {suffix}
    </span>
  );
}
