// src/hooks/useTelegramAuth.js
import { useEffect, useState } from 'react';
import { authTelegram } from '../services/auth.js';

export function useTelegramAuth() {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | loading | ok | guest | error

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    const initData = typeof tg?.initData === 'string' ? tg.initData : '';

    console.log("🔹 initData (string) =", initData.slice(0, 120) + '...');
    console.log("🔹 initDataUnsafe (object) =", tg?.initDataUnsafe);

    if (!initData) {
      setStatus('guest'); // открыто в обычном браузере — работаем как гость
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