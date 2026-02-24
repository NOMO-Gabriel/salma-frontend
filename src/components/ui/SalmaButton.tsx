"use client";

import React from "react";

interface SalmaButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "accent" | "gold" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export default function SalmaButton({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: SalmaButtonProps) {
  
  const baseStyles = "inline-flex items-center justify-center font-sans font-bold transition-all duration-300 rounded-lg active:scale-95";
  
  const variants = {
    primary: "bg-salma-primary text-white hover:bg-salma-accent shadow-salma-sm",
    accent: "bg-salma-accent text-white hover:bg-salma-primary shadow-salma-sm",
    gold: "bg-salma-gold text-salma-primary hover:bg-salma-gold-light shadow-salma-sm",
    outline: "border-2 border-salma-gold text-salma-gold hover:bg-salma-gold hover:text-white"
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm tracking-widest uppercase",
    lg: "px-8 py-4 text-base tracking-widest uppercase"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}