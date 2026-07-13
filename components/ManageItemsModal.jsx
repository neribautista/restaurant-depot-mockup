"use client";

import { useState, useMemo } from "react";
import products from "@/data/products.json";

export default function ManageItemsModal({ list, onClose, onUpdate }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  // Show recommendations after 2 characters
  const searchRecommendations = useMemo(() => {
    if (searchTerm.length < 2) return [];

    const term = searchTerm.toLowerCase();
    return products
      .filter(
        (p) =>
          (p.name.toLowerCase().includes(term) ||
            p.category.toLowerCase().includes(term)) &&
          !list.items.some((item) => item.productId === p.id)
      )
      .slice(0, 5);
  }, [searchTerm, list.items]);

  const handleAddProduct = (product) => {
    const newItem = {
      productId: product.id,
      name: product.name,
      quantity: selectedQuantity,
      price: product.price,
      addedAt: new Date().toISOString(),
    };

    const updatedList = {
      ...list,
      items: [...list.items, newItem],
    };

    onUpdate(updatedList);
    setSearchTerm("");
    setSelectedQuantity(1);
  };

  const handleRemoveItem = (index) => {
    const updatedList = {
      ...list,
      items: list.items.filter((_, i) => i !== index),
    };
    onUpdate(updatedList);
  };

  const handleUpdateItemQuantity = (index, newQuantity) => {
    const updatedItems = [...list.items];
    updatedItems[index].quantity = newQuantity;
    const updatedList = {
      ...list,
      items: updatedItems,
    };
    onUpdate(updatedList);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-navy/10 p-6 flex items-center justify-between">
          <h2 className="font-display text-lg text-navy">{list.name}</h2>
          <button
            onClick={onClose}
            className="text-navy/60 hover:text-navy text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Search Section */}
          <div>
            <label className="block text-sm font-medium text-navy mb-2">
              Search Products (Type 2+ characters)
            </label>
            <div className="space-y-3">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by product name or category..."
                className="w-full border border-navy/20 rounded px-3 py-2 focus:outline-none focus:border-gold"
              />

              {/* Quantity Input */}
              {searchTerm.length >= 2 && (
                <div className="flex gap-3">
                  <input
                    type="number"
                    min="1"
                    value={selectedQuantity}
                    onChange={(e) =>
                      setSelectedQuantity(parseInt(e.target.value) || 1)
                    }
                    className="w-20 border border-navy/20 rounded px-3 py-2 focus:outline-none focus:border-gold"
                  />
                  <p className="text-sm text-navy/60 pt-2">
                    Qty to add to list
                  </p>
                </div>
              )}

              {/* Recommendations */}
              {searchRecommendations.length > 0 && (
                <div className="bg-navy/5 rounded p-3 space-y-2">
                  <p className="text-xs font-medium text-navy/60">
                    Matching Products:
                  </p>
                  {searchRecommendations.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between bg-white p-3 rounded border border-navy/10 hover:border-gold/30 transition-colors"
                    >
                      <div>
                        <p className="text-sm font-medium text-navy">
                          {product.name}
                        </p>
                        <p className="text-xs text-navy/60">
                          ${product.price?.toFixed(2) || "N/A"} •{" "}
                          {product.category}
                        </p>
                      </div>
                      <button
                        onClick={() => handleAddProduct(product)}
                        className="px-3 py-1 bg-gold text-navy text-sm font-medium rounded hover:bg-gold/90 transition-colors"
                      >
                        Add
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {searchTerm.length >= 2 && searchRecommendations.length === 0 && (
                <p className="text-sm text-navy/60 text-center py-2">
                  No matching products found.
                </p>
              )}
            </div>
          </div>

          {/* Current Items */}
          <div>
            <h3 className="font-medium text-navy mb-3">
              Items in List ({list.items?.length || 0})
            </h3>
            {!list.items || list.items.length === 0 ? (
              <p className="text-sm text-navy/60 text-center py-4">
                No items yet. Search above to add products.
              </p>
            ) : (
              <div className="space-y-2">
                {list.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-navy/5 p-3 rounded"
                  >
                    <div>
                      <p className="text-sm font-medium text-navy">
                        {item.name}
                      </p>
                      <p className="text-xs text-navy/60">
                        ${item.price?.toFixed(2) || "N/A"}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleUpdateItemQuantity(
                            index,
                            parseInt(e.target.value) || 1
                          )
                        }
                        className="w-16 border border-navy/20 rounded px-2 py-1 text-sm focus:outline-none focus:border-gold"
                      />
                      <button
                        onClick={() => handleRemoveItem(index)}
                        className="text-rust hover:text-rust/70 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* List Summary */}
          {list.items && list.items.length > 0 && (
            <div className="bg-gold/10 p-3 rounded">
              <p className="text-sm text-navy/60">Estimated Total:</p>
              <p className="text-lg font-semibold text-gold-deep">
                $
                {list.items
                  .reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0)
                  .toFixed(2)}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-navy/10 p-4 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gold text-navy font-semibold py-2 rounded hover:bg-gold/90 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}