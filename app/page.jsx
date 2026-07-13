"use client";

import Link from "next/link";
import { useState } from "react";
import products from "@/data/products.json";
import ProductCard from "@/components/ProductCard";
import SupplierUpdateNotice from "@/components/SupplierUpdateNotice";
import SearchBar from "@/components/SearchBar";

const CATEGORIES = [
  "Meat & Poultry",
  "Fish & Seafood",
  "Produce",
  "Dairy & Cheese",
  "Grocery & Supplies",
  "Equipment",
];

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState(
    CATEGORIES[0]
  );

  // Tracks the small "Request a Margin Audit" name/email form.
  const [auditFormData, setAuditFormData] = useState({
    name: "",
    email: "",
  });

  const handleAuditFieldChange = (event) => {
    const { name, value } = event.target;

    setAuditFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const featured = products
    .filter(
      (product) =>
        product.category === activeCategory
    )
    .slice(0, 3);

  return (
    <div>
      <SupplierUpdateNotice />

      {/* Hero */}
      <section
        className="relative flex min-h-[46vh] flex-col items-center justify-center overflow-hidden bg-charcoal px-6 py-20 text-center"
        style={{
          backgroundImage: "url('/images/landing_page_.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 max-w-3xl">
          <p className="mb-4 text-xs uppercase tracking-widest2 text-gold-light">
            Restaurant Depot
          </p>

          <h1 className="font-display text-4xl leading-tight text-cream sm:text-6xl">
            Where Restaurants Shop
          </h1>

          <p className="mt-3 font-display text-lg italic text-cream/80">
            Savings, Selection, Service — 7 Days A Week
          </p>

          <div className="mx-auto mt-8">
            <SearchBar
              variant="dark"
              placeholder="Search Restaurant Depot…"
            />
          </div>

          <Link
            href="/products"
            className="mt-6 inline-block rounded-sm bg-gold px-8 py-3 text-sm font-semibold uppercase tracking-widest2 text-navy transition-colors hover:bg-gold-light"
          >
            Explore Pro Catalog
          </Link>
        </div>
      </section>

      {/* Supplier and savings section */}
      <section className="bg-navy px-6 py-14">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-sm border border-white/10 bg-white/5 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Information side */}
          <div className="relative flex flex-col justify-center p-8 text-cream md:p-12">
            <div className="absolute left-0 top-0 h-full w-1 bg-gold" />

            <p className="font-mono text-xs uppercase tracking-widest2 text-gold-light">
              Invoice Comparison
            </p>

            <h2 className="mt-3 font-display text-3xl text-cream">
              How Much Could Your Business Save?
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-6 text-cream/70">
              Submit a recent supplier invoice and receive a personalized
              comparison based on the products your business already purchases.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              <div className="border-l border-gold pl-3">
                <p className="text-sm font-semibold text-cream">
                  No fixed estimate
                </p>

                <p className="mt-1 text-xs text-cream/55">
                  Savings depend on your order mix.
                </p>
              </div>

              <div className="border-l border-gold pl-3">
                <p className="text-sm font-semibold text-cream">
                  Invoice-based
                </p>

                <p className="mt-1 text-xs text-cream/55">
                  Compare actual supplier pricing.
                </p>
              </div>

              <div className="border-l border-gold pl-3">
                <p className="text-sm font-semibold text-cream">
                  Business-focused
                </p>

                <p className="mt-1 text-xs text-cream/55">
                  Built for foodservice purchasing.
                </p>
              </div>
            </div>
          </div>

          {/* Form side */}
          <div className="bg-white p-8 md:p-12">
            <p className="text-xs font-semibold uppercase tracking-widest2 text-gold-deep">
              Complimentary Cost Review
            </p>

            <h3 className="mt-3 font-display text-3xl text-ink">
              Request a Margin Audit
            </h3>

            <p className="mt-3 text-sm leading-6 text-ink/60">
              Tell us how to contact you. On the next page, you can provide the
              supplier information needed for your comparison.
            </p>

            <form
              action="/supplier-update#savings-request"
              className="mt-6 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                const params = new URLSearchParams({
                  name: auditFormData.name,
                  email: auditFormData.email,
                });
                window.location.href = `/supplier-update?${params.toString()}#savings-request`;
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="audit-name"
                    className="mb-1 block text-xs font-medium text-navy"
                  >
                    Name
                  </label>

                  <input
                    id="audit-name"
                    name="name"
                    required
                    value={auditFormData.name}
                    onChange={handleAuditFieldChange}
                    placeholder="Your name"
                    className="w-full rounded-sm border border-navy/20 px-4 py-3 text-sm text-ink focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="audit-email"
                    className="mb-1 block text-xs font-medium text-navy"
                  >
                    Email
                  </label>

                  <input
                    id="audit-email"
                    name="email"
                    type="email"
                    required
                    value={auditFormData.email}
                    onChange={handleAuditFieldChange}
                    placeholder="you@business.com"
                    className="w-full rounded-sm border border-navy/20 px-4 py-3 text-sm text-ink focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-sm bg-gold py-3 text-sm font-semibold uppercase tracking-widest2 text-navy transition-colors hover:bg-gold-light sm:w-fit sm:px-8"
              >
                Request Cost Analysis
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Featured categories */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-display text-2xl text-ink">
            This Month&apos;s Curated Provisions
          </h2>

          <Link
            href="/products"
            className="text-sm font-semibold text-navy underline underline-offset-4"
          >
            View full catalog
          </Link>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium uppercase tracking-wide transition-colors ${
                activeCategory === category
                  ? "border-gold bg-gold text-navy"
                  : "border-cream-dark text-ink/60 hover:border-gold"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Membership CTA */}
      <section className="bg-cream-dark px-6 py-16 text-center">
        <h2 className="font-display text-3xl text-ink">Not a Member Yet?</h2>

        <p className="mx-auto mt-3 max-w-xl text-sm text-ink/60">
          Free membership for licensed foodservice businesses. Apply in a few
          minutes and start sourcing once approved.
        </p>

        <Link
          href="/register"
          className="mt-6 inline-block rounded-sm bg-navy px-8 py-3 text-sm font-semibold uppercase tracking-widest2 text-cream transition-colors hover:bg-navy-light"
        >
          Apply for Membership
        </Link>
      </section>
    </div>
  );
}
