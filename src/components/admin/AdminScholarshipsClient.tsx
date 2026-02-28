"use client";
// src/components/admin/AdminScholarshipsClient.tsx
// ==============================================================================
//  Gestion des bourses — Tableau + CRUD complet
//  - Tableau avec pagination, recherche, filtres
//  - Modal création/édition avec tous les champs
//  - Toggle visibilité par champ (field_visibility)
//  - Publication / dépublication rapide
//  - Duplication + suppression
// ==============================================================================

import { useState, useCallback, useTransition } from "react";
import { scholarshipRepository } from "@/repositories/scholarship.repository";
import type {
  ScholarshipAdmin,
  CreateScholarshipPayload,
} from "@/types/api/scholarship.types";

// ---------------------------------------------------------------------------
//  Helpers
// ---------------------------------------------------------------------------

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    publie: "bg-emerald-100 text-emerald-700 border-emerald-200",
    brouillon: "bg-slate-100 text-slate-600 border-slate-200",
    archive: "bg-orange-100 text-orange-700 border-orange-200",
    ouvert: "bg-emerald-100 text-emerald-700 border-emerald-200",
    ferme: "bg-slate-100 text-slate-600 border-slate-200",
    urgent: "bg-red-100 text-red-700 border-red-200",
    en_attente: "bg-amber-100 text-amber-700 border-amber-200",
  };
  const labels: Record<string, string> = {
    publie: "Publié", brouillon: "Brouillon", archive: "Archivé",
    ouvert: "Ouvert", ferme: "Fermé", urgent: "Urgent", en_attente: "En attente",
  };
  const cls = map[status] || "bg-slate-100 text-slate-600 border-slate-200";
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${cls}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {labels[status] || status}
    </span>
  );
}

function Flag({ country }: { country: string }) {
  return country === "chine" ? "🇨🇳" : country === "allemagne" ? "🇩🇪" : "🌍";
}

// ---------------------------------------------------------------------------
//  Modal Scholarship Form
// ---------------------------------------------------------------------------

const EMPTY_FORM: Partial<CreateScholarshipPayload> = {
  titre_fr: "",
  titre_en: "",
  organisme_fr: "",
  organisme_en: "",
  description_fr: "",
  description_en: "",
  pays_destination: "chine",
  niveau: "MASTER",
  type_couverture: "TOTALE",
  statut: "brouillon",
  date_limite: "",
  lien_officiel: "",
  exigence_langue_fr: "",
  exigence_langue_en: "",
  est_publie: false,
  est_en_avant: false,
};

const FIELD_VISIBILITY_DEFAULTS: Record<string, boolean> = {
  description: true,
  date_limite: true,
  organisme: true,
  niveau: true,
  type_couverture: true,
  exigence_langue: true,
  domaines: true,
  avantages: true,
  eligibilites: true,
  lien_officiel: false,
  prix: false,
};

