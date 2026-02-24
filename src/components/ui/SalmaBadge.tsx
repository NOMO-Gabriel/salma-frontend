import React from "react";

interface SalmaBadgeProps {
  status: "open" | "urgent" | "closed";
  label: string;
}

export default function SalmaBadge({ status, label }: SalmaBadgeProps) {
  const styles = {
    open: "bg-green-100 text-green-700 border-green-200",
    urgent: "bg-amber-100 text-amber-700 border-amber-200 animate-pulse",
    closed: "bg-red-100 text-red-700 border-red-200"
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${styles[status]}`}>
      {label}
    </span>
  );
}