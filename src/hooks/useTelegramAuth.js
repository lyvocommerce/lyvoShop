// src/hooks/useTelegramAuth.js
import { useEffect, useState } from 'react';
import { authTelegram } from '../services/auth.js';

export function useTelegramAuth() {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | loading | ok | guest | error

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    const initData = tg?.initData || '';

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
      } catch {
        if (!cancelled) setStatus('error');
      }
    })();

    return () => { cancelled = true; };
  }, []);

  return { user, status };
}