"use client";

import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { ChefBot } from "@/components/ChefBot";
import { useAuth } from "@/context/AuthContext";
import { getOrders } from "@/lib/orders";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEnd = useRef(null);
  const { user, isApprovedMember } = useAuth();

  const scrollToBottom = () => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const orders = isApprovedMember ? getOrders() : [];

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          userId: user?.id,
          userState: user?.state,
          orders,
          isApprovedMember,
        }),
      });

      const data = await response.json();
      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply },
        ]);
      }
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-4">
      {open && (
        <div className="flex flex-col w-80 h-96 bg-white rounded-lg shadow-2xl border border-navy/10">
          <div className="bg-navy text-cream px-4 py-3 rounded-t-lg">
            <h3 className="font-semibold text-sm">How can we help?</h3>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <div className="text-xs text-navy/60">
                <p className="mb-2">Welcome! Ask us about:</p>
                <ul className="list-disc list-inside space-y-1">
                  {isApprovedMember ? (
                    <>
                      <li>Order status & tracking</li>
                      <li>Current promotions</li>
                      <li>Product availability</li>
                    </>
                  ) : (
                    <>
                      <li>How to become a member</li>
                      <li>Locations near you</li>
                      <li>Online ordering</li>
                      <li>What is Jetro</li>
                    </>
                  )}
                </ul>
              </div>
            )}

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs text-xs p-2 rounded-lg ${
                    msg.role === "user"
                      ? "bg-gold text-navy"
                      : "bg-navy/10 text-navy"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-navy/10 text-navy text-xs p-2 rounded-lg">
                  Thinking...
                </div>
              </div>
            )}

            <div ref={messagesEnd} />
          </div>

          <form
            onSubmit={handleSendMessage}
            className="border-t border-navy/10 p-3 flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 text-xs px-3 py-2 border border-navy/20 rounded focus:outline-none focus:border-gold"
              disabled={loading}
            />
            <button
              type="submit"
              className="rounded-sm bg-navy px-3 py-2 text-xs font-semibold text-cream hover:bg-navy/90 disabled:opacity-50"
              disabled={loading || !input.trim()}
            >
              Send
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gold text-navy shadow-xl hover:bg-gold-light transition-colors duration-200"
        aria-label="Toggle help chat"
      >
        {open ? <X size={24} /> : <ChefBot size={32} />}
      </button>
    </div>
  );
}