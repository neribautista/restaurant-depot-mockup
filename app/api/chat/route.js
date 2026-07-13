import { NextResponse } from "next/server";
import { askGemini } from "@/lib/gemini";
import companyInfo from "@/data/company-info.json";
import products from "@/data/products.json";
import {
  findLocationsFromText,
  findLocationsByState,
  formatLocationsForPrompt,
} from "@/lib/locations";

const JETRO_INFO = `Restaurant Depot (Jetro) is a members-only cash-and-carry foodservice distributor. We offer:
- Wholesale pricing on food & supplies
- Fresh produce, meat, seafood, dairy
- Pantry staples and equipment
- Same-day and next-day delivery available`;

const MEMBERSHIP_INFO = `To become a Restaurant Depot member:
1. Apply online or visit a location
2. Provide business documentation (business license, tax ID)
3. Verification takes 1-3 business days
4. Once approved, access wholesale pricing on all products`;

const PROMOTIONS = `Current promotions:
- Pork: Selected cuts 15% off
- Dairy: Cheese selection Buy 2 Get 1 50% off
- Beef: Premium cuts $2/lb off
- Fresh Produce: Weekly specials`;

const PRODUCT_CATEGORIES = [...new Set(products.map((p) => p.category))].join(", ");
const SUPPORT_LINE = "For detailed tracking, please contact our support team at 1-800-JETRO-1 or email support@jetro.com.";

function formatOrdersForPrompt(orders) {
  if (!orders || orders.length === 0) return "The member currently has no orders on file.";

  return orders
    .slice(0, 5) // cap so the prompt doesn't blow up for long order histories
    .map((o) => {
      const items = (o.items || []).map((i) => `${i.name} x${i.quantity}`).join(", ");
      return [
        `Order ${o.id}`,
        `- Status: ${o.status}`,
        `- Placed: ${new Date(o.date).toLocaleDateString()}`,
        `- Items: ${items || "n/a"}`,
        `- Total: $${o.total?.toFixed?.(2) ?? o.total}`,
        `- Tracking: ${o.trackingNumber ? `${o.courier} #${o.trackingNumber}` : "not yet assigned"}`,
      ].join("\n");
    })
    .join("\n\n");
}

export async function POST(req) {
  try {
    const { messages, isApprovedMember, orders, userState } = await req.json();

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }

    const latestUserMessage =
      [...messages].reverse().find((m) => m.role === "user")?.content || "";

    let systemPrompt = `You are the helpful support assistant for ${companyInfo.name}, a wholesale foodservice supplier.
Answer briefly (2-4 sentences) and warmly. Only state facts given to you below — never invent tracking numbers, statuses, dates, addresses, or promotions that aren't listed.`;

    if (!isApprovedMember) {
      const locationMatches = findLocationsFromText(latestUserMessage).concat(
        userState ? findLocationsByState(userState) : []
      );
      const uniqueMatches = [
        ...new Map(locationMatches.map((l) => [l.name + l.address, l])).values(),
      ];
      const locationsBlock = formatLocationsForPrompt(uniqueMatches);

      systemPrompt += `

The user is NOT yet a member. Help them with:
1. How to become a member - ${MEMBERSHIP_INFO}
2. Locations - if a state, city, or ZIP is mentioned below, use this real data:
${locationsBlock || "No specific location matched yet — ask which state, city, or ZIP they're near."}
3. Online ordering information - Members can order online 24/7
4. What is Jetro - ${JETRO_INFO}
5. General product info - Available categories: ${PRODUCT_CATEGORIES}

If they ask something outside these topics, say "I'm not sure - let me connect you with our team" and suggest contacting support.`;
    } else {
      systemPrompt += `

The user IS an approved member. Their order history:
${formatOrdersForPrompt(orders)}

Help them with:
1. Order status and tracking - answer ONLY using the order data above. If they ask about tracking and it's "not yet assigned," or ask a further question you can't answer from the data (e.g. "where is my package right now" after you've already given the tracking number), say: "${SUPPORT_LINE}"
2. Current promotions - ${PROMOTIONS}
3. Product availability and ordering
4. Delivery and pickup options
5. Account questions`;
    }

    const reply = await askGemini({
      system: systemPrompt,
      messages,
      maxTokens: 300,
    });

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json({ error: err.message || "Chat failed" }, { status: 500 });
  }
}