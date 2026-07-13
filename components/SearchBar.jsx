"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import products from "@/data/products.json";

// Non-product pages a search term might actually mean.
// Add more entries here as new pages are built.
const PAGES = [
  // About
  {
    label: "About Us",
    href: "/about",
    keywords: ["about", "about us", "who we are", "company"],
  },
  {
    label: "Company Information",
    href: "/about/company-information",
    keywords: ["company information", "company info", "corporate"],
  },
  {
    label: "Careers",
    href: "/about/careers",
    keywords: ["career", "careers", "job", "jobs", "hiring", "employment"],
  },
  {
    label: "Our Brands",
    href: "/about/our-brands",
    keywords: ["brand", "brands", "our brands"],
  },
  {
    label: "Product Videos",
    href: "/about/product-videos",
    keywords: ["video", "videos", "product video", "demo"],
  },
  {
    label: "Testimonials",
    href: "/about/testimonials",
    keywords: ["testimonial", "testimonials", "review", "reviews", "customer feedback"],
  },

  // Locations
  {
    label: "Find a Warehouse",
    href: "/locations",
    keywords: [
      "branch",
      "branches",
      "warehouse",
      "warehouses",
      "location",
      "locations",
      "store",
      "stores",
      "near me",
      "address",
      "find a store",
    ],
  },
  {
    label: "Locations Coming Soon",
    href: "/locations#coming-soon",
    keywords: ["coming soon", "new location", "new store", "opening soon"],
  },
  {
    label: "Holiday Closures",
    href: "/locations#holidays",
    keywords: ["holiday", "holidays", "closure", "closures", "closed", "holiday hours"],
  },

  // Resources
  {
    label: "Online Ordering",
    href: "/resources/online-ordering",
    keywords: ["online order", "online ordering", "order online", "ordering"],
  },
  {
    label: "Food Safety & Handling",
    href: "/resources/food-safety",
    keywords: ["food safety", "handling", "safety", "food handling"],
  },
  {
    label: "Department Tours",
    href: "/resources/department-tours",
    keywords: ["tour", "tours", "department tour", "warehouse tour"],
  },
  {
    label: "Text Permission",
    href: "/resources/text-permission",
    keywords: ["text", "texting", "sms", "text permission", "opt in", "opt-in"],
  },
  {
    label: "Request Cost Analysis",
    href: "/supplier-update",
    keywords: [
      "cost analysis",
      "savings",
      "invoice",
      "compare pricing",
      "margin audit",
      "supplier",
    ],
  },

  // Membership & account (not in top nav menus, but live routes)
  {
    label: "Membership Benefits",
    href: "/membership/benefits",
    keywords: ["membership", "benefit", "benefits", "member"],
  },
  {
    label: "Membership Terms",
    href: "/membership/terms",
    keywords: ["terms", "membership terms", "conditions"],
  },
  {
    label: "Apply for Membership",
    href: "/register",
    keywords: ["register", "apply", "sign up", "signup", "join"],
  },
  {
    label: "Your Cart",
    href: "/cart",
    keywords: ["cart", "checkout", "requisition", "requisition list"],
  },

  // Jetro (kept namespaced with "jetro" so it doesn't compete with
  // Restaurant Depot's own location/store suggestions above)
  {
    label: "Jetro: Our Services & Store",
    href: "/jetro/services",
    keywords: ["jetro", "jetro services", "jetro store"],
  },
  {
    label: "Jetro: Store Locations",
    href: "/jetro/locations",
    keywords: ["jetro location", "jetro locations", "jetro store", "jetro branch"],
  },
  {
    label: "Jetro: Export Assistance",
    href: "/jetro/export-assistance",
    keywords: ["export", "export assistance", "jetro export", "international"],
  },
  {
    label: "Jetro: Regional Flyers",
    href: "/jetro/flyers",
    keywords: ["jetro flyer", "jetro flyers", "regional flyer"],
  },
];

const MAX_PRODUCT_SUGGESTIONS = 6;

