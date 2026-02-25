"use client";

import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import AddScholarshipModal from "@/components/admin/AddScholarshipModal";
import type { Scholarship } from "@/types";

const initialScholarships: Scholarship[] = [
  {
    id: "1",
    title: "Bourse d'Excellence du CSC",
    organization: "Gouvernement Chinois",
    country: "chine",
    description: "Bourse complète pour les étudiants internationaux.",
    studyLevel: "master",
    fieldOfStudy: "Ingénierie",
    ageLimit: 30,
    languageReq: "HSK 4",
    status: "open",
    deadline: "2026-04-15",
    coverageType: "totale",
    officialLink: "https://studyinchina.csc.edu.cn",
  },
];

export default function AdminDashboard() {
  const { dictionary } = useLanguage();
  
  const [scholarships, setScholarships] = useState<Scholarship[]>(initialScholarships);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingScholarship, setEditingScholarship] = useState<Scholarship | null>(null);

  // --- CETTE FONCTION EST CELLE QUI MANQUE DANS TON ERREUR ---
  const handleSaveScholarship = (data: Partial<Scholarship>) => {
    if (editingScholarship) {
      setScholarships(scholarships.map(s => 
        s.id === editingScholarship.id ? { ...s, ...data } as Scholarship : s
      ));
    } else {
      const newScholarship = { 
        ...data, 
        id: Math.random().toString(36).substring(2, 11) 
      } as Scholarship;
      setScholarships([...scholarships, newScholarship]);
    }
    setIsModalOpen(false);
    setEditingScholarship(null);
  };

  const handleEditClick = (scholarship: Scholarship) => {
    setEditingScholarship(scholarship);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    if (window.confirm(dictionary.admin.scholarships.table.deleteConfirm)) {
      setScholarships(scholarships.filter(s => s.id !== id));
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold font-sans text-salma-text">
            {dictionary.admin.scholarships.title}
          </h2>
        </div>
        
        <button 
          onClick={() => { setEditingScholarship(null); setIsModalOpen(true); }}
          className="bg-salma-primary text-white px-5 py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity shadow-salma-sm"
        >
          {dictionary.admin.scholarships.addBtn}
        </button>
      </div>

      {/* Tableau */}
      <div className="bg-salma-surface border border-salma-border rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-salma-bg border-b border-salma-border text-salma-text-muted">
            <tr>
              <th className="p-4">{dictionary.admin.scholarships.table.title}</th>
              <th className="p-4">{dictionary.admin.scholarships.table.country}</th>
              <th className="p-4">{dictionary.admin.scholarships.table.status}</th>
              <th className="p-4 text-right">{dictionary.admin.scholarships.table.actions}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-salma-border">
            {scholarships.map((s) => (
              <tr key={s.id} className="hover:bg-salma-bg/50 transition-colors">
                <td className="p-4 font-medium">{s.title}</td>
                <td className="p-4 uppercase">{dictionary.admin.scholarships.country[s.country]}</td>
                <td className="p-4 capitalize">{dictionary.admin.scholarships.status[s.status]}</td>
                <td className="p-4 text-right space-x-3">
                  <button onClick={() => handleEditClick(s)} className="text-salma-accent hover:underline">
                    {dictionary.admin.scholarships.table.edit}
                  </button>
                  <button onClick={() => handleDeleteClick(s.id)} className="text-red-500 hover:underline">
                    {dictionary.admin.scholarships.table.delete}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* VERIFICATION : onSave DOIT être présent ici */}
      <AddScholarshipModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveScholarship} 
        scholarshipToEdit={editingScholarship}
      />
    </div>
  );
}