function ScholarshipModal({
  scholarship,
  onClose,
  onSave,
}: {
  scholarship: ScholarshipAdmin | null; // null = création
  onClose: () => void;
  onSave: (data: CreateScholarshipPayload) => Promise<void>;
}) {
  const [form, setForm] = useState<Partial<CreateScholarshipPayload>>(
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
          est_publie: scholarship.est_publie,
          est_en_avant: scholarship.est_en_avant,
        }
      : EMPTY_FORM
  );

  const [visibility, setVisibility] = useState<Record<string, boolean>>(
    scholarship?.field_visibility || FIELD_VISIBILITY_DEFAULTS
  );

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"info" | "visibility" | "avanced">("info");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.titre_fr?.trim()) { setError("Le titre FR est requis."); return; }
    setSaving(true);
    setError("");
    try {
      await onSave({ ...form, field_visibility: visibility } as CreateScholarshipPayload);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setSaving(false);
    }
  };

  const set = (field: string, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const inputCls = "w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#1B365D]/20 focus:border-[#1B365D] placeholder:text-slate-300 transition-all";
  const labelCls = "block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider";
  const selectCls = `${inputCls} appearance-none cursor-pointer`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-3xl max-h-[90vh] flex flex-col bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 bg-white">
          <div>
            <h2 className="text-2xl font-serif font-bold text-[#0F1F3D]">
              {scholarship ? "Modifier la bourse" : "Nouvelle bourse"}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {scholarship ? `ID : ${scholarship.id}` : "Remplissez les informations de la bourse"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-8 pt-4 pb-0 border-b border-slate-100 bg-slate-50/50">
          {([
            { key: "info", label: "Informations" },
            { key: "visibility", label: "Visibilité champs" },
            { key: "avanced", label: "Options" },
          ] as const).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-colors border-b-2 -mb-px ${
                activeTab === tab.key
                  ? "text-[#0F1F3D] border-[#C9A84C] bg-white"
                  : "text-slate-400 border-transparent hover:text-slate-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Body scrollable */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-8 space-y-6">
            {activeTab === "info" && (
              <>
                {/* Section : Titre */}
                <div>
                  <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="w-4 h-px bg-slate-300 inline-block" />
                    Titre & Organisme
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Titre (FR) *</label>
                      <input className={inputCls} value={form.titre_fr || ""} onChange={(e) => set("titre_fr", e.target.value)} placeholder="ex: Bourse CSC Chine 2026" required />
                    </div>
                    <div>
                      <label className={labelCls}>Titre (EN)</label>
                      <input className={inputCls} value={form.titre_en || ""} onChange={(e) => set("titre_en", e.target.value)} placeholder="ex: CSC China Scholarship 2026" />
                    </div>
                    <div>
                      <label className={labelCls}>Organisme (FR)</label>
                      <input className={inputCls} value={form.organisme_fr || ""} onChange={(e) => set("organisme_fr", e.target.value)} placeholder="ex: Conseil des Bourses de Chine" />
                    </div>
                    <div>
                      <label className={labelCls}>Organisme (EN)</label>
                      <input className={inputCls} value={form.organisme_en || ""} onChange={(e) => set("organisme_en", e.target.value)} placeholder="ex: China Scholarship Council" />
                    </div>
                  </div>
                </div>

                {/* Section : Caractéristiques */}
                <div>
                  <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="w-4 h-px bg-slate-300 inline-block" />
                    Caractéristiques
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className={labelCls}>Destination</label>
                      <select className={selectCls} value={form.pays_destination || "chine"} onChange={(e) => set("pays_destination", e.target.value)}>
                        <option value="chine">🇨🇳 Chine</option>
                        <option value="allemagne">🇩🇪 Allemagne</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>Niveau d&apos;études</label>
                      <select className={selectCls} value={form.niveau || "MASTER"} onChange={(e) => set("niveau", e.target.value)}>
                        <option value="LICENCE">Licence</option>
                        <option value="MASTER">Master</option>
                        <option value="DOCTORAT">Doctorat</option>
                        <option value="POST_DOC">Post-Doctorat</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>Type de couverture</label>
                      <select className={selectCls} value={form.type_couverture || "TOTALE"} onChange={(e) => set("type_couverture", e.target.value)}>
                        <option value="TOTALE">Totale</option>
                        <option value="PARTIELLE">Partielle</option>
                        <option value="SCOLARITE">Scolarité</option>
                        <option value="ALLOCATION">Allocation</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>Statut</label>
                      <select className={selectCls} value={form.statut || "brouillon"} onChange={(e) => set("statut", e.target.value)}>
                        <option value="brouillon">Brouillon</option>
                        <option value="ouvert">Ouvert</option>
                        <option value="ferme">Fermé</option>
                        <option value="urgent">Urgent</option>
                        <option value="en_attente">En attente</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>Date limite</label>
                      <input type="date" className={inputCls} value={form.date_limite || ""} onChange={(e) => set("date_limite", e.target.value)} />
                    </div>
                    <div>
                      <label className={labelCls}>Lien officiel</label>
                      <input type="url" className={inputCls} value={form.lien_officiel || ""} onChange={(e) => set("lien_officiel", e.target.value)} placeholder="https://..." />
                    </div>
                  </div>
                </div>

                {/* Section : Description */}
                <div>
                  <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="w-4 h-px bg-slate-300 inline-block" />
                    Description
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Description (FR)</label>
                      <textarea
                        className={`${inputCls} min-h-[120px] resize-y`}
                        value={form.description_fr || ""}
                        onChange={(e) => set("description_fr", e.target.value)}
                        placeholder="Décrivez la bourse en français..."
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Description (EN)</label>
                      <textarea
                        className={`${inputCls} min-h-[120px] resize-y`}
                        value={form.description_en || ""}
                        onChange={(e) => set("description_en", e.target.value)}
                        placeholder="Describe the scholarship in English..."
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Exigence langue (FR)</label>
                      <input className={inputCls} value={form.exigence_langue_fr || ""} onChange={(e) => set("exigence_langue_fr", e.target.value)} placeholder="ex: HSK 4 ou sans exigence" />
                    </div>
                    <div>
                      <label className={labelCls}>Exigence langue (EN)</label>
                      <input className={inputCls} value={form.exigence_langue_en || ""} onChange={(e) => set("exigence_langue_en", e.target.value)} placeholder="ex: HSK 4 or no requirement" />
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === "visibility" && (
              <div>
                <p className="text-sm text-slate-500 mb-6 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                  ⚠️ Contrôlez ce que les visiteurs voient sur la vitrine. Les champs désactivés sont masqués même s&apos;ils ont une valeur en base.
                </p>
                <div className="space-y-3">
                  {Object.entries({
                    description: "Description de la bourse",
                    date_limite: "Date limite de candidature",
                    organisme: "Organisme financeur",
                    niveau: "Niveau d'études requis",
                    type_couverture: "Type de couverture (totale, partielle…)",
                    exigence_langue: "Exigences linguistiques",
                    domaines: "Domaines d'études",
                    avantages: "Avantages (logement, allocation…)",
                    eligibilites: "Critères d'éligibilité",
                    lien_officiel: "Lien officiel de candidature",
                    prix: "💰 Prix / Frais d'inscription",
                  }).map(([key, label]) => {
                    const isEnabled = visibility[key] ?? false;
                    const isPrice = key === "prix";
                    return (
                      <div
                        key={key}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
                          isEnabled ? "bg-white border-slate-200" : "bg-slate-50 border-slate-100"
                        } ${isPrice ? "border-red-200 bg-red-50/30" : ""}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs ${
                            isEnabled ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-400"
                          }`}>
                            {isEnabled ? "✓" : "—"}
                          </div>
                          <div>
                            <p className={`text-sm font-medium ${isEnabled ? "text-slate-800" : "text-slate-400"}`}>
                              {label}
                            </p>
                            {isPrice && (
                              <p className="text-[10px] text-red-500 font-medium">
                                Recommandé : masqué sur la vitrine
                              </p>
                            )}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setVisibility((prev) => ({ ...prev, [key]: !prev[key] }))}
                          className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none ${
                            isEnabled ? "bg-[#1B365D]" : "bg-slate-200"
                          }`}
                        >
                          <span
                            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                              isEnabled ? "translate-x-5" : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === "avanced" && (
              <div className="space-y-4">
                <div className={`flex items-center justify-between px-4 py-4 rounded-xl border border-slate-200 bg-white`}>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">Publier sur le site</p>
                    <p className="text-xs text-slate-400">Rendre cette bourse visible aux visiteurs</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => set("est_publie", !form.est_publie)}
                    className={`relative w-11 h-6 rounded-full transition-colors ${form.est_publie ? "bg-[#1B365D]" : "bg-slate-200"}`}
                  >
                    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${form.est_publie ? "translate-x-5" : ""}`} />
                  </button>
                </div>

                <div className={`flex items-center justify-between px-4 py-4 rounded-xl border border-[#C9A84C]/30 bg-[#C9A84C]/5`}>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">Mettre en avant</p>
                    <p className="text-xs text-slate-400">Afficher en priorité sur la page d&apos;accueil</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => set("est_en_avant", !form.est_en_avant)}
                    className={`relative w-11 h-6 rounded-full transition-colors ${form.est_en_avant ? "bg-[#C9A84C]" : "bg-slate-200"}`}
                  >
                    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${form.est_en_avant ? "translate-x-5" : ""}`} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="mx-8 mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Footer */}
          <div className="sticky bottom-0 flex justify-end gap-3 px-8 py-5 border-t border-slate-100 bg-white">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-xl bg-[#0F1F3D] text-white text-sm font-semibold hover:bg-[#1B365D] transition-colors shadow-md disabled:opacity-60 flex items-center gap-2"
            >
              {saving ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Enregistrement...
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {scholarship ? "Mettre à jour" : "Créer la bourse"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
//  Composant principal — Tableau
// ---------------------------------------------------------------------------

interface Props {
  initialData: {
    results: ScholarshipAdmin[];
    count: number;
    next: string | null;
    previous: string | null;
  };
}

export default function AdminScholarshipsClient({ initialData }: Props) {
  const [scholarships, setScholarships] = useState(initialData.results);
  const [total, setTotal] = useState(initialData.count);
  const [search, setSearch] = useState("");
  const [filterCountry, setFilterCountry] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingScholarship, setEditingScholarship] = useState<ScholarshipAdmin | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const PAGE_SIZE = 20;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  // --- Fetch ---
  const fetchData = useCallback(async (p = 1, s = search, c = filterCountry, st = filterStatus) => {
    startTransition(async () => {
      try {
        const params: Record<string, string | number> = { page: p, page_size: PAGE_SIZE };
        if (s) params.search = s;
        if (c) params.pays_destination = c;
        if (st) params.statut = st;
        const data = await scholarshipRepository.adminGetList(params);
        setScholarships(data.results);
        setTotal(data.count);
        setPage(p);
      } catch (e) {
        console.error(e);
      }
    });
  }, [search, filterCountry, filterStatus]);

  // --- Actions ---
  const handleSave = async (payload: CreateScholarshipPayload) => {
    if (editingScholarship) {
      await scholarshipRepository.adminUpdate(editingScholarship.id, payload);
    } else {
      await scholarshipRepository.adminCreate(payload);
    }
    fetchData(1);
  };

  const handleDelete = async (id: string) => {
    await scholarshipRepository.adminDelete(id);
    setDeleteId(null);
    fetchData(page);
  };

  const handleDuplicate = async (s: ScholarshipAdmin) => {
    await scholarshipRepository.adminCreate({
      ...s,
      titre_fr: `${s.titre_fr} (copie)`,
      titre_en: `${s.titre_en} (copy)`,
      est_publie: false,
      statut: "brouillon",
    } as CreateScholarshipPayload);
    fetchData(page);
  };

  const handleQuickToggle = async (s: ScholarshipAdmin) => {
    await scholarshipRepository.adminPatch(s.id, { est_publie: !s.est_publie });
    fetchData(page);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchData(1);
  };

  return (
    <div className="space-y-5 max-w-[1400px]">
      {/* ── Header ───────────────────────────────────────────────── */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#0F1F3D]">Gestion des bourses</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {total} bourse{total !== 1 ? "s" : ""} au total
          </p>
        </div>
        <button
          onClick={() => { setEditingScholarship(null); setModalOpen(true); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0F1F3D] text-white text-sm font-semibold rounded-xl hover:bg-[#1B365D] transition-colors shadow-md shadow-[#0F1F3D]/20"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Ajouter une bourse
        </button>
      </div>

      {/* ── Filtres ───────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
        <form onSubmit={handleSearch} className="flex flex-wrap gap-3 items-center">
          {/* Recherche */}
          <div className="relative flex-1 min-w-[200px]">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher une bourse..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B365D]/20 focus:border-[#1B365D] transition-all"
            />
          </div>

          {/* Filtre pays */}
          <select
            value={filterCountry}
            onChange={(e) => { setFilterCountry(e.target.value); fetchData(1, search, e.target.value, filterStatus); }}
            className="px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#1B365D]/20 appearance-none cursor-pointer"
          >
            <option value="">Tous les pays</option>
            <option value="chine">🇨🇳 Chine</option>
            <option value="allemagne">🇩🇪 Allemagne</option>
          </select>

          {/* Filtre statut */}
          <select
            value={filterStatus}
            onChange={(e) => { setFilterStatus(e.target.value); fetchData(1, search, filterCountry, e.target.value); }}
            className="px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#1B365D]/20 appearance-none cursor-pointer"
          >
            <option value="">Tous les statuts</option>
            <option value="ouvert">Ouvert</option>
            <option value="ferme">Fermé</option>
            <option value="urgent">Urgent</option>
            <option value="brouillon">Brouillon</option>
            <option value="en_attente">En attente</option>
          </select>

          <button
            type="submit"
            disabled={isPending}
            className="px-4 py-2.5 bg-[#0F1F3D] text-white rounded-xl text-sm font-semibold hover:bg-[#1B365D] transition-colors disabled:opacity-60"
          >
            {isPending ? "…" : "Rechercher"}
          </button>

          {(search || filterCountry || filterStatus) && (
            <button
              type="button"
              onClick={() => { setSearch(""); setFilterCountry(""); setFilterStatus(""); fetchData(1, "", "", ""); }}
              className="px-3 py-2.5 text-slate-400 hover:text-slate-600 text-sm transition-colors"
            >
              Réinitialiser
            </button>
          )}
        </form>
      </div>

      {/* ── Tableau ───────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Bourse</th>
                <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Pays</th>
                <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Niveau</th>
                <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Deadline</th>
                <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Statut</th>
                <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Publié</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {isPending ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4"><div className="h-4 bg-slate-100 rounded w-48" /></td>
                    <td className="px-4 py-4"><div className="h-4 bg-slate-100 rounded w-8" /></td>
                    <td className="px-4 py-4"><div className="h-4 bg-slate-100 rounded w-16" /></td>
                    <td className="px-4 py-4"><div className="h-4 bg-slate-100 rounded w-20" /></td>
                    <td className="px-4 py-4"><div className="h-6 bg-slate-100 rounded-full w-16" /></td>
                    <td className="px-4 py-4"><div className="h-6 bg-slate-100 rounded-full w-10" /></td>
                    <td className="px-6 py-4"><div className="h-4 bg-slate-100 rounded w-16 ml-auto" /></td>
                  </tr>
                ))
              ) : scholarships.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center text-slate-400 text-sm">
                    Aucune bourse trouvée. <button onClick={() => { setModalOpen(true); setEditingScholarship(null); }} className="text-[#1B365D] font-semibold hover:underline">Créer la première</button>
                  </td>
                </tr>
              ) : (
                scholarships.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/60 transition-colors group">
                    {/* Titre */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#0F1F3D]/5 flex items-center justify-center text-base flex-shrink-0">
                          <Flag country={s.pays_destination} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800 max-w-[280px] truncate">{s.titre_fr}</p>
                          <p className="text-[11px] text-slate-400 truncate max-w-[280px]">{s.organisme_fr}</p>
                        </div>
                      </div>
                    </td>
                    {/* Pays */}
                    <td className="px-4 py-4 text-lg">
                      <Flag country={s.pays_destination} />
                    </td>
                    {/* Niveau */}
                    <td className="px-4 py-4 text-xs text-slate-600 font-medium">{s.niveau}</td>
                    {/* Deadline */}
                    <td className="px-4 py-4 text-xs text-slate-600">
                      {s.date_limite
                        ? new Date(s.date_limite).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "2-digit" })
                        : <span className="text-slate-300">—</span>}
                    </td>
                    {/* Statut */}
                    <td className="px-4 py-4"><StatusBadge status={s.statut} /></td>
                    {/* Toggle publié */}
                    <td className="px-4 py-4">
                      <button
                        onClick={() => handleQuickToggle(s)}
                        className={`relative w-9 h-5 rounded-full transition-colors ${s.est_publie ? "bg-[#1B365D]" : "bg-slate-200"}`}
                      >
                        <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${s.est_publie ? "translate-x-4" : ""}`} />
                      </button>
                    </td>
                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {/* Éditer */}
                        <button
                          onClick={() => { setEditingScholarship(s); setModalOpen(true); }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-[#1B365D] hover:bg-[#1B365D]/5 transition-colors"
                          title="Modifier"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                          </svg>
                        </button>
                        {/* Dupliquer */}
                        <button
                          onClick={() => handleDuplicate(s)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-[#C9A84C] hover:bg-[#C9A84C]/5 transition-colors"
                          title="Dupliquer"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                          </svg>
                        </button>
                        {/* Supprimer */}
                        <button
                          onClick={() => setDeleteId(s.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                          title="Supprimer"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Page <span className="font-bold text-slate-700">{page}</span> sur <span className="font-bold text-slate-700">{totalPages}</span>
              {" "}— {total} résultats
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => fetchData(page - 1)}
                disabled={page === 1}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-white disabled:opacity-40 transition-colors"
              >
                ← Précédent
              </button>
              <button
                onClick={() => fetchData(page + 1)}
                disabled={page === totalPages}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-white disabled:opacity-40 transition-colors"
              >
                Suivant →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Modal Création / Édition ──────────────────────────────── */}
      {modalOpen && (
        <ScholarshipModal
          scholarship={editingScholarship}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}

      {/* ── Confirmation suppression ──────────────────────────────── */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6 text-red-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Supprimer la bourse ?</h3>
            <p className="text-sm text-slate-500 mb-6">Cette action est irréversible. La bourse sera définitivement supprimée.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDeleteId(null)} className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-colors">
                Annuler
              </button>
              <button onClick={() => handleDelete(deleteId)} className="px-5 py-2.5 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors shadow-md">
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
