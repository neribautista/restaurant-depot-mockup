const SUBSCRIBERS_KEY = "rd_text_subscribers";
const PROMOTIONS_KEY = "rd_promotions";

export function getSubscribers() {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(SUBSCRIBERS_KEY) || "[]");
}

export function saveSubscriber(subscriber) {
  const subscribers = getSubscribers();

  const newSubscriber = {
    id: crypto.randomUUID(),
    ...subscriber,
    consentGiven: true,
    status: "active",
    createdAt: new Date().toISOString(),
  };

  localStorage.setItem(
    SUBSCRIBERS_KEY,
    JSON.stringify([...subscribers, newSubscriber])
  );

  return newSubscriber;
}

export function getPromotions() {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(PROMOTIONS_KEY) || "[]");
}

export function savePromotion(promotion) {
  const promotions = getPromotions();

  const newPromotion = {
    id: crypto.randomUUID(),
    ...promotion,
    status: "sent",
    createdAt: new Date().toISOString(),
    sentAt: new Date().toISOString(),
  };

  localStorage.setItem(
    PROMOTIONS_KEY,
    JSON.stringify([newPromotion, ...promotions])
  );

  return newPromotion;
}

export function mockSendPromotion(promotion) {
  const subscribers = getSubscribers().filter((s) => s.status === "active");

  console.log("MOCK SMS SEND");
  console.log("Promotion:", promotion);
  console.log("Sending to:", subscribers);

  return subscribers.length;
}