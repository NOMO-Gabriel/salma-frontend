// src/components/ui/ChatbotWidget.tsx
// ==============================================================================
// Widget Chatbot IA — Design System SALMA (Premium)
//
// Features :
//   - Quick Actions (boutons de conversion au démarrage)
//   - Fallback statique transparent (chatbot.fallback.ts)
//   - Animations premium (scale/fade ouverture, slide-up messages)
//   - Bouton WhatsApp quand le bot ne sait pas répondre
//   - Mode statique complet (NEXT_PUBLIC_STATIC_CONTENT=true)
//
// Flux de réponse :
//   1. Tentative API (chatbotRepository.query) — sauf si mode statique
//   2. Recherche locale (chatbot.fallback.ts) — mots-clés
//   3. Message "je n'ai pas la réponse" + bouton WhatsApp
//
// RÈGLE : Zéro texte en dur — labels viennent de la prop `labels`.
// ==============================================================================

"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { chatbotRepository } from "@/repositories/chatbot.repository";
import { eventsRepository } from "@/repositories/events.repository";
import { searchFallback } from "@/lib/chatbot.fallback";
import type {
  ChatbotWidgetProps,
  ChatbotMessage,
  ChatbotQuickAction,
} from "@/types/ui/chatbot-widget.types";

// — Constantes ------------------------------------------------------------------

const DEFAULT_WHATSAPP = "237699450984";
const IS_STATIC = process.env.NEXT_PUBLIC_STATIC_CONTENT === "true";

// — Sous-composant : Bulle de message ------------------------------------------

/**
 * Bulle de message avec style asymétrique et animation slide-up.
 */
