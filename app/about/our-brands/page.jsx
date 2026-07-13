"use client";

import { useMemo, useState } from "react";
import PageHero from "@/components/PageHero";

const BRANDS = [
  {
    name: "Big C",
    image: "/images/brands/big-c.webp",
    category: "Meat & Poultry",
  },
  {
    name: "Black Steer Brand",
    image: "/images/brands/black-steer.png",
    category: "Meat & Poultry",
  },
  {
    name: "Captain's Catch",
    image: "/images/brands/captains-catch.png",
    category: "Fish & Seafood",
  },
  {
    name: "Carver's Pride",
    image: "/images/brands/carvers-pride.png",
    category: "Meat & Poultry",
  },
  {
    name: "Chef's Quality",
    image: "/images/brands/chefs-quality.png",
    category: "Grocery & Supplies",
  },
  {
    name: "Dragon Wealth",
    image: "/images/brands/dragon-wealth.png",
    category: "Grocery & Supplies",
  },
  {
    name: "Dunphy & Cork",
    image: "/images/brands/dunphy-cork.png",
    category: "Meat & Poultry",
  },
  {
    name: "Garden Valley",
    image: "/images/brands/garden-valley.png",
    category: "Produce",
  },
  {
    name: "Good Morning Sunrise",
    image: "/images/brands/goodmorning-sunrise.png",
    category: "Grocery & Supplies",
  },
  {
    name: "Isabella",
    image: "/images/brands/isabella.png",
    category: "Pasta & Italian",
  },
  {
    name: "James Farm",
    image: "/images/brands/james-farm.png",
    category: "Dairy & Cheese",
  },
  {
    name: "Lenz Best",
    image: "/images/brands/lenz-best.png",
    category: "Grocery & Supplies",
  },
  {
    name: "Mama Isabella's",
    image: "/images/brands/mama-isabellas.png",
    category: "Pasta & Italian",
  },
  {
    name: "Ocean Supreme",
    image: "/images/brands/ocean-supreme.png",
    category: "Fish & Seafood",
  },
  {
    name: "Pasta Isabella",
    image: "/images/brands/pasta-isabella.png",
    category: "Pasta & Italian",
  },
  {
    name: "Qualité",
    image: "/images/brands/qualite.png",
    category: "Grocery & Supplies",
  },
  {
    name: "Restaurant King",
    image: "/images/brands/restaurant-king.png",
    category: "Grocery & Supplies",
  },
  {
    name: "Restaurant Saver",
    image: "/images/brands/restaurant-saver.png",
    category: "Grocery & Supplies",
  },
  {
    name: "Sabor Nuestro",
    image: "/images/brands/sabor-nuestro.png",
    category: "Grocery & Supplies",
  },
  {
    name: "Sir Lawrence",
    image: "/images/brands/sir-lawrence.png",
    category: "Grocery & Supplies",
  },
  {
    name: "Skyline Professional",
    image: "/images/brands/skyline.png",
    category: "Cleaning & Supplies",
  },
  {
    name: "Sunset Brands",
    image: "/images/brands/sunset.png",
    category: "Grocery & Supplies",
  },
  {
    name: "Superior Angus Beef",
    image: "/images/brands/superior.png",
    category: "Meat & Poultry",
  },
  {
    name: "Supremo Italiano",
    image: "/images/brands/supremo-italiano.png",
    category: "Pasta & Italian",
  },
  {
    name: "Traditional",
    image: "/images/brands/traditional.png",
    category: "Grocery & Supplies",
  },
];

const CATEGORIES = [
  "All",
  "Meat & Poultry",
  "Fish & Seafood",
  "Dairy & Cheese",
  "Produce",
  "Pasta & Italian",
  "Grocery & Supplies",
  "Cleaning & Supplies",
];

