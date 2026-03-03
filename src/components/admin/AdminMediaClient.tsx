"use client";

import { useState, useRef } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { mediaRepository } from "@/repositories/media.repository";
import type { MediaAsset, PaginatedMediaResponse } from "@/types/api/media.types";
import SalmaButton from "../ui/SalmaButton";
import Image from "next/image";
import { getMediaUrl } from "@/lib/api-client";

interface Props {
  initialData: PaginatedMediaResponse;
}

export default function AdminMediaClient({ initialData }: Props) {
  const { dictionary } = useLanguage();
  const t = dictionary.admin.medias;
  const common = dictionary.admin.common;

  const [medias, setMedias] = useState<MediaAsset[]>(initialData.results);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const newMedia = await mediaRepository.upload({ fichier: file });
      setMedias([newMedia, ...medias]);
    } catch {
      alert(t.errorUpload);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t.confirmDelete)) return;
    try {
      await mediaRepository.delete(id);
      setMedias(medias.filter(m => m.id !== id));
    } catch {
      alert(t.errorDelete);
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    alert(t.copyLink);
  };

  return (
    <div className="space-y-6 max-w-[1200px]">
      {/* HEADER */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#0F1F3D]">{t.title}</h1>
          <p className="text-slate-500 text-sm mt-0.5">{t.subtitle}</p>
        </div>
        
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleUpload} 
          className="hidden" 
          accept="image/*"
        />
        
        <SalmaButton onClick={() => fileInputRef.current?.click()} disabled={uploading}>
          {uploading ? t.uploading : t.uploadBtn}
        </SalmaButton>
      </div>

      {/* GRILLE DE MÉDIAS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {medias.map((m) => (
          <div key={m.id} className="group bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-all">
            <div className="relative aspect-square bg-slate-50">
              <Image 
                src={getMediaUrl(m.url_fichier) || "/image-placeholder.jpg"} 
                alt={m.nom_fichier} 
                fill 
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                priority={medias.indexOf(m) === 0}
                className="object-cover"
                unoptimized={true} 
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://placehold.co/400x400?text=Image+Introuvable";
                }}
              />
              
              {/* OVERLAY D'ACTIONS */}
              <div className="absolute inset-0 bg-salma-primary/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button 
                  onClick={() => copyToClipboard(m.url_fichier)}
                  className="p-2 bg-white rounded-lg text-salma-primary hover:bg-salma-gold transition-colors"
                  title={common.edit}
                >
                  🔗
                </button>
                <button 
                  onClick={() => handleDelete(m.id)}
                  className="p-2 bg-white rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                  title={common.delete}
                >
                  🗑️
                </button>
              </div>
            </div>

            {/* INFOS FICHIER */}
            <div className="p-3">
              <p className="text-[10px] font-bold text-slate-800 truncate">{m.nom_fichier}</p>
              <p className="text-[9px] text-slate-400 uppercase mt-0.5">
                {(m.taille_octets / 1024).toFixed(0)} KB
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}