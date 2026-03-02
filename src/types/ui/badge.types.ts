// src/types/ui/badge.types.ts
// ==============================================================================
// Types pour le composant SalmaBadge — Système de badges/statuts SALMA
// ==============================================================================

import React from "react";

/**
 * Variantes sémantiques de couleur pour SalmaBadge.
 *
 * - `success`  : Vert — états positifs (publié, ouvert, traité)
 * - `warning`  : Ambre — états d'attention (en cours, en attente)
 * - `danger`   : Rouge — états critiques (urgent, fermé, expiré)
 * - `info`     : Bleu — états informatifs (nouveau, brouillon actif)
 * - `neutral`  : Gris — états inactifs (brouillon, archivé)
 * - `premium`  : Or SALMA — mise en avant, contenu premium
 */
export type SalmaBadgeVariant =
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral"
  | "premium";

/**
 * Tailles disponibles pour SalmaBadge.
 *
 * - `sm` : Compact (tableaux admin, listes denses)
 * - `md` : Standard (cartes, détails)
 */
export type SalmaBadgeSize = "sm" | "md";

/**
 * Statuts métier reconnus par SalmaBadge.
 *
 * Le composant peut recevoir directement un `status` métier (ex: "publie")
 * et le convertir automatiquement en variante sémantique + label i18n.
 */
export type SalmaBadgeStatus =
  | "publie"
  | "brouillon"
  | "archive"
  | "expire"
  | "ouvert"
  | "ferme"
  | "urgent"
  | "en_attente"
  | "nouveau"
  | "en_cours"
  | "traite";

/**
 * Props du composant SalmaBadge.
 *
 * Deux modes d'utilisation :
 *
 * **Mode 1 — Sémantique (manuel)** : on passe `variant` + `label`.
 * ```tsx
 * <SalmaBadge variant="success" label={t.active} />
 * ```
 *
 * **Mode 2 — Statut métier (auto)** : on passe `status` + `statusLabels`.
 * Le composant résout la variante et le label automatiquement.
 * ```tsx
 * <SalmaBadge status={scholarship.statut} statusLabels={t.statusLabels} />
 * ```
 */
export interface SalmaBadgeProps {
  /** Variante sémantique de couleur. Ignorée si `status` est fourni. @default "neutral" */
  variant?: SalmaBadgeVariant;

  /** Texte affiché dans le badge (i18n). Ignoré si `status` + `statusLabels` sont fournis. */
  label?: string;

  /** Statut métier — résolu automatiquement en variante + label. */
  status?: SalmaBadgeStatus;

  /**
   * Map de traduction des statuts métier (provient du dictionnaire i18n).
   * Requis si `status` est utilisé. Clés = valeurs de SalmaBadgeStatus.
   */
  statusLabels?: Record<string, string>;

  /** Taille du badge. @default "sm" */
  size?: SalmaBadgeSize;

  /** Affiche un petit dot (●) coloré à gauche du texte. @default false */
  dot?: boolean;

  /** Icône optionnelle affichée à gauche (ou après le dot). */
  icon?: React.ReactNode;

  /** Active l'animation pulse (attention visuelle — ex: statut "urgent"). @default false */
  pulse?: boolean;

  /** Classes CSS additionnelles. */
  className?: string;
}

/**
 * Type pour les labels de statuts dans les dictionnaires i18n.
 * Garantit que chaque statut métier a sa traduction.
 */
export type StatusLabelsDict = Record<SalmaBadgeStatus, string>;