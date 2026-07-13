"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import products from "@/data/products.json";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import RequireApproved from "@/components/RequireApproved";
import AddToRequisitionModal from "@/components/AddToRequisitionModal";

function CatalogInner() {
  const params = useSearchParams();
  const initialQuery = params.get("q") || "";
  const initialCategory = params.get("category") || "All";

  const [resultIds, setResultIds] = useState(null);
  const [category, setCategory] = useState(initialCategory);
  const [showRequisitionModal, setShowRequisitionModal] =
    useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  let visible = products;

  if (resultIds) {
    visible = products.filter((product) =>
      resultIds.includes(product.id)
    );
  }

  if (category !== "All") {
    visible = visible.filter(
      (product) => product.category === category
    );
  }

  const handleAddToRequisition = (product) => {
    setSelectedProduct(product);
    setShowRequisitionModal(true);
  };

  return (
    <RequireApproved>
      <div className="mx-auto max-w-7xl px-6 py-12">
        <p className="text-xs uppercase tracking-widest2 text-gold-deep">
          Pro Catalog
        </p>

        <h1 className="mt-2 font-display text-3xl text-ink">
          Full Product Catalog
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-ink/60">
          Search in plain language — "something for a summer seafood
          special" works as well as a product name. Add items to your
          requisition lists using the heart icon.
        </p>

        <div className="mt-6">
          <SearchBar
            initialQuery={initialQuery}
            onResults={setResultIds}
          />
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((categoryName) => (
            <button
              key={categoryName}
              type="button"
              onClick={() => setCategory(categoryName)}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium uppercase tracking-wide transition-colors ${
                category === categoryName
                  ? "border-gold bg-gold text-navy"
                  : "border-cream-dark text-ink/60 hover:border-gold"
              }`}
            >
              {categoryName}
            </button>
          ))}
        </div>

        {resultIds !== null && resultIds.length === 0 && (
          <p className="mt-8 text-sm text-ink/50">
            No matches — try a broader search.
          </p>
        )}

        {/* Matches the flyer card grid */}
        <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {visible.map((product) => (
            <div
              key={product.id}
              className="group relative min-w-0"
            >
              <button
                type="button"
                onClick={() =>
                  handleAddToRequisition(product)
                }
                className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md transition-all duration-200 hover:bg-gold group-hover:scale-105"
                title="Add to Requisition List"
                aria-label={`Add ${product.name} to requisition list`}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>

              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {showRequisitionModal && selectedProduct && (
        <AddToRequisitionModal
          product={selectedProduct}
          onClose={() => {
            setShowRequisitionModal(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </RequireApproved>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={null}>
      <CatalogInner />
    </Suspense>
  );
}
