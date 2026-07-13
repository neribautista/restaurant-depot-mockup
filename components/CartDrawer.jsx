"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

// Mirrors the fallback key logic in CartContext so rendering keys and
// lookups never collide. Product data uses `id`, not `productId`.
function itemKey(item) {
  return item?.productId ?? item?.id ?? item?.name;
}

export default function CartDrawer({ isOpen, onClose }) {
  const {
    items,
    requisitionLists: cartRequisitionLists,
    addToCart,
    removeFromCart,
    addRequisitionList,
    addRequisitionItem,
    removeRequisitionList,
    removeRequisitionItem,
    isRequisitionListFullyAdded,
    isRequisitionItemAdded,
  } = useCart();

  const [mounted, setMounted] = useState(false);
  const [availableLists, setAvailableLists] = useState([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const stored = localStorage.getItem("requisitionLists");
    if (stored) {
      setAvailableLists(JSON.parse(stored));
    }
  }, [isOpen]);

  if (!mounted) return null;

  // Totals only ever reflect what's actually IN the cart (flat items + added requisition items)
  const cartTotalItems =
    items.length + cartRequisitionLists.reduce((sum, b) => sum + b.items.length, 0);

  const cartTotalPrice =
    items.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0) +
    cartRequisitionLists.reduce(
      (sum, b) => sum + b.items.reduce((s, i) => s + i.price * i.quantity, 0),
      0
    );

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />}

      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-lg z-50 transition-transform duration-300 overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="sticky top-0 p-6 border-b border-navy/10 flex items-center justify-between bg-white">
          <h2 className="font-display text-lg text-navy">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="text-navy/60 hover:text-navy text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="p-6 space-y-4">
          {cartTotalItems === 0 && (
            <p className="text-sm text-navy/60 text-center py-4">Your cart is empty.</p>
          )}

          {/* Directly added items */}
          {items.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-navy/60 uppercase mb-2">
                Cart Items ({items.length})
              </p>
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="bg-navy/5 p-3 rounded">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-grow">
                        <p className="text-xs font-semibold text-navy">{item.name}</p>
                        <p className="text-xs text-navy/60">
                          ${item.price?.toFixed(2) || "N/A"}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-rust hover:text-rust/70 text-xs font-medium"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-navy/70">Qty: {item.quantity}</span>
                      <span className="font-medium text-navy">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Requisition list blocks that are actually in the cart */}
          {cartRequisitionLists.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-navy/60 uppercase mb-2">
                Requisition Lists In Cart
              </p>
              <div className="space-y-2">
                {cartRequisitionLists.map((block) => (
                  <div key={block.id} className="bg-gold/10 p-3 rounded border border-gold/20">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-xs font-semibold text-navy">{block.name}</p>
                        <p className="text-xs text-navy/60">{block.items.length} items</p>
                      </div>
                      <button
                        onClick={() => removeRequisitionList(block.id)}
                        className="text-rust hover:text-rust/70 text-xs font-medium"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="space-y-1.5 mt-2">
                      {block.items.map((item) => (
                        <div
                          key={itemKey(item)}
                          className="flex items-center justify-between gap-2 text-xs bg-white/60 rounded px-2 py-1.5"
                        >
                          <div className="flex-grow min-w-0">
                            <p className="text-navy/80 truncate">{item.name}</p>
                            <p className="text-navy/50">
                              ×{item.quantity} · ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                          <button
                            onClick={() => removeRequisitionItem(block.id, item)}
                            className="shrink-0 text-[11px] font-medium px-2 py-1 rounded bg-navy/10 text-navy hover:bg-navy/20"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Browse library: lists available to add */}
          {availableLists.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-navy/60 uppercase mb-2">
                Requisition Lists
              </p>
              <div className="space-y-2">
                {availableLists.map((list) => {
                  const fullyAdded = isRequisitionListFullyAdded(list);
                  return (
                    <div key={list.id} className="bg-gold/5 p-3 rounded border border-gold/10">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-grow">
                          <p className="text-xs font-semibold text-navy">{list.name}</p>
                          <p className="text-xs text-navy/60">
                            {(list.items || []).length} items
                          </p>
                        </div>
                        <button
                          onClick={() => addRequisitionList(list)}
                          disabled={fullyAdded}
                          className={`text-xs font-medium px-2 py-1 rounded transition-colors ${
                            fullyAdded
                              ? "bg-green-100 text-green-700 cursor-not-allowed"
                              : "bg-gold/20 text-gold-deep hover:bg-gold/30"
                          }`}
                        >
                          {fullyAdded ? "✓ Added" : "Add All"}
                        </button>
                      </div>

                      <div className="space-y-1.5 mt-2">
                        {(list.items || []).map((item) => {
                          const isAdded = isRequisitionItemAdded(list.id, item);
                          return (
                            <div
                              key={itemKey(item)}
                              className="flex items-center justify-between gap-2 text-xs bg-white/60 rounded px-2 py-1.5"
                            >
                              <div className="flex-grow min-w-0">
                                <p className="text-navy/80 truncate">{item.name}</p>
                                <p className="text-navy/50">
                                  ×{item.quantity} · ${(item.price * item.quantity).toFixed(2)}
                                </p>
                              </div>
                              <button
                                onClick={() => addRequisitionItem(list, item)}
                                disabled={isAdded}
                                className={`shrink-0 text-[11px] font-medium px-2 py-1 rounded transition-colors ${
                                  isAdded
                                    ? "bg-green-100 text-green-700 cursor-not-allowed"
                                    : "bg-navy/10 text-navy hover:bg-navy/20"
                                }`}
                              >
                                {isAdded ? "✓" : "Add"}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {cartTotalItems > 0 && (
          <div className="sticky bottom-0 border-t border-navy/10 p-6 space-y-3 bg-white">
            <div className="bg-navy/5 p-3 rounded">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-navy/60">Total Items:</span>
                <span className="font-semibold text-navy">{cartTotalItems}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-navy/60">Total:</span>
                <span className="font-display text-lg text-gold-deep">
                  ${cartTotalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            <Link
              href="/checkout"
              onClick={onClose}
              className="block w-full text-center bg-gold text-navy font-semibold py-2 rounded hover:bg-gold/90 transition-colors"
            >
              Proceed to Checkout
            </Link>
            <Link
              href="/cart"
              onClick={onClose}
              className="block w-full text-center border border-navy/30 text-navy font-semibold py-2 rounded hover:bg-navy/5 transition-colors"
            >
              Continue to Cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
