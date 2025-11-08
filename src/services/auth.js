// src/services/auth.js
const API_BASE =
  import.meta.env.VITE_API_URL || "https://lyvo-be.onrender.com"; // ✅ твой backend

export async function authTelegram(initData) {
  const res = await fetch(`${API_BASE}/auth/telegram`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ initData }),
  });
  if (!res.ok) throw new Error(`Auth failed: ${res.status}`);
  return res.json(); // { ok, user }
}