"use client";

import { useState } from "react";
import { contactAdminRepository } from "@/repositories/contact.repository";
import type { ContactRequest } from "@/types/api/contact.types";

interface Props {
  initialContacts: { results: ContactRequest[], count: number };
}

export default function AdminContactsClient({ initialContacts }: Props) {
  const [contacts, setContacts] = useState(initialContacts.results);

  const handleMarkAsRead = async (id: string) => {
    try {
      await contactAdminRepository.patch(id, { est_lu: true });
      // Mise à jour locale de la liste
      setContacts(contacts.map(c => c.id === id ? { ...c, est_lu: true } : c));
    } catch{
      alert("Erreur lors de la mise à jour.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold text-[#0F1F3D]">Contacts & Candidatures</h1>
        <p className="text-slate-500 text-sm mt-0.5">Gérez les demandes reçues via le formulaire de contact.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-400">Date</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-400">Nom</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-400">Message</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-400">Statut</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-400 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {contacts.map((c) => (
              <tr key={c.id} className={`hover:bg-slate-50/50 transition-colors ${!c.est_lu ? 'bg-blue-50/30' : ''}`}>
                <td className="px-6 py-4 text-xs text-slate-500">
                  {new Date(c.date_creation).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-bold text-slate-800">{c.nom_complet}</p>
                  <p className="text-[10px] text-slate-400">{c.email}</p>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 max-w-xs truncate">
                  {c.message}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-[9px] font-black uppercase ${c.est_lu ? 'bg-slate-100 text-slate-400' : 'bg-blue-100 text-blue-600'}`}>
                    {c.est_lu ? 'Lu' : 'Nouveau'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  {!c.est_lu && (
                    <button 
                      onClick={() => handleMarkAsRead(c.id)}
                      className="text-xs font-bold text-[#1B365D] hover:underline"
                    >
                      Marquer lu
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}