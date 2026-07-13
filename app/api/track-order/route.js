import { NextResponse } from "next/server";
import { askGemini } from "@/lib/gemini";
import orders from "@/data/orders.json";

export async function POST(req) {
  try {
    const { orderId } = await req.json();
    const order = orders.find(
      (o) => o.id.toLowerCase() === String(orderId || "").toLowerCase()
    );

    if (!order) {
      return NextResponse.json({
        reply: `I couldn't find an order matching "${orderId}". Double check the order number - it looks like RD-10234.`,
      });
    }

    const system = `You are an order-status assistant for a wholesale foodservice supplier.
Summarize the order status below in 2-3 friendly, plain-language sentences for a
restaurant owner checking on their delivery. Do not invent details beyond what's given.`;

    const reply = await askGemini({
      system,
      messages: [{ role: "user", content: JSON.stringify(order) }],
      maxTokens: 200,
    });

    return NextResponse.json({ reply, order });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
