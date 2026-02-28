"use client";
// src/components/admin/AdminNotificationBell.tsx
// ==============================================================================
//  Cloche de notification — badge contacts non lus
//  Polling toutes les 60s via contact repository
// ==============================================================================

import { useState, useEffect } from "react";

export default function AdminNotificationBell() {
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);

  // Polling léger — remplacé par WebSocket plus tard
  useEffect(() => {
    const fetchUnread = async () => {
      try {
        const { contactRepository } = await import("@/repositories/contact.repository");
        const data = await contactRepository.getList({ statut: "nouveau", page_size: 1 });
        setCount(data.count ?? 0);
      } catch {
        // Silencieux — pas de crash si backend inaccessible
      }
    };

    fetchUnread();
    const interval = setInterval(fetchUnread, 60_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
        </svg>
        {count > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse border border-white" />
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 z-20 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
              <span className="text-sm font-bold text-slate-800">Notifications</span>
              {count > 0 && (
                <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">
                  {count} nouveau{count > 1 ? "x" : ""}
                </span>
              )}
            </div>
            <div className="p-4 text-center text-sm text-slate-400">
              {count > 0 ? (
                <a href="/admin/contacts" className="text-[#1B365D] font-semibold hover:underline">
                  Voir les {count} demande{count > 1 ? "s" : ""} non traitée{count > 1 ? "s" : ""}
                </a>
              ) : (
                <span>Aucune nouvelle notification</span>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
