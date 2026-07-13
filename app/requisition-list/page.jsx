"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import products from "@/data/products.json";
import ManageItemsModal from "@/components/ManageItemsModal";

export default function RequisitionListPage() {
  const { user, ready, isApprovedMember } = useAuth();
  const router = useRouter();
  const [lists, setLists] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  const [selectedListId, setSelectedListId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (!ready) return;
    if (!user || !isApprovedMember) router.replace("/");
  }, [ready, user, isApprovedMember, router]);

  useEffect(() => {
    const storedLists = JSON.parse(
      localStorage.getItem("requisitionLists") || "[]"
    );
    setLists(storedLists);
  }, []);

  const handleCreateList = (e) => {
    e.preventDefault();
    const newList = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toLocaleDateString(),
      items: [],
    };
    const updatedLists = [...lists, newList];
    localStorage.setItem("requisitionLists", JSON.stringify(updatedLists));
    setLists(updatedLists);
    setFormData({ name: "", description: "" });
    setShowForm(false);
  };

  const handleDeleteList = (id) => {
    const updatedLists = lists.filter((list) => list.id !== id);
    localStorage.setItem("requisitionLists", JSON.stringify(updatedLists));
    setLists(updatedLists);
  };

  const handleOpenManageItems = (listId) => {
    setSelectedListId(listId);
    setShowManageModal(true);
  };

  const handleUpdateList = (updatedList) => {
    const updatedLists = lists.map((list) =>
      list.id === updatedList.id ? updatedList : list
    );
    localStorage.setItem("requisitionLists", JSON.stringify(updatedLists));
    setLists(updatedLists);
  };

  if (!user) return null;

  const selectedList = lists.find((l) => l.id === selectedListId);

  return (
    <div className="min-h-screen bg-cream py-12 px-6">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-3xl text-navy">Requisition Lists</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-gold text-navy font-semibold px-6 py-2 rounded hover:bg-gold/90 transition-colors"
          >
            + Create New List
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={handleCreateList}
            className="bg-white p-6 rounded border border-navy/10 mb-8"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-navy mb-1">
                  List Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g., Weekly Order, Kitchen Supplies"
                  className="w-full border border-navy/20 rounded px-3 py-2 focus:outline-none focus:border-gold"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1">
                  Description (Optional)
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Add notes about this list..."
                  rows="3"
                  className="w-full border border-navy/20 rounded px-3 py-2 focus:outline-none focus:border-gold"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-gold text-navy font-semibold py-2 rounded hover:bg-gold/90 transition-colors"
                >
                  Create List
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 border border-navy/30 text-navy font-semibold py-2 rounded hover:bg-navy/5 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        )}

        {lists.length === 0 ? (
          <div className="bg-white p-12 rounded border border-navy/10 text-center">
            <p className="text-navy/60 mb-4">No requisition lists yet.</p>
            <button
              onClick={() => setShowForm(true)}
              className="text-gold-deep hover:text-gold font-medium"
            >
              Create your first list
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {lists.map((list) => (
              <div
                key={list.id}
                className="bg-white p-6 rounded border border-navy/10"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-navy text-lg">
                      {list.name}
                    </h3>
                    <p className="text-sm text-navy/60">{list.createdAt}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteList(list.id)}
                    className="text-rust hover:text-rust/70 font-medium text-sm"
                  >
                    Delete
                  </button>
                </div>
                {list.description && (
                  <p className="text-sm text-navy/70 mb-4">{list.description}</p>
                )}

                {/* Items Count */}
                <div className="mb-4 p-2 bg-navy/5 rounded">
                  <p className="text-xs text-navy/60">
                    {list.items?.length || 0} item
                    {list.items?.length !== 1 ? "s" : ""}
                  </p>
                  {list.items && list.items.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {list.items.slice(0, 3).map((item, idx) => (
                        <p key={idx} className="text-xs text-navy/70">
                          • {item.name} (Qty: {item.quantity})
                        </p>
                      ))}
                      {list.items.length > 3 && (
                        <p className="text-xs text-navy/60">
                          +{list.items.length - 3} more...
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleOpenManageItems(list.id)}
                  className="w-full border border-gold text-gold-deep font-semibold py-2 rounded hover:bg-gold/10 transition-colors"
                >
                  Manage Items
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {showManageModal && selectedList && (
        <ManageItemsModal
          list={selectedList}
          onClose={() => {
            setShowManageModal(false);
            setSelectedListId(null);
          }}
          onUpdate={handleUpdateList}
        />
      )}
    </div>
  );
}