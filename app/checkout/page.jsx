"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { createOrder } from "@/lib/orders";

function itemKey(item) {
  return item?.productId ?? item?.id ?? item?.name;
}

function formatPaymentMethod(paymentMethod) {
  const paymentLabels = {
    credit_card: "Credit Card",
    bank_transfer: "Bank Transfer",
    check: "Check",
    ach: "ACH",
  };

  return (
    paymentLabels[paymentMethod] ||
    paymentMethod ||
    "No payment method on file"
  );
}

export default function CheckoutPage() {
  const { items, requisitionLists, clearCart } = useCart();
  const { user, ready, isApprovedMember } = useAuth();
  const router = useRouter();

  const [placing, setPlacing] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState("primary");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!ready) return;

    if (!user || !isApprovedMember) {
      router.replace("/login?next=/checkout");
    }
  }, [ready, user, isApprovedMember, router]);

  const requisitionItems = requisitionLists.flatMap((block) =>
    block.items.map((item) => ({
      id: `${block.id}-${itemKey(item)}`,
      name: item.name,
      price: Number(item.price) || 0,
      quantity: Number(item.quantity) || 1,
    }))
  );

  const directCartItems = items.map((item) => ({
    ...item,
    id: itemKey(item),
    price: Number(item.price) || 0,
    quantity: Number(item.quantity) || 1,
  }));

  const allItems = [...directCartItems, ...requisitionItems];

  const savedAddresses = useMemo(() => {
    if (!user) return [];

    const addresses = [];

    if (user.address) {
      addresses.push({
        id: "primary",
        label: "Primary Address",
        name: user.contactName || "—",
        street: user.address || "",
        city: user.city || "",
        state: user.state || "",
        zipCode: user.zipCode || "",
        phone: user.addressPhone || user.phone || "",
        isPrimary: true,
      });
    }

    const additionalAddresses = Array.isArray(user.additionalAddresses)
      ? user.additionalAddresses
      : [];

    additionalAddresses.forEach((address, index) => {
      if (!address?.street) return;

      addresses.push({
        id: address.id || `additional-${index}`,
        label: address.label || `Saved Address ${index + 1}`,
        name: address.name || user.contactName || "—",
        street: address.street || "",
        city: address.city || "",
        state: address.state || "",
        zipCode: address.zipCode || "",
        phone: address.phone || "",
        isPrimary: false,
      });
    });

    return addresses;
  }, [user]);

  useEffect(() => {
    if (savedAddresses.length === 0) return;

    const addressStillExists = savedAddresses.some(
      (address) => address.id === selectedAddressId
    );

    if (!addressStillExists) {
      setSelectedAddressId(savedAddresses[0].id);
    }
  }, [savedAddresses, selectedAddressId]);

  const selectedAddress =
    savedAddresses.find(
      (address) => address.id === selectedAddressId
    ) || savedAddresses[0];

  const total = allItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const confirmOrder = () => {
    setError("");

    if (!selectedAddress) {
      setError("Please add or select a shipping address.");
      return;
    }

    if (!user.paymentMethod) {
      setError("Please add a payment method before placing your order.");
      return;
    }

    setPlacing(true);

    try {
      const order = createOrder({
        items: allItems,
        total,
        shippingAddress: {
          id: selectedAddress.id,
          label: selectedAddress.label,
          name: selectedAddress.name,
          street: selectedAddress.street,
          city: selectedAddress.city,
          state: selectedAddress.state,
          zipCode: selectedAddress.zipCode,
          phone: selectedAddress.phone,
          isPrimary: selectedAddress.isPrimary,
        },
        paymentMethod: user.paymentMethod,
      });

      clearCart();
      router.push(`/orders/${order.id}`);
    } catch (orderError) {
      console.error("Unable to place order:", orderError);
      setError("Unable to place your order. Please try again.");
      setPlacing(false);
    }
  };

  if (!ready || !user || !isApprovedMember) {
    return null;
  }

  if (allItems.length === 0) {
    return (
      <div className="mx-auto max-w-md px-6 py-24 text-center">
        <h1 className="font-display text-3xl text-ink">
          Nothing to Check Out
        </h1>

        <p className="mt-3 text-sm text-ink/60">
          Your cart is empty. Head back to the{" "}
          <Link
            href="/products"
            className="text-navy underline"
          >
            catalog
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="font-display text-3xl text-ink">
        Confirm Your Order
      </h1>

      <p className="mt-2 text-sm text-ink/60">
        Review your shipping and payment details before placing your
        order.
      </p>

      {error && (
        <div className="mt-5 rounded-md border border-rust/20 bg-rust/5 p-4">
          <p className="text-sm font-medium text-rust">
            {error}
          </p>
        </div>
      )}

      {/* Shipping Address */}
      <div className="mt-6 rounded-md border border-navy/10 bg-white p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-lg text-ink">
              Shipping Address
            </h2>

            <p className="mt-1 text-xs text-ink/60">
              Select where this order should be delivered.
            </p>
          </div>

          <Link
            href="/account#addresses"
            className="shrink-0 text-xs font-medium text-gold-deep hover:underline"
          >
            Manage Addresses
          </Link>
        </div>

        {savedAddresses.length === 0 ? (
          <div className="mt-4 rounded-md border border-rust/20 bg-rust/5 p-4">
            <p className="text-sm text-rust">
              You do not have a shipping address on file.
            </p>

            <Link
              href="/account#addresses"
              className="mt-2 inline-block text-sm font-semibold text-gold-deep hover:underline"
            >
              Add a shipping address
            </Link>
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {savedAddresses.map((address) => {
              const isSelected =
                selectedAddressId === address.id;

              return (
                <label
                  key={address.id}
                  className={`block cursor-pointer rounded-md border p-4 transition ${
                    isSelected
                      ? "border-gold bg-gold/10"
                      : "border-navy/10 bg-white hover:border-navy/30"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="shippingAddress"
                      value={address.id}
                      checked={isSelected}
                      onChange={() =>
                        setSelectedAddressId(address.id)
                      }
                      className="mt-1 h-4 w-4 accent-[#f4cf21]"
                    />

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold text-navy">
                          {address.label}
                        </p>

                        {address.isPrimary && (
                          <span className="rounded-full bg-navy px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                            Default
                          </span>
                        )}
                      </div>

                      <div className="mt-2 text-sm leading-5 text-ink/80">
                        <p>{address.name}</p>
                        <p>{address.street}</p>

                        <p>
                          {address.city}
                          {address.city &&
                          (address.state || address.zipCode)
                            ? ", "
                            : ""}
                          {address.state} {address.zipCode}
                        </p>

                        {address.phone && (
                          <p className="mt-1 text-xs text-ink/60">
                            Phone: {address.phone}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* Payment Method */}
      <div className="mt-4 rounded-md border border-navy/10 bg-white p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg text-ink">
            Payment Method
          </h2>

          <Link
            href="/account#payment"
            className="text-xs font-medium text-gold-deep hover:underline"
          >
            Edit
          </Link>
        </div>

        <p className="mt-2 text-sm text-ink/80">
          {formatPaymentMethod(user.paymentMethod)}
        </p>
      </div>

      {/* Order Summary */}
      <div className="mt-4 rounded-md border border-navy/10 bg-white p-5">
        <h2 className="mb-3 font-display text-lg text-ink">
          Order Summary
        </h2>

        <div className="divide-y divide-cream-dark">
          {allItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="flex justify-between gap-4 py-2 text-sm"
            >
              <span className="text-ink/80">
                {item.name} × {item.quantity}
              </span>

              <span className="shrink-0 font-mono text-ink">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-3 flex justify-between border-t border-navy/10 pt-3 font-semibold">
          <span className="text-ink">Total</span>

          <span className="font-mono text-gold-deep">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={confirmOrder}
        disabled={
          placing ||
          !selectedAddress ||
          !user.paymentMethod
        }
        className="mt-6 w-full rounded-sm bg-gold py-3 text-sm font-semibold uppercase tracking-widest2 text-navy hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-60"
      >
        {placing
          ? "Placing Order…"
          : "Confirm & Place Order"}
      </button>
    </div>
  );
}