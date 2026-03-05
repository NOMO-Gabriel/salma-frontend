"use client";
import { useLanguage } from "@/hooks/useLanguage";
import SalmaBadge from "@/components/ui/SalmaBadge";
import { useState, useCallback, useTransition } from "react";
import { scholarshipAdminRepository } from "@/repositories/scholarship.repository";
import { toFieldVisibilityMap } from "@/types/api/scholarship.types";
import { mediaRepository } from "@/repositories/media.repository";
import MediaPicker from "./MediaPicker";
import Image from "next/image";
import { getMediaUrl } from "@/lib/api-client";
import type {
  ScholarshipAdmin,
  CreateScholarshipPayload,
  ScholarshipStatus,
  ScholarshipCountry,
  ScholarshipLevel,
  ScholarshipCoverage
} from "@/types";
import ScholarshipPreviewModal from "./ScholarshipPreviewModal";
import QuickAnnouncementModal from "./QuickAnnouncementModal";
import SalmaButton from "../ui/SalmaButton";

function Flag({ country }: { country: string }) {
  return <>{country === "chine" ? "🇨🇳" : country === "allemagne" ? "🇩🇪" : "🌍"}</>;
}

const EMPTY_FORM: CreateScholarshipPayload = {
  titre_fr: "",
  titre_en: "",
  organisme_fr: "",
  organisme_en: "",
  description_fr: "",
  description_en: "",
  pays_destination: "chine",
  niveau: "master",
  type_couverture: "complete",
  statut: "brouillon",
  date_limite: "",
  lien_officiel: "",
  exigence_langue_fr: "",
  exigence_langue_en: "",
  est_mise_en_avant: false,
  image_id: "",
};

const FIELD_VISIBILITY_DEFAULTS: Record<string, boolean> = {
  description_fr: true,
  description_en: true,
  date_limite: true,
  type_couverture: true,
  exigence_langue_fr: true,
  exigence_langue_en: true,
  avantages: true,
  criteres: true,
  images: true,
  lien_officiel: false,
  details_montant_fr: false,
  details_montant_en: false,
};

