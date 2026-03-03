import { kpiRepository } from "@/repositories/kpi.repository";
import AdminKpiClient from "@/components/admin/AdminKpiClient";

async function getKpiData() {
  try {
    const [realtime, conversion] = await Promise.all([
      kpiRepository.adminGetRealtime(),
      kpiRepository.adminGetConversion()
    ]);
    return { realtime, conversion };
  } catch (error) {
    console.error("Erreur KPI:", error);
    // Fallback vide pour éviter le crash
    return { 
      realtime: { visiteurs_uniques: 0, pages_vues: 0, soumissions_formulaire: 0 },
      conversion: { taux_global: 0, par_bourse: [] }
    };
  }
}

export default async function AdminKpiPage() {
  const data = await getKpiData();
  // @ts-ignore
  return <AdminKpiClient realtime={data.realtime} conversion={data.conversion} />;
}