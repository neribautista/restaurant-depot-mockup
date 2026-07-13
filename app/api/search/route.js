import { NextResponse } from "next/server";
import { askGemini } from "@/lib/gemini";
import products from "@/data/products.json";

export async function POST(req) {
  try {
    const { query } = await req.json();
    if (!query || !query.trim()) {
      return NextResponse.json({ ids: [], note: null });
    }

    const catalogSummary = products
      .map((p) => `${p.id}: ${p.name} (${p.category}, ${p.unit}, $${p.price})`)
      .join("\n");

    const system = `You are a search relevance engine for a foodservice wholesale catalog.
Given a shopper's natural-language query, return ONLY a JSON array of product ids
from the catalog below that match, ordered by relevance. If nothing matches well,
return an empty array. Do not include any text outside the JSON array.

Catalog:
${catalogSummary}`;

    const raw = await askGemini({
      system,
      messages: [{ role: "user", content: query }],
      maxTokens: 200,
    });

    let ids = [];
    try {
      const cleaned = raw.replace(/```json|```/g, "").trim();
      ids = JSON.parse(cleaned);
    } catch {
      ids = [];
    }

    return NextResponse.json({ ids });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
