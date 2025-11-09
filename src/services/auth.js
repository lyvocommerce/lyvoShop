// src/services/auth.js
const API_BASE = import.meta.env.VITE_API_URL || "/api"; // ✅ Proxy via Vercel

export async function authTelegram(initData) {
  const res = await fetch(`${API_BASE}/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ initData }),
  });

  if (!res.ok) {
    console.error("❌ Auth failed:", res.status);
    throw new Error(`Auth failed: ${res.status}`);
  }

  const data = await res.json();
  console.log("✅ Auth response:", data);
  return data;
}