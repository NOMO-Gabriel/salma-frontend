// src/app/(admin)/layout.tsx
// Ce layout surcharge le RootLayout pour le groupe (admin)
// Il ne rend QUE les enfants — la Navbar/Footer/WhatsApp ne doivent
// pas apparaître sur les pages admin.

// src/app/(admin)/layout.tsx
import type { ReactNode } from "react";

export default function AdminGroupLayout({ children }: { children: ReactNode }) {
  return children;
}