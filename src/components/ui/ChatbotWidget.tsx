// src/components/ui/ChatbotWidget.tsx
// ==============================================================================
// ChatbotWidget — Widget chatbot IA premium SALMA
//
// Flux de résolution :
//   1. Tentative API (chatbotRepository.query) — sauf si mode statique
//   2. Recherche locale (chatbot.fallback.ts) — mots-clés + CTA contextuels
//   3. Message "je n'ai pas la réponse" + CTA conversion par défaut
//
// Chaque réponse bot affiche :
//   - Le texte de réponse
//   - Des suggestions cliquables (questions liées)
//   - 3 CTA contextuels (navigation ou conversion)
//
// RÈGLE : Zéro texte en dur — labels viennent de la prop `labels`.
// ==============================================================================

"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { chatbotRepository } from "@/repositories/chatbot.repository";
import { eventsRepository } from "@/repositories/events.repository";
import { searchFallback, resolveFallbackCtas } from "@/lib/chatbot.fallback";
import type {
  ChatbotWidgetProps,
  ChatbotMessage,
  ChatbotQuickAction,
} from "@/types/ui/chatbot-widget.types";
import type { ChatbotCTA, ChatbotSuggestion } from "@/types/api/chatbot.types";

// — Constantes ------------------------------------------------------------------

const DEFAULT_WHATSAPP = "237699450984";
const IS_STATIC = process.env.NEXT_PUBLIC_STATIC_CONTENT === "true";

// — Sous-composant : Bulle de message ------------------------------------------

/**
 * Bulle de message avec style asymétrique, suggestions et CTA.
 */
