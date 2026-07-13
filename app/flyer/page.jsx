"use client";

import { useState } from "react";
import Link from "next/link";
import flyer from "@/data/flyer.json";
import FlyerCard from "@/components/FlyerCard";
import { useCart } from "@/context/CartContext";

const LOCATIONS = ["Texas", "Philadelphia", "Minnesota"];

export default function FlyerPage() {
  const [location, setLocation] = useState(LOCATIONS[0]);
  const [category, setCategory] = useState("All");
  const { count } = useCart();

  const items = flyer.locations[location]?.items ?? [];
  const categories = ["All", ...new Set(items.map((i) => i.category))];
  const visible = category === "All" ? items : items.filter((i) => i.category === category);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest2 text-gold-deep">{flyer.month} Flyer</p>
          <h1 className="mt-2 font-display text-3xl text-ink">{flyer.theme}</h1>
          <p className="mt-2 max-w-xl text-sm text-ink/60">
            Browse this month's specials — no account needed. Sign in when
            you're ready to check out.
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] uppercase tracking-widest2 text-ink/40">Location</label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="rounded-sm border border-cream-dark bg-white px-4 py-2 text-sm"
          >
            {LOCATIONS.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`rounded-full border px-4 py-1.5 text-xs font-medium uppercase tracking-wide transition-colors ${
              category === c ? "border-gold bg-gold text-navy" : "border-cream-dark text-ink/60 hover:border-gold"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
        {visible.map((item) => (
          <FlyerCard key={item.id} item={item} />
        ))}
      </div>

      {count > 0 && (
        <div className="fixed bottom-24 right-5 z-40 sm:bottom-5 sm:right-24">
          <Link
            href="/cart"
            className="flex items-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-semibold text-cream shadow-xl hover:bg-navy-light"
          >
            View Order ({count})
          </Link>
        </div>
      )}
    </div>
  );
}
