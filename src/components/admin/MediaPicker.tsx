"use client";
import { useEffect, useState } from "react";
import { mediaRepository } from "@/repositories/media.repository";
import { MediaAsset } from "@/types";
import { getMediaUrl } from "@/lib/api-client";
import Image from "next/image";

export default function MediaPicker({ onSelect }: { onSelect: (m: MediaAsset) => void }) {
  const [medias, setMedias] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mediaRepository.getList({ page_size: 20 }).then(res => {
      setMedias(res.results);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-10 text-center animate-pulse text-salma-gold font-bold">Chargement de la bibliothèque...</div>;

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-h-60 overflow-y-auto p-2 bg-slate-50 rounded-2xl border border-slate-100">
      {medias.map(m => (
        <button 
          key={m.id} 
          onClick={() => onSelect(m)}
          className="relative aspect-square rounded-lg overflow-hidden border-2 border-transparent hover:border-salma-gold transition-all group"
        >
          <Image src={getMediaUrl(m.url_fichier) || ""} alt={m.nom_fichier} fill className="object-cover" />
          <div className="absolute inset-0 bg-salma-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      ))}
    </div>
  );
}