function ScholarshipModal({
  scholarship,
  onClose,
  onSave,
}: {
  scholarship: ScholarshipAdmin | null;
  onClose: () => void;
  onSave: (data: CreateScholarshipPayload, visibility: Record<string, boolean>) => Promise<void>;
}) {
  const { dictionary } = useLanguage();
  const [form, setForm] = useState<CreateScholarshipPayload>(
    scholarship
      ? {
          titre_fr: scholarship.titre_fr,
          titre_en: scholarship.titre_en,
          organisme_fr: scholarship.organisme_fr,
          organisme_en: scholarship.organisme_en,
          description_fr: scholarship.description_fr,
          description_en: scholarship.description_en,
          pays_destination: scholarship.pays_destination,
          niveau: scholarship.niveau,
          type_couverture: scholarship.type_couverture,
          statut: scholarship.statut,
          date_limite: scholarship.date_limite || "",
          lien_officiel: scholarship.lien_officiel || "",
          exigence_langue_fr: scholarship.exigence_langue_fr || "",
          exigence_langue_en: scholarship.exigence_langue_en || "",
          est_mise_en_avant: scholarship.est_mise_en_avant,
          image_id: scholarship.image_principale?.id || "",
        }
      : EMPTY_FORM
  );

  const [visibility, setVisibility] = useState<Record<string, boolean>>(
    scholarship?.visibilites
      ? toFieldVisibilityMap(scholarship.visibilites)
      : FIELD_VISIBILITY_DEFAULTS
  );

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"info" | "visibility" | "avanced">("info");
  const [showLibrary, setShowLibrary] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(scholarship?.image_principale?.url_fichier || null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.titre_fr?.trim()) { setError("Le titre FR est requis."); return; }
    setSaving(true);
    setError("");
    try {
      await onSave(form, visibility);
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setSaving(false);
    }
  };

  const set = (field: keyof CreateScholarshipPayload, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const inputCls = "w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#1B365D]/20 focus:border-[#1B365D] transition-all";
  const labelCls = "block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-3xl max-h-[90vh] flex flex-col bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 bg-white">
          <div>
            <h2 className="text-2xl font-serif font-bold text-[#0F1F3D]">
              {scholarship ? "Modifier la bourse" : "Nouvelle bourse"}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 text-slate-400 transition-colors">✕</button>
        </div>

        {previewUrl && (
          <div className="relative w-full h-40 bg-salma-primary overflow-hidden border-b border-salma-gold/20">
            <Image src={getMediaUrl(previewUrl) || ""} alt="Preview" fill className="object-cover opacity-60" />
            <button onClick={() => { setPreviewUrl(null); set("image_id", ""); }} className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full">✕</button>
          </div>
        )}

        <div className="flex gap-1 px-8 pt-4 border-b border-slate-100 bg-slate-50/50">
          {(["info", "visibility", "avanced"] as const).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2.5 text-xs font-semibold border-b-2 ${activeTab === tab ? "text-[#0F1F3D] border-[#C9A84C] bg-white" : "text-slate-400 border-transparent"}`}>
              {tab === "info" ? "Informations" : tab === "visibility" ? "Visibilité" : "Options"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-6">
          {activeTab === "info" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Titre (FR) *</label>
                  <input className={inputCls} value={form.titre_fr} onChange={(e) => set("titre_fr", e.target.value)} required />
                </div>
                <div>
                  <label className={labelCls}>Titre (EN)</label>
                  <input className={inputCls} value={form.titre_en} onChange={(e) => set("titre_en", e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className={labelCls}>Destination</label>
                  <select className={inputCls} value={form.pays_destination} onChange={(e) => set("pays_destination", e.target.value as ScholarshipCountry)}>
                    <option value="chine">🇨🇳 Chine</option>
                    <option value="allemagne">🇩🇪 Allemagne</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Niveau</label>
                  <select className={inputCls} value={form.niveau} onChange={(e) => set("niveau", e.target.value as ScholarshipLevel)}>
                    <option value="licence">Licence</option>
                    <option value="master">Master</option>
                    <option value="doctorat">Doctorat</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Statut</label>
                  <select className={inputCls} value={form.statut} onChange={(e) => set("statut", e.target.value as ScholarshipStatus)}>
                    <option value="brouillon">Brouillon</option>
                    <option value="publie">Publié</option>
                  </select>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 space-y-4">
                <div className="flex gap-4">
                  <label className="flex-1 cursor-pointer">
                    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                      <span className="text-xs font-bold text-slate-500">{isUploading ? "Upload..." : "📤 Téléverser"}</span>
                      <input type="file" className="hidden" accept="image/*" onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        setIsUploading(true);
                        try {
                          const res = await mediaRepository.upload({ fichier: file });
                          set("image_id", res.id);
                          setPreviewUrl(res.url_fichier);
                        } finally { setIsUploading(false); }
                      }} />
                    </div>
                  </label>
                  <button type="button" onClick={() => setShowLibrary(!showLibrary)} className="flex-1 border-2 border-slate-200 rounded-2xl bg-slate-50/50 text-xs font-bold text-slate-500">🖼️ Bibliothèque</button>
                </div>
                {showLibrary && <MediaPicker onSelect={(m) => { set("image_id", m.id); setPreviewUrl(m.url_fichier); setShowLibrary(false); }} />}
              </div>
            </>
          )}

          {activeTab === "visibility" && (
            <div className="space-y-3">
              {Object.keys(FIELD_VISIBILITY_DEFAULTS).map((key) => (
                <div key={key} className="flex items-center justify-between px-4 py-3 rounded-xl border bg-white">
                  <span className="text-sm font-medium text-slate-800">{key.replace(/_/g, ' ')}</span>
                  <button type="button" onClick={() => setVisibility(v => ({ ...v, [key]: !v[key] }))} className={`relative w-11 h-6 rounded-full ${visibility[key] ? "bg-[#1B365D]" : "bg-slate-200"}`}>
                    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${visibility[key] ? "translate-x-5" : ""}`} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === "avanced" && (
            <div className="flex items-center justify-between px-4 py-4 rounded-xl border border-[#C9A84C]/30 bg-[#C9A84C]/5">
              <span className="text-sm font-semibold text-slate-800">Mettre en avant</span>
              <button type="button" onClick={() => set("est_mise_en_avant", !form.est_mise_en_avant)} className={`relative w-11 h-6 rounded-full ${form.est_mise_en_avant ? "bg-[#C9A84C]" : "bg-slate-200"}`}>
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${form.est_mise_en_avant ? "translate-x-5" : ""}`} />
              </button>
            </div>
          )}

          {error && <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">{error}</div>}
        </form>

        <div className="p-8 border-t border-slate-100 flex justify-end gap-3 bg-white">
          <button type="button" onClick={onClose} className="px-5 py-2.5 text-slate-600 text-sm font-semibold">Annuler</button>
          <SalmaButton type="submit" onClick={handleSubmit} disabled={saving} isLoading={saving}>
            {scholarship ? "Mettre à jour" : "Créer la bourse"}
          </SalmaButton>
        </div>
      </div>
    </div>
  );
}

interface Props {
  initialData: {
    results: ScholarshipAdmin[];
    count: number;
    next: string | null;
    previous: string | null;
  };
}

export default function AdminScholarshipsClient({ initialData }: Props) {
  const { dictionary, locale } = useLanguage();
  const statusLabels = dictionary.admin.statusLabels;
  const [scholarships, setScholarships] = useState(initialData.results);
  const [total, setTotal] = useState(initialData.count);
  const [search, setSearch] = useState("");
  const [filterCountry, setFilterCountry] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingScholarship, setEditingScholarship] = useState<ScholarshipAdmin | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [previewBourse, setPreviewBourse] = useState<ScholarshipAdmin | null>(null);
  const [announceBourse, setAnnounceBourse] = useState<ScholarshipAdmin | null>(null);
  const [isPending, startTransition] = useTransition();

  const PAGE_SIZE = 20;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  const fetchData = useCallback(async (p = 1, s = search, c = filterCountry, st = filterStatus) => {
    startTransition(async () => {
      try {
        const params: Record<string, string | number> = { page: p, page_size: PAGE_SIZE };
        if (s) params.search = s;
        if (c) params.pays_destination = c;
        if (st) params.statut = st;
        const data = await scholarshipAdminRepository.getList(params);
        setScholarships(data.results);
        setTotal(data.count);
        setPage(p);
      } catch (e) {
        console.error(e);
      }
    });
  }, [search, filterCountry, filterStatus]);

  const handleSave = async (payload: CreateScholarshipPayload, visibility: Record<string, boolean>) => {
    try {
      let bourseId = editingScholarship?.id;
      const { image_id, ...scholarshipData } = payload;

      if (editingScholarship) {
        await scholarshipAdminRepository.patch(editingScholarship.id, scholarshipData);
      } else {
        const newBourse = await scholarshipAdminRepository.create(scholarshipData);
        bourseId = newBourse.id;
      }

      if (bourseId) {
        const visibilityPayload = Object.entries(visibility).map(([nom, val]) => ({
          nom_du_champ: nom,
          est_visible: val
        }));
        await scholarshipAdminRepository.bulkUpdateVisibility(bourseId, visibilityPayload);

        if (image_id) {
          await scholarshipAdminRepository.addImage(bourseId, {
            media_id: image_id,
            est_principale: true
          });
        }
      }

      fetchData(page);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erreur lors de la sauvegarde.";
      alert(msg);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await scholarshipAdminRepository.delete(id);
      setDeleteId(null);
      fetchData(page);
    } catch {
      alert("Erreur lors de la suppression.");
    }
  };

  const handleDuplicate = async (s: ScholarshipAdmin) => {
    try {
      // FIX : Utilisation de l'underscore pour ignorer les variables inutilisées
      const { id: _id, date_creation: _dc, date_modification: _dm, visibilites: _v, images: _i, ...copyData } = s;
      const payload = {
        ...copyData,
        titre_fr: `${s.titre_fr} (Copie)`,
        titre_en: `${s.titre_en} (Copy)`,
        statut: "brouillon" as ScholarshipStatus
      };
      
      await scholarshipAdminRepository.create(payload as CreateScholarshipPayload);
      fetchData(1);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erreur lors de la duplication.";
      alert(msg);
    }
  };

  const handleQuickToggle = async (s: ScholarshipAdmin) => {
    try {
      const newStatus = s.statut === "publie" ? "brouillon" : "publie";
      await scholarshipAdminRepository.patch(s.id, { statut: newStatus as ScholarshipStatus });
      fetchData(page);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erreur de statut.";
      alert(msg);
    }
  };

  return (
    <>
      <div className="space-y-5 max-w-[1400px]">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-serif font-bold text-[#0F1F3D]">Gestion des bourses</h1>
            <p className="text-slate-500 text-sm mt-0.5">{total} bourses au total</p>
          </div>
          <button onClick={() => { setEditingScholarship(null); setModalOpen(true); }} className="px-4 py-2.5 bg-[#0F1F3D] text-white text-sm font-semibold rounded-xl">
            Ajouter une bourse
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-400">Bourse</th>
                <th className="px-4 py-4 text-[10px] font-bold uppercase text-slate-400">Pays</th>
                <th className="px-4 py-4 text-[10px] font-bold uppercase text-slate-400">Niveau</th>
                <th className="px-4 py-4 text-[10px] font-bold uppercase text-slate-400">Statut</th>
                <th className="px-4 py-4 text-[10px] font-bold uppercase text-slate-400">Alerte</th>
                <th className="px-4 py-4 text-[10px] font-bold uppercase text-slate-400">Visibilité</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {scholarships.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/60 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-slate-800 truncate max-w-[280px]">{s.titre_fr}</p>
                    <p className="text-[11px] text-slate-400 truncate max-w-[280px]">{s.organisme_fr}</p>
                  </td>
                  <td className="px-4 py-4 text-lg"><Flag country={s.pays_destination} /></td>
                  <td className="px-4 py-4 text-xs text-slate-600 font-medium uppercase">{s.niveau}</td>
                  <td className="px-4 py-4">
                    <SalmaBadge status={s.statut as ScholarshipStatus} statusLabels={statusLabels} size="sm" dot />
                  </td>
                  <td className="px-4 py-4">
                    <button onClick={() => setAnnounceBourse(s)} className="px-3 py-1.5 bg-salma-gold/10 text-salma-gold-dark rounded-lg text-[10px] font-black uppercase">📢 Alerte</button>
                  </td>
                  <td className="px-4 py-4">
                    <button onClick={() => handleQuickToggle(s)} className={`relative w-9 h-5 rounded-full transition-all ${s.statut === "publie" ? "bg-emerald-500" : "bg-slate-200"}`}>
                      <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${s.statut === "publie" ? "translate-x-4" : ""}`} />
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setPreviewBourse(s)} className="p-1.5 text-slate-400 hover:text-emerald-500">👁️</button>
                      <button onClick={() => { setEditingScholarship(s); setModalOpen(true); }} className="p-1.5 text-slate-400 hover:text-[#1B365D]">✏️</button>
                      <button onClick={() => handleDuplicate(s)} className="p-1.5 text-slate-400 hover:text-[#C9A84C]">📋</button>
                      <button onClick={() => setDeleteId(s.id)} className="p-1.5 text-slate-400 hover:text-red-500">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && <ScholarshipModal scholarship={editingScholarship} onClose={() => setModalOpen(false)} onSave={handleSave} />}
      {previewBourse && <ScholarshipPreviewModal bourse={previewBourse} onClose={() => setPreviewBourse(null)} />}
      {announceBourse && <QuickAnnouncementModal bourse={announceBourse} onClose={() => setAnnounceBourse(null)} />}
      
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center">
            <h3 className="text-lg font-bold text-slate-800 mb-2">Supprimer la bourse ?</h3>
            <div className="flex gap-3 justify-center mt-6">
              <button onClick={() => setDeleteId(null)} className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold">Annuler</button>
              <button onClick={() => handleDelete(deleteId)} className="px-5 py-2.5 rounded-xl bg-red-600 text-white text-sm font-semibold">Supprimer</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}