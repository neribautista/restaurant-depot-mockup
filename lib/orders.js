"use client";

const STORAGE_KEY = "rd_orders";

function readOrders() {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeOrders(orders) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

function generateOrderId() {
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `ORD-${Date.now().toString().slice(-6)}-${random}`;
}

function generatePoNumber(order) {
  const itemCount = order.items?.length || 0;
  return `PO-${order.id.replace("ORD-", "")}-${itemCount}`;
}

export function createOrder({ items, total, shippingAddress, paymentMethod }) {
  const normalizedItems = (items || []).map((item) => {
    const price = item.price || 0;
    const quantity = item.quantity || 1;

    return {
      id: item.id,
      name: item.name,
      price,
      quantity,
      subtotal: price * quantity,
    };
  });

  const computedTotal =
    typeof total === "number"
      ? total
      : normalizedItems.reduce((sum, item) => sum + item.subtotal, 0);

  const order = {
    id: generateOrderId(),
    date: new Date().toISOString(),
    status: "pending",
    items: normalizedItems,
    total: computedTotal,
    shippingAddress: shippingAddress || null,
    paymentMethod: paymentMethod || null,
    poNumber: null,
    courier: null,
    trackingNumber: null,
    updatedAt: new Date().toISOString(),
  };

  const orders = readOrders();
  orders.unshift(order);
  writeOrders(orders);

  return order;
}

export function getOrders() {
  return readOrders();
}

export function getOrderById(orderId) {
  const orders = readOrders();
  return orders.find((order) => order.id === orderId) || null;
}

function updateOrder(orderId, changes) {
  const orders = readOrders();
  const index = orders.findIndex((order) => order.id === orderId);

  if (index === -1) return null;

  orders[index] = {
    ...orders[index],
    ...changes,
    updatedAt: new Date().toISOString(),
  };

  writeOrders(orders);
  return orders[index];
}

export function updateOrderStatus(orderId, status) {
  return updateOrder(orderId, { status });
}

export function sendPurchaseOrder(orderId) {
  const order = getOrderById(orderId);
  if (!order) return null;

  const poNumber = generatePoNumber(order);

  return updateOrder(orderId, {
    status: "waiting_po",
    poNumber,
  });
}

export function verifyPayment(orderId) {
  return updateOrder(orderId, {
    status: "payment_verification",
  });
}

export function markReadyForDelivery(orderId) {
  return updateOrder(orderId, {
    status: "delivery",
  });
}

export function markOnTheWay(orderId, courier, trackingNumber) {
  if (!courier || !trackingNumber) return null;

  return updateOrder(orderId, {
    status: "on_the_way",
    courier,
    trackingNumber,
  });
}

export function markDelivered(orderId) {
  return updateOrder(orderId, {
    status: "delivered",
  });
}

export function updateShippingInfo(orderId, courier, trackingNumber) {
    if (!courier || !trackingNumber) return null;
  
    return updateOrder(orderId, {
      courier,
      trackingNumber,
    });
  }