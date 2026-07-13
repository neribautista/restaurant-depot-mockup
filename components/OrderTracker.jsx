"use client";

import { useState } from "react";

export default function OrderTracker() {
  const [orderId, setOrderId] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const track = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/track-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });
      const data = await res.json();
      setResult(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-md bg-white p-6 shadow-sm ring-1 ring-black/5">
      <h3 className="font-display text-xl text-ink">Track an Order</h3>
      <p className="mt-1 text-sm text-ink/60">
        Try <span className="font-mono">RD-10234</span>, <span className="font-mono">RD-10190</span>, or{" "}
        <span className="font-mono">RD-10301</span>.
      </p>
      <form onSubmit={track} className="mt-4 flex gap-2">
        <input
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="Order number"
          className="flex-1 rounded-sm border border-cream-dark px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-sm bg-gold px-4 py-2 text-xs font-semibold uppercase tracking-wide text-navy hover:bg-gold-light disabled:opacity-60"
        >
          {loading ? "Checking…" : "Track"}
        </button>
      </form>
      {result && (
        <div className="mt-4 rounded-sm bg-cream p-4 text-sm text-ink">
          {result.reply}
        </div>
      )}
    </div>
  );
}
