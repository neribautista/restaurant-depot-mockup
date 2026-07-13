"use client";

import { useState } from "react";
import {
  savePromotion,
  mockSendPromotion,
  getSubscribers,
} from "@/lib/mockMarketing";

export default function AdminPromotionsPage() {
  const [form, setForm] = useState({
    title: "",
    message: "",
    branch: "All Branches",
  });

  const [sentCount, setSentCount] = useState(null);
  const subscribers = getSubscribers();

  const handleSubmit = (e) => {
    e.preventDefault();

    const promotion = savePromotion(form);
    const count = mockSendPromotion(promotion);

    setSentCount(count);
    setForm({ title: "", message: "", branch: "All Branches" });
  };

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <p className="text-xs uppercase tracking-[0.35em] text-gold-deep">
        Admin
      </p>

      <h1 className="mt-3 font-display text-4xl text-ink">
        Send Promotion Notification
      </h1>

      <p className="mt-4 text-ink/70">
        Development mockup only. This saves the promotion and logs the mock SMS
        send in the browser console.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
        <form
          onSubmit={handleSubmit}
          className="rounded-xl bg-cream p-8 shadow-sm"
        >
          <div className="space-y-5">
            <input
              required
              placeholder="Promotion title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              className="w-full rounded-md border border-black/10 px-4 py-4"
            />

            <select
              value={form.branch}
              onChange={(e) =>
                setForm({ ...form, branch: e.target.value })
              }
              className="w-full rounded-md border border-black/10 px-4 py-4"
            >
              <option>All Branches</option>
              <option>Austin, TX</option>
              <option>Birmingham, AL</option>
              <option>Mesa, AZ</option>
              <option>Phoenix, AZ</option>
            </select>

            <textarea
              required
              rows={6}
              placeholder="Promotion message"
              value={form.message}
              onChange={(e) =>
                setForm({ ...form, message: e.target.value })
              }
              className="w-full rounded-md border border-black/10 px-4 py-4"
            />

            <button
              type="submit"
              className="rounded-sm bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-widest2 text-navy"
            >
              Publish & Send Mock Notification
            </button>

            {sentCount !== null && (
              <p className="rounded-md bg-white p-4 text-sm font-semibold text-navy">
                Mock notification sent to {sentCount} subscriber(s). Check the
                browser console.
              </p>
            )}
          </div>
        </form>

        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5">
          <h2 className="font-display text-2xl text-navy">
            Active Subscribers
          </h2>

          <p className="mt-3 text-4xl font-bold text-ink">
            {subscribers.length}
          </p>

          <p className="mt-2 text-sm text-ink/60">
            Saved locally in your browser for development testing.
          </p>
        </div>
      </div>
    </main>
  );
}