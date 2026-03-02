"use client";

import { useState } from "react";
import type { SitePageAdmin, ContentBlock } from "@/types/api/cms.types";
import CmsBlockEditorModal from "./CmsBlockEditorModal";

interface Props {
  initialPages: SitePageAdmin[];
}

export default function AdminCmsClient({ initialPages }: Props) {
  const [pages, setPages] = useState<SitePageAdmin[]>(Array.isArray(initialPages) ? initialPages : []);
  const [selectedPage, setSelectedPage] = useState<SitePageAdmin | null>(null);
  const [editingBlock, setEditingBlock] = useState<ContentBlock | null>(null);

  // Rafraîchir les données après une modification
  const refreshData = async () => {
    const { cmsAdminRepository } = await import("@/repositories/cms.repository");
    // 1. On récupère la réponse complète
    const response = await cmsAdminRepository.getPages();
    // 2. On extrait le tableau results
    const updatedPages = response.results || [];
    
    setPages(updatedPages);
    
    if (selectedPage) {
      const updatedSelected = updatedPages.find(p => p.id === selectedPage.id);
      if (updatedSelected) setSelectedPage(updatedSelected);
    }
  };

  return (
    <div className="space-y-8 max-w-[1200px]">
      {/* Header */}
      <div className="flex items-center gap-4">
        {selectedPage && (
          <button 
            onClick={() => setSelectedPage(null)}
            className="w-10 h-10 rounded-full bg-white border border-salma-border flex items-center justify-center hover:bg-salma-bg transition-colors"
          >
            ←
          </button>
        )}
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#0F1F3D]">
            {selectedPage ? `Édition : ${selectedPage.titre_fr}` : "Gestion du Contenu (CMS)"}
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {selectedPage ? "Modifiez les blocs de cette page" : "Sélectionnez une page pour modifier ses textes."}
          </p>
        </div>
      </div>

      {!selectedPage ? (
        /* Liste des Pages */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pages.map((page) => (
            <div 
              key={page.id}
              onClick={() => setSelectedPage(page)}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all group cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#1B365D]/5 flex items-center justify-center text-2xl">📄</div>
                <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${page.est_publiee ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                  {page.est_publiee ? 'Publiée' : 'Brouillon'}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-800 group-hover:text-[#1B365D] transition-colors">{page.titre_fr}</h3>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-medium">/{page.slug}</p>
              <div className="mt-6 pt-4 border-t border-slate-50 flex justify-between items-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase">{page.blocs.length} Blocs</span>
                <span className="text-sm font-bold text-[#C9A84C]">Modifier →</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Liste des Blocs de la page sélectionnée */
        <div className="space-y-4">
          {selectedPage.blocs.map((block) => (
            <div 
              key={block.id}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2 py-0.5 bg-salma-bg border border-salma-border rounded text-[9px] font-black uppercase text-salma-gold tracking-tighter">
                    {block.type_bloc}
                  </span>
                  <h4 className="font-bold text-salma-primary">{block.cle_bloc}</h4>
                </div>
                <p className="text-sm text-salma-text-muted line-clamp-2 italic">"{block.contenu_fr}"</p>
              </div>
              <button 
                onClick={() => setEditingBlock(block)}
                className="px-6 py-2 bg-salma-bg border border-salma-border rounded-xl text-xs font-bold text-salma-primary hover:border-salma-gold transition-all"
              >
                Éditer le texte
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal d'édition */}
      {editingBlock && selectedPage && (
        <CmsBlockEditorModal 
          pageId={selectedPage.id}
          block={editingBlock}
          onClose={() => setEditingBlock(null)}
          onSave={refreshData}
        />
      )}
    </div>
  );
}