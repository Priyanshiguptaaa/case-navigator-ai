import { Bot, Send, Sparkles, User } from "lucide-react";
import { useState } from "react";
import { suggestedPrompts } from "@/data/mockCaseData";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  structured?: { heading: string; items: string[] }[];
}

const initialMessages: ChatMessage[] = [
  {
    role: "assistant",
    content: "Investigation loaded for Client 10482 (INV-2024-0847). I've analyzed 14 interactions across CRM, Appian, call transcripts, and emails. How can I help with this case?",
  },
];

export function AIChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const response = generateMockResponse(text);
      setMessages((prev) => [...prev, response]);
    }, 800);
  };

  return (
    <div className="panel-section flex flex-col h-full">
      <div className="panel-header flex items-center gap-2">
        <Bot className="w-3.5 h-3.5" />
        AI Investigation Assistant
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : ""}`}>
            {msg.role === "assistant" && (
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <Bot className="w-3 h-3 text-primary-foreground" />
              </div>
            )}
            <div
              className={`max-w-[85%] rounded-lg px-3 py-2 text-xs leading-relaxed ${
                msg.role === "user"
                  ? "bg-[hsl(var(--chat-user-bg))] text-[hsl(var(--chat-user-fg))]"
                  : "bg-[hsl(var(--chat-assistant-bg))] text-[hsl(var(--chat-assistant-fg))]"
              }`}
            >
              {msg.content}
              {msg.structured?.map((section, j) => (
                <div key={j} className="mt-2">
                  <p className="font-semibold text-[10px] uppercase tracking-wider mb-1 opacity-70">{section.heading}</p>
                  <ul className="space-y-0.5">
                    {section.items.map((item, k) => (
                      <li key={k} className="flex gap-1.5 items-start">
                        <span className="w-1 h-1 rounded-full bg-current mt-1.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {msg.role === "user" && (
              <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <User className="w-3 h-3 text-muted-foreground" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Suggested prompts */}
      <div className="px-4 pb-2">
        <div className="flex gap-1.5 flex-wrap">
          {suggestedPrompts.slice(0, 3).map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSend(prompt)}
              className="text-[10px] px-2.5 py-1 rounded-full border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <Sparkles className="w-2.5 h-2.5 inline mr-1" />
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-3 border-t border-border">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
            placeholder="Ask about this investigation..."
            className="flex-1 px-3 py-2 rounded-md text-xs bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <button
            onClick={() => handleSend(input)}
            className="px-3 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function generateMockResponse(query: string): ChatMessage {
  const q = query.toLowerCase();
  if (q.includes("root cause") || q.includes("explain")) {
    return {
      role: "assistant",
      content: "Based on analysis of 14 interactions:",
      structured: [
        {
          heading: "Root Cause Analysis",
          items: [
            "CIP restriction applied to receiving account (Account #****8847)",
            "Client's identity documentation failed automated verification",
            "Two subsequent NIGO flags due to incorrect document format (TIFF) and low quality scan",
            "Compounded by incorrect account coding (Type B → Type A) that blocked Appian workflow",
          ],
        },
        {
          heading: "Contributing Factors",
          items: [
            "No proactive client communication about document requirements",
            "3-day gap between initial rejection and first client notification",
            "Document format requirements not clearly communicated in rejection notice",
          ],
        },
      ],
    };
  }
  if (q.includes("rank") || q.includes("urgency")) {
    return {
      role: "assistant",
      content: "Issues ranked by urgency and impact:",
      structured: [
        {
          heading: "Issue Ranking",
          items: [
            "🔴 Critical — CIP restriction preventing account transfer (blocking all downstream actions)",
            "🟠 High — Missing ownership change documentation (required for transfer completion)",
            "🟡 Medium — Incorrect account coding (already corrected, but caused 2-day delay)",
          ],
        },
      ],
    };
  }
  if (q.includes("client") && q.includes("internal")) {
    return {
      role: "assistant",
      content: "Actions separated by responsible party:",
      structured: [
        {
          heading: "Client Actions Required",
          items: [
            "Upload government-issued photo ID (JPEG or PDF, min 300 DPI)",
            "Confirm ownership transfer details via secure portal",
          ],
        },
        {
          heading: "Internal Ops Actions",
          items: [
            "Pre-validate document format before CIP submission",
            "Remove CIP restriction once verification is complete",
            "Update client communication template with format requirements",
            "Consider priority processing given 6-day case age and escalation history",
          ],
        },
      ],
    };
  }
  return {
    role: "assistant",
    content:
      "I've analyzed the available data for this case. The primary blocker remains the CIP restriction on the receiving account. The client has made 3 contact attempts and sentiment is trending negative. I recommend prioritizing document verification guidance to resolve this case. Would you like me to draft a client communication or generate an internal case summary?",
  };
}
