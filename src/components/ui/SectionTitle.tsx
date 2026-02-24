import React from "react";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionTitle({ 
  title, 
  subtitle, 
  align = "left" 
}: SectionTitleProps) {
  return (
    <div className={`mb-12 flex flex-col ${align === "center" ? "items-center text-center" : "items-start"}`}>
      {subtitle && (
        <span className="text-salma-gold font-sans font-bold text-xs tracking-[0.3em] uppercase mb-2">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-serif text-salma-primary dark:text-white leading-tight">
        {title}
      </h2>
      <div className="gold-divider mt-4" />
    </div>
  );
}