function MessageBubble({
  message,
  whatsappUrl,
  whatsappLabel,
}: {
  message: ChatbotMessage;
  whatsappUrl: string;
  whatsappLabel: string;
}) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} animate-[slideUp_0.3s_ease-out]`}
    >
      <div className="flex flex-col gap-2 max-w-[85%]">
        <div
          className={`p-3.5 text-sm leading-relaxed ${
            isUser
              ? "bg-salma-primary text-white rounded-2xl rounded-tr-sm shadow-md"
              : "bg-white dark:bg-bg border border-border text-text rounded-2xl rounded-tl-sm shadow-sm"
          }`}
        >
          {message.text}
        </div>

        {/* Bouton WhatsApp fallback */}
        {message.showWhatsApp && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 self-start px-4 py-2 bg-[#25D366] text-white text-xs font-bold rounded-full hover:brightness-110 transition-all active:scale-95 shadow-md"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.558 0 11.895-5.335 11.898-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {whatsappLabel}
          </a>
        )}
      </div>
    </div>
  );
}

// — Sous-composant : Quick Actions ---------------------------------------------

/**
 * Grille de boutons Quick Action affichée après le message de bienvenue.
 */
function QuickActions({
  actions,
  onSelect,
}: {
  actions: ChatbotQuickAction[];
  onSelect: (action: ChatbotQuickAction) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 animate-[slideUp_0.4s_ease-out]">
      {actions.map((action) => (
        <button
          key={action.id}
          onClick={() => onSelect(action)}
          className="px-3 py-2 text-xs font-bold bg-salma-gold/10 text-salma-gold-dark dark:text-salma-gold border border-salma-gold/20 rounded-full hover:bg-salma-gold/20 hover:border-salma-gold/40 transition-all active:scale-95"
        >
          {action.label}
        </button>
      ))}
    </div>
  );
}

// — Composant principal ---------------------------------------------------------

/**
 * **ChatbotWidget** — Widget chatbot IA premium SALMA.
 *
 * Widget flottant fixé en bas à droite avec Quick Actions de conversion,
 * fallback statique intelligent et bouton WhatsApp de secours.
 *
 * @remark Tous les textes visibles viennent de la prop `labels`.
 * Le composant garde `useLanguage()` en interne pour la locale API.
 *
 * @example
 * <ChatbotWidget labels={common.chatbot} />
 */
export default function ChatbotWidget({
  labels,
  whatsappNumber = DEFAULT_WHATSAPP,
  className = "",
}: ChatbotWidgetProps) {
  const { locale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatbotMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  // — Auto-scroll vers le bas ---------------------------------------------------

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // — Message de bienvenue à l'ouverture ----------------------------------------

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ role: "bot", text: labels.welcomeMessage }]);
      eventsRepository.trackChatbotOpen();
    }
  }, [isOpen, labels.welcomeMessage, messages.length]);

  // — Logique de résolution de réponse ------------------------------------------

  /**
   * Résout une réponse pour la question donnée.
   * Flux : API → Fallback local → Message "pas de réponse" + WhatsApp
   */
  const resolveAnswer = useCallback(
    async (question: string): Promise<ChatbotMessage> => {
      // Étape 1 : Tentative API (sauf mode statique)
      if (!IS_STATIC) {
        try {
          const response = await chatbotRepository.query({
            message: question,
            langue: locale,
          });
          if (response.reponse) {
            return { role: "bot", text: response.reponse };
          }
        } catch {
          // API indisponible — on passe au fallback
        }
      }

      // Étape 2 : Recherche fallback locale
      const fallback = searchFallback(question);
      if (fallback) {
        const answer = locale === "fr" ? fallback.answer_fr : fallback.answer_en;
        return { role: "bot", text: answer };
      }

      // Étape 3 : Aucune réponse — message + WhatsApp
      return {
        role: "bot",
        text: labels.noAnswer,
        showWhatsApp: true,
      };
    },
    [locale, labels.noAnswer]
  );

  // — Envoi d'un message --------------------------------------------------------

  const handleSend = useCallback(
    async (text?: string) => {
      const question = (text || input).trim();
      if (!question || isLoading) return;

      setInput("");
      setShowQuickActions(false);
      setMessages((prev) => [...prev, { role: "user", text: question }]);
      setIsLoading(true);

      const answer = await resolveAnswer(question);
      setMessages((prev) => [...prev, answer]);
      setIsLoading(false);
    },
    [input, isLoading, resolveAnswer]
  );

  // — Quick Action click --------------------------------------------------------

  const handleQuickAction = useCallback(
    (action: ChatbotQuickAction) => {
      handleSend(action.query);
    },
    [handleSend]
  );

  // — Toggle ouverture/fermeture ------------------------------------------------

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // — Rendu ---------------------------------------------------------------------

  return (
    <div className={`fixed bottom-28 right-6 z-[70] flex flex-col items-end ${className}`}>

      {/* ── Fenêtre de Chat ──────────────────────────────────────────── */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 h-[480px] bg-white dark:bg-surface border border-border rounded-2xl shadow-salma-lg flex flex-col overflow-hidden origin-bottom-right animate-[chatOpen_0.3s_ease-out]">

          {/* Header */}
          <div className="bg-salma-primary p-4 text-white flex justify-between items-center flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-salma-gold flex items-center justify-center text-salma-primary font-bold text-sm">
                S
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-sm leading-tight">
                  {labels.title}
                </span>
                <span className="text-[10px] text-white/60 font-sans">
                  {isLoading ? labels.thinking : "Online"}
                </span>
              </div>
            </div>
            <button
              onClick={handleToggle}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
              aria-label={labels.closeAriaLabel}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-bg/30 dark:bg-bg/50"
          >
            {messages.map((m, i) => (
              <MessageBubble
                key={i}
                message={m}
                whatsappUrl={whatsappUrl}
                whatsappLabel={labels.whatsappFallback}
              />
            ))}

            {/* Quick Actions (affichées après le message de bienvenue) */}
            {showQuickActions && messages.length === 1 && (
              <QuickActions
                actions={labels.quickActions}
                onSelect={handleQuickAction}
              />
            )}

            {/* Indicateur de chargement */}
            {isLoading && (
              <div className="flex justify-start animate-[slideUp_0.2s_ease-out]">
                <div className="px-4 py-3 bg-white dark:bg-bg border border-border rounded-2xl rounded-tl-sm shadow-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-salma-gold rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="w-2 h-2 bg-salma-gold rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 bg-salma-gold rounded-full animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border bg-white dark:bg-surface flex-shrink-0">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder={labels.inputPlaceholder}
                className="flex-1 min-w-0 bg-bg dark:bg-bg border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-salma-gold focus:ring-1 focus:ring-salma-gold/30 transition-all placeholder:text-text-muted"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 flex items-center justify-center bg-salma-gold text-salma-primary rounded-xl hover:bg-salma-gold-light transition-all active:scale-95 disabled:opacity-40 disabled:pointer-events-none flex-shrink-0"
                aria-label={labels.sendAriaLabel}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19V5m0 0l-7 7m7-7l7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Bouton d'ouverture ───────────────────────────────────────── */}
      <button
        onClick={handleToggle}
        className={`bg-salma-primary text-white p-4 rounded-full shadow-salma-lg hover:scale-110 transition-all duration-300 active:scale-95 border-2 border-salma-gold ${
          isOpen ? "rotate-0" : ""
        }`}
        aria-label={isOpen ? labels.closeAriaLabel : labels.openAriaLabel}
      >
        {isOpen ? (
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>
    </div>
  );
}