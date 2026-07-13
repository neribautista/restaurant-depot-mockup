"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import locations from "@/data/locations.json";

const LocationsMap = dynamic(() => import("@/components/LocationsMap"), {
  ssr: false,
});

const COMING_SOON_LOCATIONS = [
  {
    name: "Milwaukee, WI",
    label: "2nd Location",
    opening: "August 2026",
    address: "10330 W Silver Spring Dr",
    cityState: "Milwaukee, WI 53225",
    mapUrl:
      "https://www.google.com/maps/dir/?api=1&destination=10330%20W%20Silver%20Spring%20Dr%2C%20Milwaukee%2C%20WI%2053225",
  },
  {
    name: "Toledo, OH",
    opening: "September 2026",
    address: "1645 Holland Rd",
    cityState: "Maumee, OH 43537",
    mapUrl:
      "https://www.google.com/maps/dir/?api=1&destination=1645%20Holland%20Rd%2C%20Maumee%2C%20OH%2043537",
  },
];

const HOLIDAYS = [
  "New Year's Day",
  "Easter Sunday",
  "Memorial Day",
  "Independence Day",
  "Labor Day",
  "Thanksgiving Day",
  "Christmas Day",
];

export default function LocationsPage() {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState(locations);
  const [active, setActive] = useState(null);

  const handleSearch = (e) => {
    const q = e.target.value.toLowerCase();
    setQuery(q);

    setFiltered(
      locations.filter(
        (loc) =>
          loc.name.toLowerCase().includes(q) ||
          loc.cityState.toLowerCase().includes(q) ||
          loc.zip.toLowerCase().includes(q)
      )
    );
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <p className="text-xs uppercase tracking-widest2 text-gold-deep">
        Locations
      </p>

      <h1 className="mt-2 font-display text-3xl text-ink">
        Find a Warehouse
      </h1>

      <div className="mt-4 w-full max-w-sm">
        <input
          type="text"
          placeholder="Search city, state, or ZIP"
          value={query}
          onChange={handleSearch}
          className="w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:ring-2 focus:ring-gold-deep"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[380px_1fr]">
        <div className="max-h-[560px] space-y-3 overflow-y-auto pr-2">
          {filtered.length > 0 ? (
            filtered.map((loc) => (
              <button
                key={loc.name}
                onClick={() => setActive(loc.name)}
                className={`w-full rounded-md bg-white p-5 text-left shadow-sm ring-1 transition ${
                  active === loc.name
                    ? "ring-2 ring-gold-deep"
                    : "ring-black/5"
                }`}
              >
                <h3 className="font-display text-lg text-ink">{loc.name}</h3>
                <p className="text-sm text-ink/60">{loc.address}</p>
                <p className="text-xs text-ink/40">{loc.cityState}</p>
                <p className="mt-1 text-xs text-ink/40">
                  {loc.hours?.Mon
                    ? `Mon–Sun · ${loc.hours.Mon}`
                    : "Hours unavailable"}
                </p>
              </button>
            ))
          ) : (
            <p className="text-center text-sm text-ink/60">
              No locations found
            </p>
          )}
        </div>

        <div className="h-[560px] overflow-hidden rounded-lg shadow-sm ring-1 ring-black/5">
          <LocationsMap
            locations={filtered}
            active={active}
            onSelect={setActive}
          />
        </div>
      </div>

      <section id="coming-soon" className="mt-16">
        <p className="text-xs uppercase tracking-[0.35em] text-gold-deep">
          Future Expansion
        </p>

        <h2 className="mt-2 font-display text-3xl text-ink">
          Locations Coming Soon
        </h2>

        <p className="mt-4 max-w-3xl leading-8 text-ink/70">
          We open new locations several times a year. Check back to find out the
          latest news!
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {COMING_SOON_LOCATIONS.map((loc) => (
            <div
              key={loc.name}
              className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="bg-navy px-6 py-5 text-white">
                <p className="text-xs uppercase tracking-[0.35em] text-gold">
                  Opening {loc.opening}
                </p>

                <h3 className="mt-2 font-display text-3xl">{loc.name}</h3>

                {loc.label && (
                  <p className="mt-2 text-sm text-white/80">{loc.label}</p>
                )}
              </div>

              <div className="space-y-4 p-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-ink/50">
                    Address
                  </p>

                  <p className="mt-2 text-lg text-ink">{loc.address}</p>
                  <p className="text-ink/60">{loc.cityState}</p>
                </div>

                <div className="rounded-lg bg-cream p-4">
                  <p className="text-sm leading-7 text-ink/70">
                    This warehouse is currently under development and is
                    expected to open in <strong>{loc.opening}</strong>.
                  </p>
                </div>

                <a
                  href={loc.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-sm bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-widest2 text-navy transition hover:bg-gold-light"
                >
                  Get Directions
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="holidays" className="mt-20">
        <div className="rounded-xl bg-red-50 p-10 shadow-sm ring-1 ring-red-100">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-2xl">
              !
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-red-700">
                Closed for Holidays
              </p>

              <h2 className="mt-2 font-display text-3xl text-ink">
                Warehouse Holiday Closures
              </h2>
            </div>
          </div>

          <p className="mt-6 max-w-3xl leading-8 text-ink/70">
            Restaurant Depot warehouses are closed on the following holidays.
            Please plan your shopping accordingly, as all warehouse locations
            will be closed on these dates.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {HOLIDAYS.map((holiday) => (
              <div
                key={holiday}
                className="flex items-center gap-4 rounded-lg bg-white p-5 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-700">
                  ×
                </div>

                <span className="font-medium text-ink">{holiday}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-lg border-l-4 border-gold bg-cream p-6">
            <h3 className="font-display text-lg text-navy">
              Before You Visit
            </h3>

            <p className="mt-3 leading-7 text-ink/70">
              Some warehouse operating hours may vary before or after major
              holidays. Please check with your local Restaurant Depot warehouse
              for seasonal hours before visiting.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}