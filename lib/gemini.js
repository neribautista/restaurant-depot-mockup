// Shared helper for calling the Gemini API via plain fetch (no SDK needed).
// Flash is the current free-tier workhorse - fast and generous daily quota.
// Swap to "gemini-2.5-flash-lite" for even higher free-tier throughput on
// simple classification-style tasks (like the catalog search route).
export const DEFAULT_MODEL = "gemini-2.5-flash";

const BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models";

export async function askGemini({ system, messages, maxTokens = 500 }) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error(
      "GEMINI_API_KEY is not set. Copy .env.local.example to .env.local and add your key from https://aistudio.google.com/apikey"
    );
  }

  // Gemini uses "model" instead of "assistant" for the AI turn, and takes
  // the system prompt as a separate field rather than a leading message.
  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const res = await fetch(
    `${BASE_URL}/${DEFAULT_MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents,
        systemInstruction: system ? { parts: [{ text: system }] } : undefined,
        generationConfig: { maxOutputTokens: maxTokens },
      }),
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini API error (${res.status}): ${errText}`);
  }

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") ?? "";
  return text;
}
