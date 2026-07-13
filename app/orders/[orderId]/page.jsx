"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { getOrderById } from "@/lib/orders";

const STATUS_TIMELINE = [
  { status: "pending", label: "Order Placed", icon: "✓" },
  { status: "waiting_po", label: "Waiting for PO", icon: "⏳" },
  {
    status: "payment_verification",
    label: "Payment Verification",
    icon: "💳",
  },
  { status: "delivery", label: "Ready for Delivery", icon: "📦" },
  { status: "on_the_way", label: "On the Way", icon: "🚚" },
  { status: "delivered", label: "Delivered", icon: "✓" },
];

export default function OrderDetailPage({ params }) {
  const { user, ready, isApprovedMember } = useAuth();
  const router = useRouter();
  const { orderId } = params;

  useEffect(() => {
    if (!ready) return;
    if (!user || !isApprovedMember) router.replace("/");
  }, [ready, user, isApprovedMember, router]);

  if (!user) return null;

  const orderDetail = getOrderById(orderId);

  if (!orderDetail) {
    return (
      <div className="min-h-screen bg-cream py-12 px-6 text-center">
        <p className="text-navy/60 mb-4">Order not found.</p>
        <Link href="/orders" className="text-gold-deep hover:text-gold font-medium">
          ← Back to Orders
        </Link>
      </div>
    );
  }

  const currentStatusIndex = STATUS_TIMELINE.findIndex(
    (s) => s.status === orderDetail.status
  );

  // Defensive fallbacks: normalize items so price/quantity/subtotal are always numbers
  const safeItems = (orderDetail.items || []).map((item) => {
    const price = item.price ?? 0;
    const quantity = item.quantity ?? 0;
    const subtotal = item.subtotal ?? price * quantity;
    return { ...item, price, quantity, subtotal };
  });

  const safeTotal =
    orderDetail.total ?? safeItems.reduce((sum, item) => sum + item.subtotal, 0);

  return (
    <div className="min-h-screen bg-cream py-12 px-6">
      <div className="mx-auto max-w-3xl">
        {/* Back Button */}
        <Link
          href="/orders"
          className="text-gold-deep hover:text-gold font-medium mb-6 inline-flex items-center gap-2"
        >
          ← Back to Orders
        </Link>

        {/* Order Header */}
        <div className="bg-white p-6 rounded border border-navy/10 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="font-display text-2xl text-navy">
                {orderDetail.id}
              </h1>
              <p className="text-sm text-navy/60">
                {new Date(orderDetail.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-navy/60">Order Total</p>
              <p className="font-display text-2xl text-navy">
                ${safeTotal.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Status Timeline */}
        <div className="bg-white p-6 rounded border border-navy/10 mb-6">
          <h2 className="font-display text-lg text-navy mb-6">Order Status</h2>
          <div className="space-y-4">
            {STATUS_TIMELINE.map((step, index) => (
              <div key={step.status} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                      index <= currentStatusIndex
                        ? "bg-gold text-navy"
                        : "bg-navy/10 text-navy/40"
                    }`}
                  >
                    {step.icon}
                  </div>
                  {index < STATUS_TIMELINE.length - 1 && (
                    <div
                      className={`w-1 h-12 my-2 ${
                        index < currentStatusIndex ? "bg-gold" : "bg-navy/10"
                      }`}
                    />
                  )}
                </div>
                <div className="pb-4">
                  <p
                    className={`font-medium ${
                      index <= currentStatusIndex ? "text-navy" : "text-navy/40"
                    }`}
                  >
                    {step.label}
                  </p>
                  {index === currentStatusIndex && (
                    <p className="text-sm text-gold-deep font-medium">
                      Current Status
                    </p>
                  )}
                  {step.status === "on_the_way" &&
                    orderDetail.status === "on_the_way" &&
                    orderDetail.trackingNumber && (
                      <div className="mt-3 rounded bg-cream p-4">
                        <p className="text-sm font-semibold text-navy">
                          {orderDetail.courier || "Courier"}
                        </p>

                        <p className="mt-1 text-sm text-navy/70">
                          Tracking Number:{" "}
                          <span className="font-semibold text-navy">
                            {orderDetail.trackingNumber}
                          </span>
                        </p>
                      </div>
                    )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white p-6 rounded border border-navy/10 mb-6">
          <h2 className="font-display text-lg text-navy mb-4">Order Items</h2>
          <div className="space-y-3">
            {safeItems.map((item, idx) => (
              <div
                key={item.id ?? idx}
                className="flex items-center justify-between py-3 border-b border-navy/10 last:border-0"
              >
                <div>
                  <p className="font-medium text-navy">{item.name}</p>
                  <p className="text-sm text-navy/60">Qty: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-navy">
                    ${item.subtotal.toFixed(2)}
                  </p>
                  <p className="text-xs text-navy/60">
                    ${item.price.toFixed(2)} each
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="mt-6 pt-4 border-t border-navy/10 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-navy/60">Subtotal:</span>
              <span className="font-medium text-navy">
                ${safeTotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-navy/60">Shipping:</span>
              <span className="font-medium text-navy">Free</span>
            </div>
            <div className="flex justify-between font-semibold border-t border-navy/10 pt-2 mt-2">
              <span className="text-navy">Total:</span>
              <span className="text-gold-deep">${safeTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        {orderDetail.shippingAddress && (
          <div className="bg-white p-6 rounded border border-navy/10 mb-6">
            <h2 className="font-display text-lg text-navy mb-4">
              Shipping Address
            </h2>
            <div className="text-navy/80">
              <p className="font-medium">{orderDetail.shippingAddress.name}</p>
              <p>{orderDetail.shippingAddress.street}</p>
              <p>
                {orderDetail.shippingAddress.city},{" "}
                {orderDetail.shippingAddress.state}{" "}
                {orderDetail.shippingAddress.zipCode}
              </p>
            </div>
          </div>
        )}

        {/* Payment Method */}
        {orderDetail.paymentMethod && (
          <div className="bg-white p-6 rounded border border-navy/10 mb-6">
            <h2 className="font-display text-lg text-navy mb-4">
              Payment Method
            </h2>
            <p className="text-navy/80">{orderDetail.paymentMethod}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4">
          <button className="flex-1 bg-gold text-navy font-semibold py-3 rounded hover:bg-gold/90 transition-colors">
            Download Invoice
          </button>
          <button className="flex-1 border border-navy/30 text-navy font-semibold py-3 rounded hover:bg-navy/5 transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}