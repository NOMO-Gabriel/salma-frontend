"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import SalmaButton from "./SalmaButton";
import { useLanguage } from "@/hooks/useLanguage";

export default function CookieBanner() {
  const { dictionary } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("salma-cookie-consent");
    if (!consent) setIsVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("salma-cookie-consent", "accepted");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:w-[400px] bg-white dark:bg-salma-surface border border-salma-border shadow-salma-lg rounded-3xl p-6 z-[60] animate-fade-in">
      <p className="text-sm text-salma-text-muted mb-4 leading-relaxed">
        {dictionary.cookies.text}{" "}
        <Link href="/confidentialite" className="text-salma-primary font-bold underline">
          {dictionary.cookies.link}
        </Link>.
      </p>
      <div className="flex gap-3">
        <SalmaButton onClick={accept} variant="primary" size="sm" className="flex-1">
          {dictionary.cookies.accept}
        </SalmaButton>
        <button onClick={() => setIsVisible(false)} className="text-xs text-salma-text-muted hover:underline">
          {dictionary.cookies.decline}
        </button>
      </div>
    </div>
  );
}