function MessageBubble({
  message,
  whatsappUrl,
  whatsappLabel,
  onSuggestionClick,
  onCtaClick,
}: {
  message: ChatbotMessage;
  whatsappUrl: string;
  whatsappLabel: string;
  onSuggestionClick: (question: string) => void;
  onCtaClick: (cta: ChatbotCTA) => void;
}) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} animate-[slideUp_0.3s_ease-out]`}
    >
      <div className="flex flex-col gap-2 max-w-[85%]">
        {/* — Bulle texte — */}
        <div
          className={`p-3.5 text-sm leading-relaxed ${
            isUser
              ? "bg-salma-primary text-white rounded-2xl rounded-br-md"
              : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-2xl rounded-bl-md"
          }`}
        >
          {message.text}
        </div>

        {/* — Suggestions cliquables (questions liées) — */}
        {!isUser && message.suggestions && message.suggestions.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {message.suggestions.map((sug) => (
              <button
                key={sug.id}
                onClick={() => onSuggestionClick(sug.question)}
                className="px-2.5 py-1.5 text-[11px] font-semibold bg-salma-accent/10 text-salma-accent border border-salma-accent/20 rounded-full hover:bg-salma-accent/20 hover:border-salma-accent/40 transition-all active:scale-95"
              >
                {sug.question}
              </button>
            ))}
          </div>
        )}

        {/* — Barre de 3 CTA contextuels — */}
        {!isUser && message.ctas && message.ctas.length > 0 && (
          <div className="flex flex-col gap-1.5 mt-1">
            {message.ctas.map((cta) => (
              <button
                key={cta.id}
                onClick={() => onCtaClick(cta)}
                className={`w-full px-3 py-2 text-[11px] font-bold rounded-xl text-left transition-all active:scale-[0.98] ${
                  cta.type === "conversion"
                    ? "bg-salma-gold/10 text-salma-gold-dark dark:text-salma-gold border border-salma-gold/20 hover:bg-salma-gold/20 hover:border-salma-gold/40"
                    : "bg-salma-primary/10 text-salma-primary dark:text-salma-accent border border-salma-primary/20 hover:bg-salma-primary/20 hover:border-salma-primary/40"
                }`}
              >
                {cta.label}
              </button>
            ))}
          </div>
        )}

        {/* — Ancien fallback WhatsApp (legacy, gardé pour sécurité) — */}
        {!isUser && message.showWhatsApp && (!message.ctas || message.ctas.length === 0) && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-2 mt-1 text-xs font-bold text-green-700 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition-colors w-fit"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            </svg>
            {whatsappLabel}
          </a>
        )}
      </div>
    </div>
  );
}

// — Sous-composant : Quick Actions ---------------------------------------------

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

// — Sous-composant : Indicateur de frappe --------------------------------------

function TypingIndicator({ text }: { text: string }) {
  return (
    <div className="flex justify-start animate-[slideUp_0.3s_ease-out]">
      <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-bl-md p-3.5 flex items-center gap-2">
        <div className="flex gap-1">
          <span className="w-1.5 h-1.5 bg-salma-accent rounded-full animate-bounce [animation-delay:0ms]" />
          <span className="w-1.5 h-1.5 bg-salma-accent rounded-full animate-bounce [animation-delay:150ms]" />
          <span className="w-1.5 h-1.5 bg-salma-accent rounded-full animate-bounce [animation-delay:300ms]" />
        </div>
        <span className="text-xs text-slate-400">{text}</span>
      </div>
    </div>
  );
}

// — Composant principal ---------------------------------------------------------

/**
 * **ChatbotWidget** — Widget chatbot IA premium SALMA.
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
  const typedLocale = locale as "fr" | "en";

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

  const resolveAnswer = useCallback(
    async (question: string): Promise<ChatbotMessage> => {
      // Étape 1 : Tentative API (sauf mode statique)
      if (!IS_STATIC) {
        try {
          const response = await chatbotRepository.query({
            message: question,
            langue: typedLocale,
          });
          if (response.reponse) {
            return {
              role: "bot",
              text: response.reponse,
              suggestions: response.suggestions || [],
              ctas: response.ctas && response.ctas.length > 0
                ? response.ctas
                : resolveFallbackCtas(undefined, typedLocale),
            };
          }
        } catch {
          // API indisponible — on passe au fallback
        }
      }

      // Étape 2 : Recherche fallback locale (avec CTA contextuels)
      const fallback = searchFallback(question);
      if (fallback) {
        const answer = typedLocale === "fr" ? fallback.answer_fr : fallback.answer_en;
        const suggestions: ChatbotSuggestion[] = (
          typedLocale === "fr" ? fallback.suggestions_fr : fallback.suggestions_en
        )?.map((q, i) => ({ question: q, id: `fsug-${i}` })) || [];

        return {
          role: "bot",
          text: answer,
          suggestions,
          ctas: resolveFallbackCtas(fallback.cta_ids, typedLocale),
        };
      }

      // Étape 3 : Aucune réponse — CTA conversion par défaut
      return {
        role: "bot",
        text: labels.noAnswer,
        ctas: resolveFallbackCtas(undefined, typedLocale),
      };
    },
    [typedLocale, labels.noAnswer]
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

  // — Handlers ------------------------------------------------------------------

  const handleQuickAction = useCallback(
    (action: ChatbotQuickAction) => {
      handleSend(action.query);
    },
    [handleSend]
  );

  const handleSuggestionClick = useCallback(
    (question: string) => {
      handleSend(question);
    },
    [handleSend]
  );

  const handleCtaClick = useCallback((cta: ChatbotCTA) => {
    if (cta.url.startsWith("http")) {
      window.open(cta.url, "_blank", "noopener,noreferrer");
      return;
    }
    if (cta.url === "#newsletter") {
      const el = document.getElementById("newsletter");
      if (el) el.scrollIntoView({ behavior: "smooth" });
      return;
    }
    window.location.href = cta.url;
  }, []);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // — Rendu ---------------------------------------------------------------------

  return (
    <div className={`fixed bottom-28 right-6 z-[70] flex flex-col items-end ${className}`}>

      {/* ── Fenêtre de Chat ──────────────────────────────────────────── */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 h-[520px] bg-white dark:bg-surface border border-border rounded-2xl shadow-salma-lg flex flex-col overflow-hidden origin-bottom-right animate-[chatOpen_0.3s_ease-out]">

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
                  {isLoading ? labels.thinking : "SALMA AI"}
                </span>
              </div>
            </div>
            <button
              onClick={handleToggle}
              aria-label={labels.closeAriaLabel}
              className="p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Zone de messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin"
          >
            {messages.map((msg, i) => (
              <MessageBubble
                key={i}
                message={msg}
                whatsappUrl={whatsappUrl}
                whatsappLabel={labels.whatsappFallback}
                onSuggestionClick={handleSuggestionClick}
                onCtaClick={handleCtaClick}
              />
            ))}

            {showQuickActions && messages.length <= 1 && (
              <QuickActions
                actions={labels.quickActions}
                onSelect={handleQuickAction}
              />
            )}

            {isLoading && <TypingIndicator text={labels.thinking} />}
          </div>

          {/* Barre de saisie */}
          <div className="p-3 border-t border-border flex-shrink-0">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder={labels.inputPlaceholder}
                className="flex-1 px-3 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-salma-accent/30 focus:border-salma-accent transition-all placeholder:text-slate-400"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                aria-label={labels.sendAriaLabel}
                className="p-2.5 bg-salma-primary text-white rounded-xl hover:bg-salma-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M3.478 2.404a.75.75 0 00-.926.941l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.404z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Bouton flottant ──────────────────────────────────────────── */}
      {!isOpen && (
        <button
          onClick={handleToggle}
          aria-label={labels.openAriaLabel}
          className="group w-14 h-14 bg-salma-primary text-white rounded-full shadow-salma-lg hover:shadow-salma-xl hover:scale-105 transition-all active:scale-95 flex items-center justify-center"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6 group-hover:scale-110 transition-transform">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
          </svg>
        </button>
      )}
    </div>
  );
}