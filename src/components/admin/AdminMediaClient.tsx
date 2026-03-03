"use client";

import { useState, useRef } from "react";
import { mediaRepository } from "@/repositories/media.repository";
import type { MediaAsset, PaginatedMediaResponse } from "@/types/api/media.types";
import SalmaButton from "../ui/SalmaButton";
import Image from "next/image";
import { getMediaUrl } from "@/lib/api-client";

interface Props {
  initialData: PaginatedMediaResponse;
}

export default function AdminMediaClient({ initialData }: Props) {
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
    } catch (error) {
      alert("Erreur lors de l'upload de l'image.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cette image définitivement ?")) return;
    try {
      await mediaRepository.delete(id);
      setMedias(medias.filter(m => m.id !== id));
    } catch (error) {
      alert("Erreur lors de la suppression.");
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    alert("Lien copié !");
  };

  return (
    <div className="space-y-6 max-w-[1200px]">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#0F1F3D]">Médiathèque</h1>
          <p className="text-slate-500 text-sm mt-0.5">Gérez les images utilisées sur votre plateforme.</p>
        </div>
        
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleUpload} 
          className="hidden" 
          accept="image/*"
        />
        
        <SalmaButton onClick={() => fileInputRef.current?.click()} disabled={uploading}>
          {uploading ? "Upload en cours..." : "+ Uploader une image"}
        </SalmaButton>
      </div>

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
                // On désactive l'optimisation Next.js pour les images du backend
                // Cela permet d'afficher l'image en direct sans passer par le proxy local
                unoptimized={true} 
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://placehold.co/400x400?text=Image+Introuvable";
                }}
              />
              <div className="p-3">
              <p className="text-[10px] font-bold text-slate-800 truncate">{m.nom_fichier}</p>
              {/* BLOC DE DEBUG À AJOUTER ICI */}
              <p className="text-[8px] text-blue-500 break-all mt-1 bg-blue-50 p-1 rounded">
                {getMediaUrl(m.url_fichier)}
              </p>
              {/* FIN DU BLOC DE DEBUG */}
              <p className="text-[9px] text-slate-400 uppercase mt-0.5">{(m.taille_octets / 1024).toFixed(0)} KB</p>
            </div>
              <div className="absolute inset-0 bg-salma-primary/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button 
                  onClick={() => copyToClipboard(m.url_fichier)}
                  className="p-2 bg-white rounded-lg text-salma-primary hover:bg-salma-gold transition-colors"
                  title="Copier le lien"
                >
                  🔗
                </button>
                <button 
                  onClick={() => handleDelete(m.id)}
                  className="p-2 bg-white rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                  title="Supprimer"
                >
                  🗑️
                </button>
              </div>
            </div>
            <div className="p-3">
              <p className="text-[10px] font-bold text-slate-800 truncate">{m.nom_fichier}</p>
              <p className="text-[9px] text-slate-400 uppercase mt-0.5">{(m.taille_octets / 1024).toFixed(0)} KB</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}