"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";

const CartContext = createContext(null);

// Stable identity for a requisition-list item. Your product data (see flyer/catalog
// JSON) uses `id`, not `productId` — so prefer productId if present, then id, then name.
function itemKey(item) {
  return item?.productId ?? item?.id ?? item?.name;
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  // requisitionLists here = blocks actually added to the cart (not the master library)
  const [requisitionLists, setRequisitionLists] = useState([]);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedItems = localStorage.getItem("cartItems");
    const savedReqLists = localStorage.getItem("cartRequisitionLists");
    if (savedItems) setItems(JSON.parse(savedItems));
    if (savedReqLists) setRequisitionLists(JSON.parse(savedReqLists));
    setMounted(true);
  }, []);

  // Persist independently
  useEffect(() => {
    if (mounted) localStorage.setItem("cartItems", JSON.stringify(items));
  }, [items, mounted]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("cartRequisitionLists", JSON.stringify(requisitionLists));
    }
  }, [requisitionLists, mounted]);

  // ---------- Flat item cart (unchanged behavior) ----------

  const addToCart = useCallback((product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      }
      return [...prev, { ...product, quantity: product.quantity || 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setItems((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  const updateQuantity = useCallback(
    (productId, quantity) => {
      if (quantity <= 0) {
        removeFromCart(productId);
      } else {
        setItems((prev) =>
          prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
        );
      }
    },
    [removeFromCart]
  );

  // ---------- Requisition list blocks ----------
  // A "block" is { id, name, items: [{ productId, name, price, quantity, image }] }
  // representing only the items from that list that have actually been added to the cart.

  const addRequisitionList = useCallback((list) => {
    setRequisitionLists((prev) => {
      const incomingItems = list.items || [];
      const blockIdx = prev.findIndex((b) => b.id === list.id);

      if (blockIdx === -1) {
        return [
          ...prev,
          { id: list.id, name: list.name, items: incomingItems.map((i) => ({ ...i })) },
        ];
      }

      const block = prev[blockIdx];
      let newItems = [...block.items];
      incomingItems.forEach((item) => {
        const itemIdx = newItems.findIndex((i) => itemKey(i) === itemKey(item));
        if (itemIdx === -1) {
          newItems.push({ ...item });
        } else {
          newItems[itemIdx] = {
            ...newItems[itemIdx],
            quantity: newItems[itemIdx].quantity + item.quantity,
          };
        }
      });

      return prev.map((b, idx) => (idx === blockIdx ? { ...b, items: newItems } : b));
    });
  }, []);

  const addRequisitionItem = useCallback((list, item) => {
    setRequisitionLists((prev) => {
      const blockIdx = prev.findIndex((b) => b.id === list.id);

      if (blockIdx === -1) {
        return [...prev, { id: list.id, name: list.name, items: [{ ...item }] }];
      }

      const block = prev[blockIdx];
      const itemIdx = block.items.findIndex((i) => itemKey(i) === itemKey(item));
      const newItems =
        itemIdx === -1
          ? [...block.items, { ...item }]
          : block.items.map((i, idx) =>
              idx === itemIdx ? { ...i, quantity: i.quantity + item.quantity } : i
            );

      return prev.map((b, idx) => (idx === blockIdx ? { ...b, items: newItems } : b));
    });
  }, []);

  const removeRequisitionList = useCallback((listId) => {
    setRequisitionLists((prev) => prev.filter((b) => b.id !== listId));
  }, []);

  // Takes the full item object (not just productId) so matching stays consistent
  // even when productId is missing on the source data.
  const removeRequisitionItem = useCallback((listId, item) => {
    setRequisitionLists((prev) =>
      prev
        .map((b) =>
          b.id === listId
            ? { ...b, items: b.items.filter((i) => itemKey(i) !== itemKey(item)) }
            : b
        )
        .filter((b) => b.items.length > 0)
    );
  }, []);

  const updateRequisitionItemQuantity = useCallback(
    (listId, item, quantity) => {
      if (quantity <= 0) {
        removeRequisitionItem(listId, item);
        return;
      }
      setRequisitionLists((prev) =>
        prev.map((b) =>
          b.id === listId
            ? {
                ...b,
                items: b.items.map((i) =>
                  itemKey(i) === itemKey(item) ? { ...i, quantity } : i
                ),
              }
            : b
        )
      );
    },
    [removeRequisitionItem]
  );

  // Helpers so "Add All" / "Add" buttons in the drawer can show correct added state
  const isRequisitionListFullyAdded = useCallback(
    (list) => {
      const block = requisitionLists.find((b) => b.id === list.id);
      if (!block) return false;
      return (list.items || []).every((item) => {
        const match = block.items.find((i) => itemKey(i) === itemKey(item));
        return match && match.quantity >= item.quantity;
      });
    },
    [requisitionLists]
  );

  const isRequisitionItemAdded = useCallback(
    (listId, item) => {
      const block = requisitionLists.find((b) => b.id === listId);
      if (!block) return false;
      return block.items.some((i) => itemKey(i) === itemKey(item));
    },
    [requisitionLists]
  );

  const clearCart = useCallback(() => {
    setItems([]);
    setRequisitionLists([]);
  }, []);

  const requisitionItemCount = requisitionLists.reduce((sum, b) => sum + b.items.length, 0);
  const count = items.length + requisitionItemCount;

  return (
    <CartContext.Provider
      value={{
        items,
        requisitionLists,
        count,
        addToCart,
        removeFromCart,
        updateQuantity,
        addRequisitionList,
        addRequisitionItem,
        removeRequisitionList,
        removeRequisitionItem,
        updateRequisitionItemQuantity,
        isRequisitionListFullyAdded,
        isRequisitionItemAdded,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
