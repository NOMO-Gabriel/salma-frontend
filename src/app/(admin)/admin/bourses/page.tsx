// src/app/(admin)/admin/bourses/page.tsx
// ==============================================================================
//  Page Gestion Bourses — tableau CRUD complet
// ==============================================================================

import { Suspense } from "react";
import AdminScholarshipsClient from "@/components/admin/AdminScholarshipsClient";
import { scholarshipRepository } from "@/repositories/scholarship.repository";

async function getInitialData() {
  try {
    return await scholarshipRepository.adminGetList({ page: 1, page_size: 20 });
  } catch {
    return { results: [], count: 0, next: null, previous: null };
  }
}

export default async function AdminBoursesPage() {
  const initialData = await getInitialData();
  return (
    <Suspense fallback={
      <div className="space-y-4 animate-pulse">
        <div className="flex justify-between">
          <div className="h-8 bg-slate-200 rounded-xl w-48" />
          <div className="h-10 bg-slate-200 rounded-xl w-36" />
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="h-14 bg-slate-50 border-b border-slate-100" />
          {[...Array(7)].map((_, i) => <div key={i} className="h-16 border-b border-slate-50 px-6 flex items-center gap-4"><div className="h-4 bg-slate-100 rounded w-1/3" /><div className="h-4 bg-slate-100 rounded w-16 ml-auto" /></div>)}
        </div>
      </div>
    }>
      <AdminScholarshipsClient initialData={initialData} />
    </Suspense>
  );
}
