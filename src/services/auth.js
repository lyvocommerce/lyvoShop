// src/services/auth.js
const API_BASE = import.meta.env.VITE_API_BASE || "/api";

export async function authTelegram(initData) {
  const res = await fetch(`${API_BASE}/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain", // ⬅️ заменили JSON на text/plain
    },
    body: initData, // ⬅️ без JSON.stringify
  });

  if (!res.ok) {
    console.error("❌ Auth failed:", res.status);
    throw new Error(`Auth failed: ${res.status}`);
  }

  const data = await res.json();
  console.log("✅ Auth response:", data);
  return data;
}