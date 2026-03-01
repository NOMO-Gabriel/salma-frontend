"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { chatbotRepository } from "@/repositories/chatbot.repository";
import { eventsRepository } from "@/repositories/events.repository";

interface Message {
  role: "user" | "bot";
  text: string;
}

export default function ChatbotWidget() {
  // FIX : Retrait de dictionary
  const { locale } = useLanguage(); 
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcome = locale === "fr" 
        ? "Bonjour ! Je suis l'assistant SALMA. Comment puis-je vous aider pour votre projet d'études ?"
        : "Hello! I am the SALMA assistant. How can I help you with your study project?";
      setMessages([{ role: "bot", text: welcome }]);
      eventsRepository.trackChatbotOpen();
    }
  }, [isOpen, locale, messages.length]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await chatbotRepository.query({ message: userMsg, langue: locale });
      setMessages((prev) => [...prev, { role: "bot", text: response.reponse }]);
    } catch {
      // FIX : Retrait de 'error'
      setMessages((prev) => [...prev, { role: "bot", text: "Désolé, une erreur est survenue." }]);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="fixed bottom-28 right-6 z-[70] flex flex-col items-end">
      {/* Fenêtre de Chat */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 h-[450px] bg-white dark:bg-salma-surface border border-salma-border rounded-3xl shadow-salma-lg flex flex-col overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-salma-primary p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-salma-gold flex items-center justify-center text-salma-primary font-bold">S</div>
              <span className="font-serif font-bold">Assistant SALMA</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white">✕</button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-salma-bg/30">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  m.role === "user" 
                    ? "bg-salma-primary text-white rounded-tr-none" 
                    : "bg-white dark:bg-salma-bg border border-salma-border text-salma-text rounded-tl-none shadow-sm"
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && <div className="text-xs text-salma-text-muted animate-pulse italic">SALMA réfléchit...</div>}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-salma-border bg-white dark:bg-salma-surface">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Posez votre question..."
                className="flex-1 bg-salma-bg border border-salma-border rounded-xl px-4 py-2 text-sm outline-none focus:border-salma-gold"
              />
              <button onClick={handleSend} className="bg-salma-gold text-salma-primary p-2 rounded-xl hover:scale-105 transition-transform">
                ➤
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bouton d'ouverture */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-salma-primary text-white p-4 rounded-full shadow-salma-lg hover:scale-110 transition-all active:scale-95 border-2 border-salma-gold"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>
    </div>
  );
}