"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

// Mirrors the fallback key logic in CartContext so rendering keys never
// collide. Product data uses `id`, not `productId`.
function itemKey(item) {
  return item?.productId ?? item?.id ?? item?.name;
}

export default function CartPage() {
  const { user, ready, isApprovedMember } = useAuth();
  const router = useRouter();
  const {
    items,
    requisitionLists,
    removeFromCart,
    updateQuantity,
    removeRequisitionList,
    removeRequisitionItem,
  } = useCart();

  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedRequisitions, setSelectedRequisitions] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!ready) return;
    if (!user || !isApprovedMember) router.replace("/");
  }, [ready, user, isApprovedMember, router]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Keep selection valid if items/blocks get removed (e.g. via the drawer) while this page is open
  useEffect(() => {
    setSelectedItems((prev) => prev.filter((idx) => idx < items.length));
  }, [items.length]);

  useEffect(() => {
    setSelectedRequisitions((prev) =>
      prev.filter((id) => requisitionLists.some((b) => b.id === id))
    );
  }, [requisitionLists]);

  const handleSelectItem = (idx) => {
    setSelectedItems((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const handleSelectRequisition = (listId) => {
    setSelectedRequisitions((prev) =>
      prev.includes(listId) ? prev.filter((id) => id !== listId) : [...prev, listId]
    );
  };

  const requisitionItemTotal = requisitionLists.reduce((sum, b) => sum + b.items.length, 0);
  const totalItems = items.length + requisitionItemTotal;

  const selectedItemsData = items.filter((_, idx) => selectedItems.includes(idx));
  const selectedRequisitionItems = requisitionLists
    .filter((b) => selectedRequisitions.includes(b.id))
    .flatMap((b) => b.items);

  const allSelected = [...selectedItemsData, ...selectedRequisitionItems];
  const selectedCount = selectedItemsData.length + selectedRequisitionItems.length;

  const subtotal = allSelected.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const hasAnyEntities = items.length > 0 || requisitionLists.length > 0;
  const allEntitiesSelected =
    hasAnyEntities &&
    selectedItems.length === items.length &&
    selectedRequisitions.length === requisitionLists.length;

  const handleSelectAll = () => {
    if (allEntitiesSelected) {
      setSelectedItems([]);
      setSelectedRequisitions([]);
    } else {
      setSelectedItems(items.map((_, idx) => idx));
      setSelectedRequisitions(requisitionLists.map((b) => b.id));
    }
  };

  const handleProceedToCheckout = () => {
    router.push("/checkout");
  };

  if (!user || !mounted) return null;

  return (
    <div className="min-h-screen bg-cream py-12 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="font-display text-3xl text-navy mb-2">Shopping Cart</h1>
          <p className="text-navy/60">Total items ({totalItems})</p>
        </div>

        {totalItems === 0 ? (
          <div className="bg-white p-12 rounded border border-navy/10 text-center">
            <p className="text-navy/60 mb-4">Your cart is empty.</p>
            <Link href="/products" className="text-gold-deep hover:text-gold font-medium">
              Browse products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Items Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded border border-navy/10">
                {/* Header */}
                <div className="p-4 border-b border-navy/10 flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={allEntitiesSelected}
                    onChange={handleSelectAll}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <span className="text-sm font-medium text-navy">
                    Select All ({selectedCount}/{totalItems})
                  </span>
                </div>

                {/* Cart Items */}
                {items.length > 0 && (
                  <div>
                    <div className="px-4 py-3 bg-navy/5 border-b border-navy/10">
                      <p className="text-sm font-semibold text-navy">Cart Items</p>
                    </div>
                    <div className="space-y-0">
                      {items.map((item, idx) => (
                        <div
                          key={item.id}
                          className="px-4 py-3 border-b border-navy/10 flex items-center gap-3 hover:bg-navy/2"
                        >
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(idx)}
                            onChange={() => handleSelectItem(idx)}
                            className="w-4 h-4 cursor-pointer"
                          />

                          <div className="flex-grow">
                            <p className="text-sm font-medium text-navy">{item.name}</p>
                            <p className="text-xs text-navy/60">
                              ${item.price?.toFixed(2) || "N/A"} each
                            </p>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="flex items-center border border-navy/20 rounded">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="px-2 py-1 text-navy hover:bg-navy/5"
                              >
                                −
                              </button>
                              <span className="px-3 text-sm text-navy">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="px-2 py-1 text-navy hover:bg-navy/5"
                              >
                                +
                              </button>
                            </div>
                            <p className="text-sm font-semibold text-gold-deep w-16 text-right">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-rust hover:text-rust/70 text-sm font-medium"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Requisition Lists (only blocks actually added to the cart) */}
                {requisitionLists.length > 0 && (
                  <div>
                    <div className="px-4 py-3 bg-gold/5 border-b border-navy/10">
                      <p className="text-sm font-semibold text-navy">Requisition Lists</p>
                    </div>
                    <div className="space-y-0">
                      {requisitionLists.map((block) => (
                        <div key={block.id}>
                          <div className="px-4 py-3 bg-gold/10 border-b border-navy/10 flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={selectedRequisitions.includes(block.id)}
                              onChange={() => handleSelectRequisition(block.id)}
                              className="w-4 h-4 cursor-pointer"
                            />
                            <p className="text-sm font-medium text-navy flex-grow">
                              {block.name} ({block.items.length} items)
                            </p>
                            <button
                              onClick={() => removeRequisitionList(block.id)}
                              className="text-rust hover:text-rust/70 text-sm font-medium"
                            >
                              Remove
                            </button>
                          </div>
                          <div className="space-y-0">
                            {block.items.map((item) => (
                              <div
                                key={itemKey(item)}
                                className="px-4 py-3 border-b border-navy/10 flex items-center gap-3 pl-12 hover:bg-navy/2 text-sm"
                              >
                                <div className="flex-grow">
                                  <p className="font-medium text-navy">{item.name}</p>
                                  <p className="text-xs text-navy/60">
                                    ${item.price?.toFixed(2) || "N/A"} each
                                  </p>
                                </div>

                                <div className="flex items-center gap-4">
                                  <p className="text-sm text-navy/70 w-12">Qty: {item.quantity}</p>
                                  <p className="text-sm font-semibold text-gold-deep w-16 text-right">
                                    ${(item.price * item.quantity).toFixed(2)}
                                  </p>
                                  <button
                                    onClick={() => removeRequisitionItem(block.id, item)}
                                    className="text-rust hover:text-rust/70 text-xs font-medium"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Checkout Section */}
            <div className="bg-white p-6 rounded border border-navy/10 h-fit sticky top-6">
              <h3 className="font-display text-lg text-navy mb-4">Order Summary</h3>

              <div className="space-y-3 mb-6 pb-6 border-b border-navy/10">
                <div className="flex justify-between text-sm">
                  <span className="text-navy/60">Items Selected:</span>
                  <span className="font-medium text-navy">{selectedCount}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-navy/60">Subtotal:</span>
                  <span className="font-medium text-navy">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-navy/60">Tax (10%):</span>
                  <span className="font-medium text-navy">${tax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-navy/60">Shipping:</span>
                  <span className="font-medium text-navy">Free</span>
                </div>
              </div>

              <div className="mb-6 pb-6 border-b border-navy/10">
                <div className="flex justify-between">
                  <span className="font-semibold text-navy">Total:</span>
                  <span className="font-display text-lg text-gold-deep">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleProceedToCheckout}
                disabled={selectedCount === 0}
                className="w-full rounded-sm bg-gold py-3 text-sm font-semibold uppercase tracking-widest2 text-navy hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Proceed to Checkout
              </button>

              <Link
                href="/products"
                className="block mt-3 text-center text-sm text-gold-deep hover:text-gold font-medium"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
