"use client";

import { useLanguage } from "@/hooks/useLanguage";
import type { Scholarship } from "@/types";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<Scholarship>) => void;
  scholarshipToEdit?: Scholarship | null;
}

export default function AddScholarshipModal({ isOpen, onClose, onSave, scholarshipToEdit }: ModalProps) {
  const { dictionary } = useLanguage();
  const t = dictionary.admin.scholarships.form;

  if (!isOpen) return null;

  // Intercepte la soumission du formulaire
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as Partial<Scholarship>;
    
    // Formatage spécial pour les nombres
    if (data.ageLimit) data.ageLimit = Number(data.ageLimit);
    
    onSave(data);
  };

  const isEditing = !!scholarshipToEdit;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-salma-bg border border-salma-border rounded-xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-salma-lg">
        
        {/* Header */}
        <div className="p-6 border-b border-salma-border flex justify-between items-center">
          <h2 className="text-xl font-bold text-salma-text">
            {isEditing ? t.editTitle : t.addTitle}
          </h2>
          <button onClick={onClose} className="text-salma-text-muted hover:text-salma-text">
            ✕
          </button>
        </div>

        {/* Body / Formulaire */}
        <div className="p-6 overflow-y-auto flex-1">
          <form id="scholarship-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="col-span-full">
              <h3 className="font-serif text-salma-primary border-b border-salma-border pb-2 mb-4">Informations Générales</h3>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{t.title}</label>
              <input name="title" required defaultValue={scholarshipToEdit?.title} type="text" className="w-full p-2 border border-salma-border rounded bg-salma-surface" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{t.organization}</label>
              <input name="organization" required defaultValue={scholarshipToEdit?.organization} type="text" className="w-full p-2 border border-salma-border rounded bg-salma-surface" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{t.country}</label>
              <select name="country" required defaultValue={scholarshipToEdit?.country || "chine"} className="w-full p-2 border border-salma-border rounded bg-salma-surface">
                <option value="chine">Chine</option>
                <option value="allemagne">Allemagne</option>
                <option value="both">Chine & Allemagne</option>
              </select>
            </div>
            <div className="col-span-full">
              <label className="block text-sm font-medium mb-1">{t.description}</label>
              <textarea name="description" required defaultValue={scholarshipToEdit?.description} rows={4} className="w-full p-2 border border-salma-border rounded bg-salma-surface"></textarea>
            </div>

            <div className="col-span-full mt-4">
              <h3 className="font-serif text-salma-primary border-b border-salma-border pb-2 mb-4">Critères d'Éligibilité</h3>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{t.studyLevel}</label>
              <select name="studyLevel" required defaultValue={scholarshipToEdit?.studyLevel || "master"} className="w-full p-2 border border-salma-border rounded bg-salma-surface">
                <option value="licence">Licence</option>
                <option value="master">Master</option>
                <option value="doctorat">Doctorat</option>
                <option value="post-doc">Post-doc</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{t.fieldOfStudy}</label>
              <input name="fieldOfStudy" required defaultValue={scholarshipToEdit?.fieldOfStudy} type="text" className="w-full p-2 border border-salma-border rounded bg-salma-surface" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{t.ageLimit}</label>
              <input name="ageLimit" required defaultValue={scholarshipToEdit?.ageLimit} type="number" className="w-full p-2 border border-salma-border rounded bg-salma-surface" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{t.languageReq}</label>
              <input name="languageReq" required defaultValue={scholarshipToEdit?.languageReq} type="text" className="w-full p-2 border border-salma-border rounded bg-salma-surface" />
            </div>

            <div className="col-span-full mt-4">
              <h3 className="font-serif text-salma-primary border-b border-salma-border pb-2 mb-4">Logistique</h3>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{t.status}</label>
              <select name="status" required defaultValue={scholarshipToEdit?.status || "open"} className="w-full p-2 border border-salma-border rounded bg-salma-surface">
                <option value="open">Ouvert</option>
                <option value="closed">Fermé</option>
                <option value="pending">En attente</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{t.deadline}</label>
              <input name="deadline" required defaultValue={scholarshipToEdit?.deadline} type="date" className="w-full p-2 border border-salma-border rounded bg-salma-surface" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{t.coverageType}</label>
              <select name="coverageType" required defaultValue={scholarshipToEdit?.coverageType || "totale"} className="w-full p-2 border border-salma-border rounded bg-salma-surface">
                <option value="totale">Totale</option>
                <option value="partielle">Partielle</option>
                <option value="frais_scolarite">Frais de scolarité uniquement</option>
                <option value="allocation">Allocation mensuelle</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{t.officialLink}</label>
              <input name="officialLink" required defaultValue={scholarshipToEdit?.officialLink} type="url" className="w-full p-2 border border-salma-border rounded bg-salma-surface" />
            </div>

          </form>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-salma-border flex justify-end gap-4 bg-salma-surface rounded-b-xl">
          <button type="button" onClick={onClose} className="px-6 py-2 rounded font-medium text-salma-text border border-salma-border hover:bg-salma-border/50">
            {t.cancel}
          </button>
          {/* Le bouton soumet le formulaire via l'attribut "form" */}
          <button type="submit" form="scholarship-form" className="px-6 py-2 rounded font-medium text-white bg-salma-primary hover:bg-salma-primary-light">
            {t.save}
          </button>
        </div>

      </div>
    </div>
  );
}