export default function SearchBar({
  onResults,
  placeholder = "Search premium ingredients...",
  variant = "light",
}) {
  const isDark = variant === "dark";
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const blurTimeout = useRef(null);

  const trimmed = query.trim().toLowerCase();

  const matchedPages = trimmed
    ? PAGES.filter((page) =>
        page.keywords.some(
          (keyword) =>
            keyword.includes(trimmed) || trimmed.includes(keyword)
        )
      )
    : [];

  const matchedCategories = trimmed
    ? [...new Set(products.map((product) => product.category))].filter(
        (category) => category.toLowerCase().includes(trimmed)
      )
    : [];

  const matchedProducts = trimmed
    ? products
        .filter(
          (product) =>
            product.name.toLowerCase().includes(trimmed) ||
            product.category.toLowerCase().includes(trimmed)
        )
        .slice(0, MAX_PRODUCT_SUGGESTIONS)
    : [];

  const hasSuggestions =
    matchedPages.length > 0 ||
    matchedCategories.length > 0 ||
    matchedProducts.length > 0;

  const closeDropdown = () => setOpen(false);

  const handleFocus = () => {
    if (trimmed) setOpen(true);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setOpen(value.trim().length > 0);
  };

  const handleBlur = () => {
    // Delay so a suggestion's onMouseDown can still fire before we close.
    blurTimeout.current = setTimeout(closeDropdown, 120);
  };

  const cancelBlurClose = () => {
    if (blurTimeout.current) clearTimeout(blurTimeout.current);
  };

  const goToProduct = (product) => {
    setQuery("");
    closeDropdown();
    router.push(`/products?q=${encodeURIComponent(product.name)}`);
  };

  const goToCategory = (category) => {
    setQuery("");
    closeDropdown();
    router.push(`/products?category=${encodeURIComponent(category)}`);
  };

  const goToPage = (page) => {
    setQuery("");
    closeDropdown();
    router.push(page.href);
  };

  const runSemanticSearch = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      onResults(data.ids || []);
    } catch {
      onResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    closeDropdown();

    if (!query.trim()) {
      if (onResults) onResults(null);
      return;
    }

    // If a page keyword matches strongly, prefer sending them there.
    const pageMatch = matchedPages[0];
    if (pageMatch && !onResults) {
      goToPage(pageMatch);
      return;
    }

    if (onResults) {
      await runSemanticSearch();
    } else {
      router.push(`/products?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="relative w-full max-w-xl">
      <form onSubmit={handleSubmit} className="flex w-full gap-2">
        <input
          value={query}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={`w-full rounded-sm border px-4 py-3 text-sm focus:outline-none ${
            isDark
              ? "border-white/20 bg-white/10 text-cream placeholder:text-cream/50 backdrop-blur focus:border-gold"
              : "border-cream-dark bg-white text-ink placeholder:text-ink/40 focus:border-gold"
          }`}
        />
        <button
          type="submit"
          disabled={loading}
          className="shrink-0 rounded-sm bg-gold px-5 py-3 text-sm font-semibold uppercase tracking-wide text-navy hover:bg-gold-light disabled:opacity-60"
        >
          {loading ? "Searching…" : "Search"}
        </button>
      </form>

      {open && hasSuggestions && (
        <div
          onMouseDown={cancelBlurClose}
          className="absolute left-0 right-0 top-full z-20 mt-1 max-h-96 overflow-y-auto rounded-sm border border-cream-dark bg-white shadow-lg"
        >
          {matchedPages.length > 0 && (
            <div className="border-b border-cream-dark p-2">
              {matchedPages.map((page) => (
                <button
                  key={page.href}
                  type="button"
                  onMouseDown={() => goToPage(page)}
                  className="flex w-full items-center gap-2 rounded-sm px-2 py-2 text-left text-sm text-ink hover:bg-cream"
                >
                  <span className="font-semibold">{page.label}</span>
                </button>
              ))}
            </div>
          )}

          {matchedCategories.length > 0 && (
            <div className="flex flex-wrap gap-2 border-b border-cream-dark p-2">
              {matchedCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onMouseDown={() => goToCategory(category)}
                  className="rounded-full border border-cream-dark px-3 py-1 text-xs font-medium uppercase tracking-wide text-ink/70 hover:border-gold hover:text-navy"
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          {matchedProducts.length > 0 && (
            <div className="p-1">
              {matchedProducts.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onMouseDown={() => goToProduct(product)}
                  className="flex w-full items-center gap-3 rounded-sm px-2 py-2 text-left hover:bg-cream"
                >
                  <div className="h-10 w-10 shrink-0 overflow-hidden rounded-sm bg-cream-dark">
                    {product.image && (
                      <img
                        src={product.image}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm text-ink">
                      {product.name}
                    </p>
                    <p className="text-xs text-ink/45">
                      {product.category}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
