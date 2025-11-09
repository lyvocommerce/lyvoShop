// src/hooks/useTelegramAuth.js
import { useEffect, useState } from 'react';
import { authTelegram } from '../services/auth.js';

export function useTelegramAuth() {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | loading | ok | guest | error

  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    // ✅ используем всегда "сырую" initData (официальную)
    const initData = tg?.initData || window.Telegram?.WebApp?.initData || '';

    console.log("🔹 initData (raw string) =", initData.slice(0, 120) + '...');
    console.log("🔹 initDataUnsafe (object) =", tg?.initDataUnsafe);

    if (!initData || initData.trim() === '') {
      console.warn("⚠️ No initData detected — guest mode.");
      setStatus('guest');
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        setStatus('loading');
        const { ok, user } = await authTelegram(initData);
        if (!cancelled) {
          if (ok) {
            setUser(user || null);
            setStatus('ok');
          } else {
            console.error("❌ Auth failed — backend returned error");
            setStatus('error');
          }
        }
      } catch (err) {
        console.error("❌ Telegram auth error:", err);
        if (!cancelled) setStatus('error');
      }
    })();

    return () => { cancelled = true; };
  }, []);

  return { user, status };
}