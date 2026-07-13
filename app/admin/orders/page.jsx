"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
    getOrders,
    sendPurchaseOrder,
    verifyPayment,
    markReadyForDelivery,
    markOnTheWay,
    markDelivered,
    updateShippingInfo,
  } from "@/lib/orders";

const STATUS_LABELS = {
  pending: "Order Placed",
  waiting_po: "Waiting for PO",
  payment_verification: "Payment Verification",
  delivery: "Ready for Delivery",
  on_the_way: "On the Way",
  delivered: "Delivered",
};

export default function ManageOrdersPage() {
  const { user, ready, isAdmin } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [shippingInputs, setShippingInputs] = useState({});

  useEffect(() => {
    if (!ready) return;
    if (!user || !isAdmin) router.replace("/login");
  }, [ready, user, isAdmin, router]);

  useEffect(() => {
    if (isAdmin) setOrders(getOrders());
  }, [isAdmin]);

  const refresh = () => setOrders(getOrders());

  if (!isAdmin) return null;

  const handleSendPO = (orderId) => {
    sendPurchaseOrder(orderId);
    refresh();
  };

  const handleVerifyPayment = (orderId) => {
    verifyPayment(orderId);
    refresh();
  };

  const handleReadyForDelivery = (orderId) => {
    markReadyForDelivery(orderId);
    refresh();
  };

  const handleOnTheWay = (orderId) => {
    const shipping = shippingInputs[orderId];
  
    if (!shipping?.courier?.trim() || !shipping?.trackingNumber?.trim()) return;
  
    markOnTheWay(
      orderId,
      shipping.courier.trim(),
      shipping.trackingNumber.trim()
    );
  
    refresh();
  };

  const handleDelivered = (orderId) => {
    markDelivered(orderId);
    refresh();
  };

  const handleUpdateShipping = (orderId) => {
    const shipping = shippingInputs[orderId];
  
    if (!shipping?.courier?.trim() || !shipping?.trackingNumber?.trim()) return;
  
    updateShippingInfo(
      orderId,
      shipping.courier.trim(),
      shipping.trackingNumber.trim()
    );
  
    refresh();
  };

  return (
    <div className="min-h-screen bg-cream py-12 px-6">
      <div className="mx-auto max-w-5xl">
        <h1 className="font-display text-3xl text-navy mb-2">Manage Orders</h1>
        <p className="text-navy/60 mb-8">
          Move orders through the fulfillment pipeline.
        </p>

        {orders.length === 0 ? (
          <div className="bg-white p-12 rounded border border-navy/10 text-center">
            <p className="text-navy/60">No orders yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white p-5 rounded border border-navy/10"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div>
                    <p className="font-semibold text-navy">{order.id}</p>
                    <p className="text-xs text-navy/60">
                      {new Date(order.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}{" "}
                      · ${order.total?.toFixed(2)}
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded text-xs font-medium bg-gold/20 text-gold-deep">
                    {STATUS_LABELS[order.status] || order.status}
                  </span>
                </div>

                {order.poNumber && (
                  <p className="text-xs text-navy/60 mb-1">
                    PO Number:{" "}
                    <span className="font-medium text-navy">
                      {order.poNumber}
                    </span>
                  </p>
                )}
                {order.trackingNumber && (
                  <p className="text-xs text-navy/60 mb-3">
                    Tracking:{" "}
                    <span className="font-medium text-navy">
                      {order.trackingNumber}
                    </span>
                  </p>
                )}

                <div className="mt-3 pt-3 border-t border-navy/10">
                  {order.status === "pending" && (
                    <button
                      onClick={() => handleSendPO(order.id)}
                      className="bg-gold text-navy text-sm font-semibold px-4 py-2 rounded hover:bg-gold/90 transition-colors"
                    >
                      Generate & Send PO
                    </button>
                  )}

                  {order.status === "waiting_po" && (
                    <button
                      onClick={() => handleVerifyPayment(order.id)}
                      className="bg-gold text-navy text-sm font-semibold px-4 py-2 rounded hover:bg-gold/90 transition-colors"
                    >
                      Verify Payment
                    </button>
                  )}

                  {order.status === "payment_verification" && (
                    <button
                      onClick={() => handleReadyForDelivery(order.id)}
                      className="bg-gold text-navy text-sm font-semibold px-4 py-2 rounded hover:bg-gold/90 transition-colors"
                    >
                      Mark Ready for Delivery
                    </button>
                  )}

                  {order.status === "delivery" && (
                    <div className="flex flex-wrap gap-3 items-center">
                      <select
                        value={shippingInputs[order.id]?.courier || ""}
                        onChange={(e) =>
                          setShippingInputs((prev) => ({
                            ...prev,
                            [order.id]: {
                              ...prev[order.id],
                              courier: e.target.value,
                            },
                          }))
                        }
                        className="border border-navy/20 rounded px-3 py-2 text-sm focus:outline-none focus:border-gold"
                      >
                        <option value="">Select courier</option>
                        <option value="FedEx">FedEx</option>
                        <option value="UPS">UPS</option>
                        <option value="USPS">USPS</option>
                        <option value="DHL">DHL</option>
                        <option value="Restaurant Depot Delivery">
                          Restaurant Depot Delivery
                        </option>
                      </select>

                      <input
                        type="text"
                        placeholder="Tracking number"
                        value={shippingInputs[order.id]?.trackingNumber || ""}
                        onChange={(e) =>
                          setShippingInputs((prev) => ({
                            ...prev,
                            [order.id]: {
                              ...prev[order.id],
                              trackingNumber: e.target.value,
                            },
                          }))
                        }
                        className="border border-navy/20 rounded px-3 py-2 text-sm focus:outline-none focus:border-gold"
                      />

                      <button
                        onClick={() => handleOnTheWay(order.id)}
                        disabled={
                          !shippingInputs[order.id]?.courier?.trim() ||
                          !shippingInputs[order.id]?.trackingNumber?.trim()
                        }
                        className="bg-gold text-navy text-sm font-semibold px-4 py-2 rounded hover:bg-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Mark On the Way
                      </button>
                    </div>
                  )}

                  {order.status === "on_the_way" && (
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-3 items-center">
                        <select
                          value={
                            shippingInputs[order.id]?.courier ??
                            order.courier ??
                            ""
                          }
                          onChange={(e) =>
                            setShippingInputs((prev) => ({
                              ...prev,
                              [order.id]: {
                                ...prev[order.id],
                                courier: e.target.value,
                                trackingNumber:
                                  prev[order.id]?.trackingNumber ??
                                  order.trackingNumber ??
                                  "",
                              },
                            }))
                          }
                          className="border border-navy/20 rounded px-3 py-2 text-sm focus:outline-none focus:border-gold"
                        >
                          <option value="">Select courier</option>
                          <option value="FedEx">FedEx</option>
                          <option value="UPS">UPS</option>
                          <option value="USPS">USPS</option>
                          <option value="DHL">DHL</option>
                          <option value="Restaurant Depot Delivery">
                            Restaurant Depot Delivery
                          </option>
                        </select>

                        <input
                          type="text"
                          placeholder="Tracking number"
                          value={
                            shippingInputs[order.id]?.trackingNumber ??
                            order.trackingNumber ??
                            ""
                          }
                          onChange={(e) =>
                            setShippingInputs((prev) => ({
                              ...prev,
                              [order.id]: {
                                ...prev[order.id],
                                courier:
                                  prev[order.id]?.courier ??
                                  order.courier ??
                                  "",
                                trackingNumber: e.target.value,
                              },
                            }))
                          }
                          className="border border-navy/20 rounded px-3 py-2 text-sm focus:outline-none focus:border-gold"
                        />

                        <button
                          onClick={() => handleUpdateShipping(order.id)}
                          className="border border-navy/30 text-navy text-sm font-semibold px-4 py-2 rounded hover:bg-navy/5 transition-colors"
                        >
                          Update Tracking
                        </button>

                        <button
                          onClick={() => handleDelivered(order.id)}
                          className="bg-gold text-navy text-sm font-semibold px-4 py-2 rounded hover:bg-gold/90 transition-colors"
                        >
                          Mark Delivered
                        </button>
                      </div>
                    </div>
                  )}

                  {order.status === "delivered" && (
                    <p className="text-sm text-green-700 font-medium">
                      ✓ Order completed
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}