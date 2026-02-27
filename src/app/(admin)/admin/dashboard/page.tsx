"use client";

import { useState, useEffect, useCallback } from "react";
import { scholarshipDictionary } from "@/dictionaries/data";
import AddScholarshipModal from "@/components/admin/AddScholarshipModal";
import type { ScholarshipAdmin, ScholarshipFilters, ScholarshipCountry } from "@/types";

export default function AdminDashboard() {
  // FIX : Retrait de 'dictionary' non utilisé
  const [scholarships, setScholarships] = useState<ScholarshipAdmin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [filters, setFilters] = useState<ScholarshipFilters>({ search: "", pays_destination: undefined });

  const fetchScholarships = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await scholarshipDictionary.admin.getList(filters);
      setScholarships(data.results);
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => { fetchScholarships(); }, [fetchScholarships]);

  return (
    <div className="p-8 space-y-6 animate-fade-in">
      <div className="flex justify-between items-end">
        <div className="space-y-4">
          <h2 className="text-2xl font-serif font-bold text-salma-primary">Gestion des Bourses</h2>
          <div className="flex gap-4">
            <input 
              type="text" 
              placeholder="Rechercher..." 
              className="px-4 py-2 border border-salma-border rounded-lg bg-white text-sm outline-none focus:border-salma-gold w-64"
              onChange={(e) => setFilters(f => ({ ...f, search: e.target.value }))}
            />
            <select 
              className="px-4 py-2 border border-salma-border rounded-lg bg-white text-sm outline-none"
              // FIX : Typage explicite du HTMLSelectElement et du cast de valeur
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
                setFilters(f => ({ ...f, pays_destination: (e.target.value as ScholarshipCountry) || undefined }))
              }
            >
              <option value="">Tous les pays</option>
              <option value="chine">Chine</option>
              <option value="allemagne">Allemagne</option>
            </select>
          </div>
        </div>
        <button 
          onClick={() => { setEditingId(null); setIsModalOpen(true); }}
          className="bg-salma-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-salma-primary-light transition-all shadow-salma-md"
        >
          + Ajouter une bourse
        </button>
      </div>

      <div className="bg-white border border-salma-border rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-salma-bg border-b border-salma-border text-salma-text-muted uppercase text-[10px] font-bold tracking-widest">
            <tr>
              <th className="p-5">Titre (FR)</th>
              <th className="p-5">Pays</th>
              <th className="p-5">Niveau</th>
              <th className="p-5">Visibilité</th>
              <th className="p-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-salma-border">
            {isLoading ? (
               <tr><td colSpan={5} className="p-10 text-center animate-pulse text-salma-text-muted">Synchronisation avec le serveur...</td></tr>
            ) : scholarships.map((s) => (
              <tr key={s.id} className="hover:bg-salma-bg/30 transition-colors group">
                <td className="p-5 font-bold text-salma-primary">{s.titre_fr}</td>
                <td className="p-5 uppercase text-xs">{s.pays_destination}</td>
                <td className="p-5 capitalize">{s.niveau}</td>
                <td className="p-5">
                   <div className="flex gap-1">
                      {s.visibilites.filter(v => v.est_visible).length} / {s.visibilites.length} champs
                   </div>
                </td>
                <td className="p-5 text-right">
                  <button 
                    onClick={() => { setEditingId(s.id); setIsModalOpen(true); }}
                    className="text-salma-gold hover:text-salma-primary font-bold mr-4 transition-colors"
                  >
                    Éditer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <AddScholarshipModal 
          isOpen={isModalOpen} 
          onClose={() => { setIsModalOpen(false); setEditingId(null); }} 
          onSave={fetchScholarships}
          scholarshipId={editingId} 
        />
      )}
    </div>
  );
}