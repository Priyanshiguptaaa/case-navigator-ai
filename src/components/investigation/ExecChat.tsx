import { Bot, Send, TrendingUp, Users, AlertTriangle, BarChart3, Plus, MessageSquare } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  structured?: { heading: string; items: string[] }[];
}

interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
}

const execPrompts = [
  "Top 10 clients with unresolved issues",
  "Trending issues this month",
  "Cases at risk of escalation",
  "Weekly resolution summary",
];

let sessionCounter = 0;
function createSession(): ChatSession {
  sessionCounter++;
  return {
    id: `exec-${sessionCounter}-${Date.now()}`,
    title: "New chat",
    messages: [],
    createdAt: new Date(),
  };
}

function deriveTitle(msg: string): string {
  return msg.length > 36 ? msg.slice(0, 36) + "…" : msg;
}

export function ExecChat() {
  const [sessions, setSessions] = useState<ChatSession[]>(() => [createSession()]);
  const [activeSessionId, setActiveSessionId] = useState(sessions[0].id);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const activeSession = sessions.find((s) => s.id === activeSessionId) ?? sessions[0];
  const messages = activeSession.messages;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const updateSession = useCallback(
    (id: string, updater: (s: ChatSession) => ChatSession) => {
      setSessions((prev) => prev.map((s) => (s.id === id ? updater(s) : s)));
    },
    []
  );

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = { role: "user", content: text };

    updateSession(activeSessionId, (s) => ({
      ...s,
      title: s.messages.length === 0 ? deriveTitle(text) : s.title,
      messages: [...s.messages, userMsg],
    }));
    setInput("");

    setTimeout(() => {
      const response = generateExecResponse(text);
      updateSession(activeSessionId, (s) => ({
        ...s,
        messages: [...s.messages, userMsg, response],
      }));
    }, 800);
  };

  const handleNewChat = () => {
    const newSession = createSession();
    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
    setInput("");
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="flex-1 flex bg-background">
      {/* Chat history sidebar */}
      <div className="w-[220px] border-r border-border flex flex-col bg-card">
        <div className="p-3">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-[13px] font-medium border border-border text-foreground hover:bg-muted transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            New chat
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-2 pb-2">
          {sessions.map((session) => (
            <button
              key={session.id}
              onClick={() => setActiveSessionId(session.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-[13px] mb-0.5 transition-colors truncate ${
                session.id === activeSessionId
                  ? "bg-muted text-foreground font-medium"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              }`}
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 flex-shrink-0 opacity-50" />
                <span className="truncate">{session.title}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        {isEmpty ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="max-w-2xl w-full px-6">
              <div className="text-center mb-10">
                <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-5">
                  <BarChart3 className="w-6 h-6 text-muted-foreground" />
                </div>
                <h2 className="text-[22px] font-semibold text-foreground tracking-tight mb-2">
                  Executive Overview
                </h2>
                <p className="text-[14px] text-muted-foreground leading-relaxed max-w-md mx-auto">
                  Ask questions about trends, top issues, client risk, and operational metrics across all investigations.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-8">
                {execPrompts.map((prompt, i) => {
                  const icons = [Users, TrendingUp, AlertTriangle, BarChart3];
                  const Icon = icons[i];
                  return (
                    <button
                      key={prompt}
                      onClick={() => handleSend(prompt)}
                      className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card text-left hover:bg-muted/50 transition-colors"
                    >
                      <Icon className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <span className="text-[13px] text-foreground leading-snug">{prompt}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex gap-2 max-w-lg mx-auto">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
                  placeholder="Ask about portfolio trends, risk, metrics…"
                  className="flex-1 px-4 py-3.5 rounded-xl text-[14px] bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 transition-shadow"
                  autoFocus
                />
                <button
                  onClick={() => handleSend(input)}
                  disabled={!input.trim()}
                  className="px-4 py-3.5 rounded-xl bg-primary text-primary-foreground hover:brightness-110 transition-all disabled:opacity-40"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto">
              <div className="max-w-2xl mx-auto px-6 py-8 space-y-4">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
                    {msg.role === "assistant" && (
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Bot className="w-4 h-4 text-primary-foreground" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 text-[14px] leading-relaxed ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-card border border-border text-foreground"
                      }`}
                    >
                      {msg.content}
                      {msg.structured?.map((section, j) => (
                        <div key={j} className="mt-3">
                          <p className="font-medium text-[12px] text-muted-foreground mb-2">{section.heading}</p>
                          <ul className="space-y-1.5">
                            {section.items.map((item, k) => (
                              <li key={k} className="flex gap-2 items-start text-[13px]">
                                <span className="w-1 h-1 rounded-full bg-current mt-2 flex-shrink-0 opacity-40" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>
            </div>

            <div className="border-t border-border bg-background">
              <div className="max-w-2xl mx-auto px-6 py-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
                    placeholder="Ask a follow-up…"
                    className="flex-1 px-4 py-3 rounded-xl text-[14px] bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 transition-shadow"
                  />
                  <button
                    onClick={() => handleSend(input)}
                    disabled={!input.trim()}
                    className="px-4 py-3 rounded-xl bg-primary text-primary-foreground hover:brightness-110 transition-all disabled:opacity-40"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function generateExecResponse(query: string): ChatMessage {
  const q = query.toLowerCase();
  if (q.includes("top 10") || q.includes("top clients")) {
    return {
      role: "assistant",
      content: "Here are the top 10 clients by open issue severity, based on the last 30 days:",
      structured: [
        {
          heading: "Highest Priority",
          items: [
            "Client 10482 — 3 critical issues, CIP restriction blocking transfer (6 days open)",
            "Client 20391 — 2 critical issues, failed AML screening pending review",
            "Client 15847 — 2 critical issues, account freeze due to compliance hold",
          ],
        },
        {
          heading: "Elevated Risk",
          items: [
            "Client 33021 — 1 critical, 2 high issues, pending documentation",
            "Client 44892 — 3 high issues, repeated NIGO submissions",
            "Client 29104 — 2 high issues, escalated client sentiment",
            "Client 18455 — 2 high issues, SLA breach on response time",
          ],
        },
        {
          heading: "Monitoring",
          items: [
            "Client 50221 — 1 high, 3 medium issues",
            "Client 61039 — 4 medium issues, trending negative sentiment",
            "Client 72884 — 2 medium issues, process delays",
          ],
        },
      ],
    };
  }
  if (q.includes("trending") || q.includes("trend")) {
    return {
      role: "assistant",
      content: "Key trends identified across the portfolio this month:",
      structured: [
        {
          heading: "Rising Issues",
          items: [
            "Document format rejections up 34% — clients submitting unsupported file types (TIFF, BMP)",
            "CIP verification delays averaging 4.2 days, up from 2.8 days last month",
            "Client sentiment scores declining in transfer-related cases (avg -12% MoM)",
          ],
        },
        {
          heading: "Improving Areas",
          items: [
            "Account coding errors down 18% after workflow update",
            "First-contact resolution improved to 42% from 37%",
            "Average case resolution time decreased by 0.5 days for medium-severity cases",
          ],
        },
      ],
    };
  }
  if (q.includes("escalation") || q.includes("risk")) {
    return {
      role: "assistant",
      content: "Cases currently at risk of escalation based on age, severity, and sentiment analysis:",
      structured: [
        {
          heading: "Immediate Attention",
          items: [
            "INV-2024-0847 (Client 10482) — 6 days open, critical severity, negative sentiment trend",
            "INV-2024-0912 (Client 20391) — 4 days open, AML flag unresolved, client contacted 3x",
            "INV-2024-0889 (Client 15847) — 5 days open, compliance hold, SLA at risk",
          ],
        },
      ],
    };
  }
  if (q.includes("resolution") || q.includes("summary") || q.includes("weekly")) {
    return {
      role: "assistant",
      content: "Weekly resolution summary for the past 7 days:",
      structured: [
        {
          heading: "Metrics",
          items: [
            "42 cases resolved (up from 38 last week)",
            "Average resolution time: 3.1 days",
            "12 cases currently open, 4 critical, 5 high, 3 medium",
            "Client satisfaction score: 7.8/10 (stable)",
          ],
        },
      ],
    };
  }
  return {
    role: "assistant",
    content: "Based on current portfolio data, I can see 12 active investigations across 8 clients. The primary areas of concern are CIP verification delays and document format issues. Would you like me to drill into a specific area, or would you like to see the full risk breakdown?",
  };
}
