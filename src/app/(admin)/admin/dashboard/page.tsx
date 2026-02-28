// src/app/(admin)/admin/dashboard/page.tsx
// ==============================================================================
//  Dashboard Admin — Remplace le dashboard existant
//  ✅ Conserve : logique fetchScholarships existante (reste accessible via /admin/bourses)
//  ✅ Ajoute   : KPI temps réel, graphique activité, contacts récents
// ==============================================================================

import { Suspense } from "react";
import AdminDashboardClient from "@/components/admin/AdminDashboardClient";
import { 
  kpiRepository, 
  scholarshipAdminRepository, 
  contactAdminRepository 
} from "@/repositories"; // Utiliser le barrel export pour éviter les erreurs

async function getDashboardData() {
  const [kpi, scholarships, contacts] = await Promise.allSettled([
    kpiRepository.adminGetRealtime(),
    scholarshipAdminRepository.getList({ page: 1, page_size: 5 }),
    contactAdminRepository.getList({ page: 1, page_size: 5 }),
  ]);

  return {
    kpi:          kpi.status          === "fulfilled" ? kpi.value          : null,
    scholarships: scholarships.status === "fulfilled" ? scholarships.value : null,
    contacts:     contacts.status     === "fulfilled" ? contacts.value     : null,
  };
}

export default async function AdminDashboardPage() {
  const data = await getDashboardData();
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <AdminDashboardClient  
        kpi={data.kpi}
        scholarships={data.scholarships}
        contacts={data.contacts}
      />

    </Suspense>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 bg-slate-200 rounded-xl w-64" />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {[...Array(4)].map((_, i) => <div key={i} className="h-32 bg-slate-200 rounded-2xl" />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-72 bg-slate-200 rounded-2xl" />
        <div className="h-72 bg-slate-200 rounded-2xl" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-64 bg-slate-200 rounded-2xl" />
        <div className="h-64 bg-slate-200 rounded-2xl" />
      </div>
    </div>
  );
}
