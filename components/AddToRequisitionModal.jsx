"use client";

import { useState, useEffect } from "react";
import products from "@/data/products.json";

export default function AddToRequisitionModal({ product, onClose }) {
  const [lists, setLists] = useState([]);
  const [showCreateNew, setShowCreateNew] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [selectedListId, setSelectedListId] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const storedLists = JSON.parse(
      localStorage.getItem("requisitionLists") || "[]"
    );
    setLists(storedLists);
  }, []);

  const handleCreateAndAdd = () => {
    if (!newListName.trim()) return;

    const newList = {
      id: Date.now(),
      name: newListName,
      description: "",
      createdAt: new Date().toLocaleDateString(),
      items: [
        {
          productId: product.id,
          name: product.name,
          quantity,
          price: product.price,
          addedAt: new Date().toISOString(),
        },
      ],
    };

    const updatedLists = [...lists, newList];
    localStorage.setItem("requisitionLists", JSON.stringify(updatedLists));
    setLists(updatedLists);

    alert(`Added "${product.name}" to new list "${newListName}"`);
    onClose();
  };

  const handleAddToExisting = (listId) => {
    if (!selectedListId && !listId) {
      alert("Please select a list");
      return;
    }

    const targetListId = listId || selectedListId;
    const updatedLists = lists.map((list) => {
      if (list.id === targetListId) {
        return {
          ...list,
          items: [
            ...list.items,
            {
              productId: product.id,
              name: product.name,
              quantity,
              price: product.price,
              addedAt: new Date().toISOString(),
            },
          ],
        };
      }
      return list;
    });

    localStorage.setItem("requisitionLists", JSON.stringify(updatedLists));
    setLists(updatedLists);

    const listName = lists.find((l) => l.id === targetListId)?.name;
    alert(`Added "${product.name}" to "${listName}"`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg text-navy">Add to Requisition</h2>
          <button
            onClick={onClose}
            className="text-navy/60 hover:text-navy text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="bg-navy/5 p-3 rounded mb-4">
          <p className="text-sm font-medium text-navy">{product.name}</p>
          <p className="text-xs text-navy/60">
            ${product.price?.toFixed(2) || "N/A"}
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-navy mb-2">
            Quantity
          </label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            className="w-full border border-navy/20 rounded px-3 py-2 focus:outline-none focus:border-gold"
          />
        </div>

        {!showCreateNew ? (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-navy mb-2">
                Select a List
              </label>
              {lists.length === 0 ? (
                <p className="text-sm text-navy/60 text-center py-4">
                  No lists yet. Create one below.
                </p>
              ) : (
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {lists.map((list) => (
                    <button
                      key={list.id}
                      onClick={() => setSelectedListId(list.id)}
                      className={`w-full text-left p-3 rounded border transition-colors ${
                        selectedListId === list.id
                          ? "border-gold bg-gold/10"
                          : "border-navy/20 hover:border-gold/50"
                      }`}
                    >
                      <p className="font-medium text-navy">{list.name}</p>
                      <p className="text-xs text-navy/60">
                        {list.items?.length || 0} items
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-3 mb-4">
              <button
                onClick={() => handleAddToExisting(selectedListId)}
                disabled={!selectedListId}
                className="flex-1 bg-gold text-navy font-semibold py-2 rounded hover:bg-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add to Selected
              </button>
              <button
                onClick={() => setShowCreateNew(true)}
                className="flex-1 border border-navy/30 text-navy font-semibold py-2 rounded hover:bg-navy/5 transition-colors"
              >
                Create New
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-navy mb-2">
                New List Name
              </label>
              <input
                type="text"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                placeholder="e.g., Weekly Order"
                className="w-full border border-navy/20 rounded px-3 py-2 focus:outline-none focus:border-gold"
                autoFocus
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCreateAndAdd}
                disabled={!newListName.trim()}
                className="flex-1 bg-gold text-navy font-semibold py-2 rounded hover:bg-gold/90 transition-colors disabled:opacity-50"
              >
                Create & Add
              </button>
              <button
                onClick={() => setShowCreateNew(false)}
                className="flex-1 border border-navy/30 text-navy font-semibold py-2 rounded hover:bg-navy/5 transition-colors"
              >
                Back
              </button>
            </div>
          </>
        )}

        <button
          onClick={onClose}
          className="w-full mt-4 text-center text-sm text-navy/60 hover:text-navy transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}