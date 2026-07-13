"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { getOrders } from "@/lib/orders";

const STATUS_CONFIG = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
  waiting_po: { label: "Waiting for PO", color: "bg-blue-100 text-blue-800" },
  payment_verification: {
    label: "Payment Verification",
    color: "bg-purple-100 text-purple-800",
  },
  delivery: { label: "Ready for Delivery", color: "bg-orange-100 text-orange-800" },
  on_the_way: { label: "On the Way", color: "bg-cyan-100 text-cyan-800" },
  delivered: { label: "Delivered", color: "bg-green-100 text-green-800" },
};

const STEPS = ["pending", "waiting_po", "payment_verification", "delivery", "on_the_way", "delivered"];

export default function OrdersPage() {
  const { user, ready, isApprovedMember } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!ready) return;
    if (!user || !isApprovedMember) router.replace("/");
  }, [ready, user, isApprovedMember, router]);

  if (!user) return null;

  const orders = getOrders();

  return (
    <div className="min-h-screen bg-cream py-12 px-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-display text-3xl text-navy mb-2">Order Tracking</h1>
        <p className="text-navy/60 mb-8">
          View and track the status of your orders
        </p>

        {orders.length === 0 ? (
          <div className="bg-white p-12 rounded border border-navy/10 text-center">
            <p className="text-navy/60 mb-4">No orders yet.</p>
            <Link
              href="/products"
              className="text-gold-deep hover:text-gold font-medium"
            >
              Start shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const statusConfig = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
              const currentStepIndex = STEPS.indexOf(order.status);
              const itemCount = order.items?.length || 0;
              const safeTotal =
                order.total ??
                (order.items || []).reduce(
                  (sum, item) => sum + (item.subtotal ?? (item.price ?? 0) * (item.quantity ?? 0)),
                  0
                );

              return (
                <Link
                  key={order.id}
                  href={`/orders/${order.id}`}
                  className="block"
                >
                  <div className="bg-white p-4 rounded border border-navy/10 hover:shadow-lg hover:border-gold/30 transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-semibold text-navy text-lg">
                          {order.id}
                        </p>
                        <p className="text-sm text-navy/60">
                          {new Date(order.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`px-3 py-1 rounded text-sm font-medium inline-block ${statusConfig.color}`}
                        >
                          {statusConfig.label}
                        </span>
                        <p className="text-sm text-navy/60 mt-2">
                          ${safeTotal.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4">
                      <div className="flex gap-1 mb-2">
                        {STEPS.map((step, index) => (
                          <div
                            key={step}
                            className={`flex-1 h-2 rounded ${
                              index <= currentStepIndex ? "bg-gold" : "bg-navy/10"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-navy/60">
                        {itemCount} {itemCount === 1 ? "item" : "items"}
                      </p>
                    </div>

                    <div className="mt-3 text-xs text-gold-deep hover:text-gold font-medium">
                      View Details →
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}