export default function OurBrandsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const visibleBrands = useMemo(() => {
    const query = search.trim().toLowerCase();

    return BRANDS.filter((brand) => {
      const matchesCategory =
        activeCategory === "All" ||
        brand.category === activeCategory;

      const matchesSearch =
        !query ||
        brand.name.toLowerCase().includes(query) ||
        brand.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const resetFilters = () => {
    setSearch("");
    setActiveCategory("All");
  };

  return (
    <div className="min-h-screen bg-white text-ink">
      <PageHero
        title="Our Brands"
        bgImage="/images/header/our-brands.png"
        crumbs={[
          {
            label: "Restaurant Depot",
            href: "/",
          },
          {
            label: "About",
            href: "/about",
          },
          {
            label: "Our Brands",
          },
        ]}
      />

      {/* Introduction */}
      <section className="border-b border-navy/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest2 text-gold-deep">
                Restaurant Depot Private Labels
              </p>

              <h1 className="mt-3 max-w-3xl font-display text-3xl leading-tight text-navy sm:text-4xl">
                Trusted brands made for professional foodservice
              </h1>

              <p className="mt-5 max-w-3xl text-sm leading-7 text-ink/65">
                Our buyers search the globe to find dependable products
                at competitive prices. We buy direct and focus on value,
                helping restaurants and foodservice businesses maximize
                their purchasing power.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <StatCard
                value={BRANDS.length}
                label="Featured brands"
              />

              <StatCard
                value={CATEGORIES.length - 1}
                label="Categories"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Search and filters */}
      <section className="border-b border-navy/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full max-w-md">
              <svg
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-navy/40"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>

              <input
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search brands..."
                className="w-full rounded-sm border border-navy/15 bg-white py-3 pl-11 pr-4 text-sm text-ink outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
              />
            </div>

            <p className="text-xs font-medium text-ink/50">
              Showing {visibleBrands.length} of {BRANDS.length} brands
            </p>
          </div>

          <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() =>
                  setActiveCategory(category)
                }
                className={`shrink-0 rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-wide transition-colors ${
                  activeCategory === category
                    ? "border-gold bg-gold text-navy"
                    : "border-navy/10 bg-white text-ink/60 hover:border-gold hover:text-navy"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Brand grid */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12">
          {visibleBrands.length === 0 ? (
            <div className="rounded-sm border border-dashed border-navy/20 px-6 py-16 text-center">
              <h2 className="font-display text-2xl text-navy">
                No brands found
              </h2>

              <p className="mt-2 text-sm text-ink/55">
                Try another search term or category.
              </p>

              <button
                type="button"
                onClick={resetFilters}
                className="mt-5 rounded-sm bg-navy px-5 py-2.5 text-xs font-semibold uppercase tracking-widest2 text-white hover:bg-navy-light"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {visibleBrands.map((brand) => (
                <BrandCard
                  key={brand.name}
                  brand={brand}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="border-t border-navy/10 bg-cream px-6 py-14">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest2 text-gold-deep">
              Product Questions
            </p>

            <h2 className="mt-2 font-display text-2xl text-navy">
              Looking for a specific Restaurant Depot brand?
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/60">
              Contact our team for product availability, sourcing
              information, or help locating a brand at your nearest
              warehouse.
            </p>
          </div>

          <a
            href="mailto:communications@jetrord.com"
            className="shrink-0 rounded-sm bg-navy px-6 py-3 text-xs font-semibold uppercase tracking-widest2 text-white transition-colors hover:bg-navy-light"
          >
            Contact Our Team
          </a>
        </div>
      </section>
    </div>
  );
}

function BrandCard({ brand }) {
  return (
    <article className="group flex min-h-[220px] flex-col overflow-hidden rounded-sm border border-navy/10 bg-white transition-all duration-200 hover:-translate-y-1 hover:border-gold/60 hover:shadow-lg">
      {/* White logo area */}
      <div className="flex h-36 items-center justify-center border-b border-navy/5 bg-white p-6">
        <img
          src={brand.image}
          alt={`${brand.name} logo`}
          loading="lazy"
          className="max-h-20 max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-gold-deep">
          {brand.category}
        </p>

        <h2 className="mt-1 font-display text-lg leading-tight text-navy">
          {brand.name}
        </h2>
      </div>
    </article>
  );
}

function StatCard({ value, label }) {
  return (
    <div className="rounded-sm border border-navy/10 bg-cream p-4">
      <p className="font-display text-3xl text-navy">
        {value}
      </p>

      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-ink/50">
        {label}
      </p>
    </div>
  );
}