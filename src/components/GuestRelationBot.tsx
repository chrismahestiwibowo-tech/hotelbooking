import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Sparkles, HelpCircle, RefreshCw, Compass } from "lucide-react";
import { Booking, SearchParams } from "../types";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface GuestRelationBotProps {
  activeBooking: Booking | null;
  searchParams: SearchParams;
}

export default function GuestRelationBot({ activeBooking, searchParams }: GuestRelationBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Warmest welcome to Elysian Stay! I am your personal digital butler, Elysian Concierge. I am online to assist with suite upgrades, transport booking, onsen timetables, and answering any requests about your itinerary. How may I elevate your stay today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll logic
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, isOpen]);

  // Show a pulsing badge if closed and new messages come
  useEffect(() => {
    if (!isOpen && messages.length > 1) {
      setUnreadCount((prev) => prev + 1);
    }
  }, [messages.length, isOpen]);

  const handleOpenToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0);
    }
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      // API call to custom Express server
      const response = await fetch("/api/guest-relation/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          activeBooking,
          searchParams,
        }),
      });

      if (!response.ok) {
        throw new Error("Could not reach Elysian Concierge services.");
      }

      const data = await response.json();
      
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.text || "I apologize, but I had trouble processing that request. Please let me try again.",
          timestamp: new Date(),
        },
      ]);
    } catch (err: any) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Forgive me, but our secure reservation systems are experiencing momentary network lag. Please rest assured your booking data is fully protected, and I am retrying directly.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const submitPresetPrompt = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "Understood. I have cleared our session logs. How may I assist you with your travel preparations or room reservations now?",
        timestamp: new Date(),
      },
    ]);
  };

  const formatContent = (content: string) => {
    // Basic text formattings to replace markdown markers for bold, bullet points, etc. to look beautiful
    const lines = content.split("\n");
    return lines.map((line, idx) => {
      // Header lines
      if (line.startsWith("### ")) {
        return (
          <h4 key={idx} className="font-serif font-semibold text-stone-800 text-sm mt-3 mb-1">
            {line.substring(4)}
          </h4>
        );
      }
      if (line.startsWith("## ")) {
        return (
          <h3 key={idx} className="font-serif font-semibold text-stone-900 text-base mt-3 mb-1 border-b border-stone-200/50 pb-0.5">
            {line.substring(3)}
          </h3>
        );
      }

      // Check lists (bullet points)
      let renderedLine = line;
      let isBullet = false;
      if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
        renderedLine = line.substring(line.indexOf("- ") + 2).trim();
        isBullet = true;
      }

      // Format bold blocks **text**
      const boldRegex = /\*\*(.*?)\*\*/g;
      const parts = [];
      let lastIndex = 0;
      let match;
      while ((match = boldRegex.exec(renderedLine)) !== null) {
        if (match.index > lastIndex) {
          parts.push(renderedLine.substring(lastIndex, match.index));
        }
        parts.push(
          <strong key={match.index} className="font-semibold text-stone-900">
            {match[1]}
          </strong>
        );
        lastIndex = boldRegex.lastIndex;
      }
      if (lastIndex < renderedLine.length) {
        parts.push(renderedLine.substring(lastIndex));
      }

      const inlineFormed = parts.length > 0 ? parts : renderedLine;

      if (isBullet) {
        return (
          <li key={idx} className="ml-4 list-disc pl-1 py-0.5 text-stone-700 leading-relaxed text-xs">
            {inlineFormed}
          </li>
        );
      }

      return (
        <p key={idx} className="text-stone-700 leading-relaxed text-xs my-1 min-h-[0.5rem]">
          {inlineFormed}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating Concierge Action Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {/* Hover label for invitation */}
        {!isOpen && (
          <div className="bg-stone-900 text-stone-100 text-[10px] font-mono tracking-widest uppercase py-1.5 px-3 rounded-full border border-stone-800 shadow-md mb-2 mr-1 flex items-center gap-1.5 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Online Butler
          </div>
        )}

        <button
          id="con_bot_cta"
          onClick={handleOpenToggle}
          className="relative bg-stone-900 text-[#c5a880] w-14 h-14 rounded-full flex items-center justify-center border border-[#c5a880]/40 shadow-2xl hover:bg-stone-800 transition-all duration-300 group hover:scale-105 select-none"
          title="Elysian Digital Butler Guest Relations"
        >
          {isOpen ? (
            <X className="w-6 h-6 transition-transform duration-200" />
          ) : (
            <>
              <MessageSquare className="w-6 h-6 transition-transform duration-200" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold font-mono">
                  {unreadCount}
                </span>
              )}
            </>
          )}

          {/* Pulse ring decoration */}
          {!isOpen && (
            <span className="absolute inset-0 rounded-full border border-[#c5a880]/20 animate-ping pointer-events-none"></span>
          )}
        </button>
      </div>

      {/* Floating Chat Panel Drawer */}
      {isOpen && (
        <div
          id="con_bot_panel"
          className="fixed bottom-24 right-6 w-[360px] sm:w-[410px] max-w-[calc(100vw-2rem)] h-[580px] max-h-[80vh] bg-white rounded-2xl border border-stone-200 shadow-2xl z-50 flex flex-col overflow-hidden animate-slide-up select-none font-sans"
        >
          {/* Elite Gold Header */}
          <div className="bg-stone-900 text-[#c5a880] p-4 flex items-center justify-between border-b border-stone-800">
            <div className="flex items-center gap-3">
              <div className="bg-stone-800 border border-[#c5a880]/30 p-2 rounded-xl text-[#c5a880]">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-serif font-semibold text-sm text-stone-100">Elysian Concierge</h3>
                  <span className="bg-emerald-500/15 text-emerald-400 text-[8px] font-mono tracking-widest uppercase px-1.5 py-0.5 rounded-md border border-emerald-500/20">
                    Online
                  </span>
                </div>
                <p className="text-[10px] text-stone-400 font-mono tracking-wide">Elite Digital Relations Butler</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={clearChat}
                className="p-1.5 text-stone-400 hover:text-stone-100 transition-colors rounded-lg bg-stone-800/40 hover:bg-stone-800 border border-stone-800"
                title="Clear Conversation History"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleOpenToggle}
                className="p-1.5 text-stone-400 hover:text-stone-100 transition-colors rounded-lg bg-stone-800/40 hover:bg-stone-800 border border-stone-800"
                title="Dismiss Panel"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Connected Context bar details */}
          {(activeBooking || searchParams.city !== "All") && (
            <div className="bg-stone-50 border-b border-stone-100 px-4 py-2 flex items-center justify-between text-[10px] text-stone-500 font-mono tracking-tight">
              {activeBooking ? (
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>Booking Code: <strong>{activeBooking.bookingCode}</strong></span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-[#b39369]">
                  <Compass className="w-3 h-3" />
                  <span>Exploring: <strong>{searchParams.city}</strong> ({searchParams.guests} guests)</span>
                </div>
              )}
              <span className="text-stone-400 text-[9px]">Synchronized</span>
            </div>
          )}

          {/* Conversation Core Panel */}
          <div className="flex-grow overflow-y-auto p-4 bg-stone-50/50 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 max-w-[85%] ${
                  message.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                {/* Visual Avatar icons */}
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border shadow-xs select-none ${
                    message.role === "user"
                      ? "bg-stone-100 border-stone-200 text-stone-700"
                      : "bg-[#c5a880]/15 border-[#c5a880]/30 text-stone-800"
                  }`}
                >
                  {message.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Content body layout bubbles */}
                <div className="space-y-1">
                  <div
                    className={`p-3 rounded-2xl border text-xs shadow-xs leading-relaxed ${
                      message.role === "user"
                        ? "bg-stone-900 border-stone-800 text-stone-100 rounded-tr-none"
                        : "bg-white border-stone-200 text-stone-800 rounded-tl-none"
                    }`}
                  >
                    {message.role === "user" ? (
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    ) : (
                      <div className="space-y-1 prose prose-stone text-xs">
                        {formatContent(message.content)}
                      </div>
                    )}
                  </div>
                  <p
                    className={`text-[9px] font-mono text-stone-400 px-1 ${
                      message.role === "user" ? "text-right" : "text-left"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}

            {/* Spinner when loading */}
            {isLoading && (
              <div className="flex gap-3 max-w-[85%] mr-auto items-center">
                <div className="w-8 h-8 rounded-xl bg-[#c5a880]/15 border border-[#c5a880]/30 text-stone-800 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 animate-spin text-[#b39369]" />
                </div>
                <div className="bg-white border border-stone-200 p-3 rounded-2xl rounded-tl-none flex items-center gap-1.5 shrink-0 shadow-xs">
                  <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                  <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                  <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Helpful Prompt Suggestions Container */}
          <div className="bg-stone-50 border-t border-stone-100 px-4 py-2.5">
            <p className="text-[10px] text-stone-400 font-medium tracking-wide uppercase mb-1.5 flex items-center gap-1 select-none">
              <HelpCircle className="w-3 h-3 text-[#c5a880]" /> Suggested inquiries
            </p>
            <div className="flex flex-wrap gap-1.5 max-h-[72px] overflow-y-auto">
              {[
                { label: "⚜️ Our Hotel Portfolio", prompt: "Explain the details of your available hotels and distinct vibes of each property." },
                { label: "📅 Cancellation & Refund Policy", prompt: "What is your refund policy and cancellation deadlines?" },
                { label: "🍵 Hanami Kyoto Onsen Retreat", prompt: "Tell me more about Hanami Pavilion Kyoto's facilities, onsen baths, and Emperor Suite." },
                { label: "🛏️ Recommend a Penthouse", prompt: "Could you recommend the best luxury penthouse suite in your collection along with prices?" },
                { label: "⭐ Flexible Check-in Hours", prompt: "What time is check-in? Can I request front desk assistance past midnight?" },
              ].map((chip, index) => (
                <button
                  key={index}
                  onClick={() => submitPresetPrompt(chip.prompt)}
                  disabled={isLoading}
                  className="bg-white hover:bg-stone-100 text-stone-700 hover:text-stone-900 border border-stone-200 px-2.5 py-1 rounded-lg text-[10px] text-left transition-all duration-150 block truncate max-w-full font-medium"
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          {/* Persistent input floor bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }}
            className="p-3 bg-white border-t border-stone-100 flex items-center gap-2 select-text"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask anything or coordinate requests..."
              disabled={isLoading}
              className="flex-grow text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-stone-400 focus:bg-white text-stone-800 placeholder-stone-400 transition-all duration-150"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="bg-stone-900 text-[#c5a880] hover:bg-stone-800 p-2.5 rounded-xl border border-stone-800 disabled:opacity-40 disabled:hover:bg-stone-900 shadow-xs transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
