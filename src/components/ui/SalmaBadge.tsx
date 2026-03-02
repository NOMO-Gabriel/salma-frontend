// src/components/ui/SalmaBadge.tsx
// ==============================================================================
// Composant badge/statut du Design System SALMA.
//
// Deux modes d'utilisation :
//   1. Sémantique : <SalmaBadge variant="success" label={t.active} />
//   2. Statut métier : <SalmaBadge status="publie" statusLabels={t.statusLabels} />
//
// Remplace les StatusBadge locaux dupliqués dans AdminDashboard et
// AdminScholarships pour offrir un composant unique, i18n et themé.
// ==============================================================================

import React from "react";
import type {
  SalmaBadgeProps,
  SalmaBadgeVariant,
  SalmaBadgeSize,
  SalmaBadgeStatus,
} from "@/types";

// — Mapping statut métier → variante sémantique --------------------------------

/**
 * Résolution automatique d'un statut métier vers sa variante de couleur.
 * Exporté pour être réutilisable dans la logique métier si besoin.
 */
export const STATUS_TO_VARIANT: Record<SalmaBadgeStatus, SalmaBadgeVariant> = {
  publie:     "success",
  ouvert:     "success",
  traite:     "success",
  en_cours:   "warning",
  en_attente: "warning",
  urgent:     "danger",
  ferme:      "danger",
  expire:     "danger",
  nouveau:    "info",
  brouillon:  "neutral",
  archive:    "neutral",
};

// — Map des styles par variante -------------------------------------------------

const VARIANT_STYLES: Record<SalmaBadgeVariant, string> = {
  success:
    "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800",
  warning:
    "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800",
  danger:
    "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800",
  info:
    "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800",
  neutral:
    "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800/50 dark:text-slate-400 dark:border-slate-700",
  premium:
    "bg-salma-gold/15 text-salma-gold-dark border-salma-gold/30 dark:bg-salma-gold/10 dark:text-salma-gold dark:border-salma-gold/20",
};

// — Map des tailles -------------------------------------------------------------

const SIZE_STYLES: Record<SalmaBadgeSize, string> = {
  sm: "px-2 py-0.5 text-[10px] gap-1",
  md: "px-2.5 py-1 text-xs gap-1.5",
};

// — Styles de base --------------------------------------------------------------

const BASE_STYLES =
  "inline-flex items-center rounded-full font-bold uppercase tracking-wider border leading-none select-none";

// — Composant principal ---------------------------------------------------------

/**
 * **SalmaBadge** — Badge de statut du Design System SALMA.
 *
 * Composant polyvalent pour afficher des statuts, des tags ou des labels
 * sur la vitrine visiteur et le dashboard admin.
 *
 * @remark Tous les textes visibles (label, statusLabels) doivent provenir
 * des dictionnaires i18n — aucun texte en dur.
 *
 * @example
 * // Mode sémantique — label i18n explicite
 * <SalmaBadge variant="success" label={t.statusLabels.publie} dot />
 *
 * @example
 * // Mode statut métier — résolution automatique
 * <SalmaBadge status={scholarship.statut} statusLabels={t.statusLabels} dot />
 *
 * @example
 * // Badge premium avec icône
 * <SalmaBadge variant="premium" label={t.featured} icon={<Star size={10} />} />
 *
 * @example
 * // Statut urgent avec pulse
 * <SalmaBadge status="urgent" statusLabels={t.statusLabels} pulse />
 */
export default function SalmaBadge({
  variant,
  label,
  status,
  statusLabels,
  size = "sm",
  dot = false,
  icon,
  pulse = false,
  className = "",
}: SalmaBadgeProps) {
  // — Résolution du mode (statut métier vs sémantique) --------------------------

  /** Variante résolue : depuis `status` si fourni, sinon `variant`, sinon fallback */
  const resolvedVariant: SalmaBadgeVariant =
    status && status in STATUS_TO_VARIANT
      ? STATUS_TO_VARIANT[status]
      : variant ?? "neutral";

  /** Label résolu : depuis `statusLabels[status]` si fourni, sinon `label`, sinon status brut */
  const resolvedLabel: string =
    status && statusLabels && statusLabels[status]
      ? statusLabels[status]
      : label ?? status ?? "";

  /** Le pulse est auto-activé pour le statut "urgent" sauf override explicite */
  const shouldPulse = pulse || status === "urgent";

  // — Construction des classes ---------------------------------------------------

  const classes = [
    BASE_STYLES,
    VARIANT_STYLES[resolvedVariant],
    SIZE_STYLES[size],
    shouldPulse ? "animate-pulse" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes}>
      {/* Dot indicateur (●) */}
      {dot && (
        <span
          className="w-1.5 h-1.5 rounded-full bg-current flex-shrink-0"
          aria-hidden="true"
        />
      )}

      {/* Icône optionnelle */}
      {icon && (
        <span className="flex-shrink-0" aria-hidden="true">
          {icon}
        </span>
      )}

      {/* Label texte (i18n) */}
      {resolvedLabel}
    </span>
  );
}