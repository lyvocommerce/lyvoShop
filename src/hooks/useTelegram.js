// src/hooks/useTelegram.js
import { useEffect, useMemo, useCallback } from 'react';

export function useTelegram() {
  const tg = useMemo(() => window?.Telegram?.WebApp || null, []);

  useEffect(() => {
    tg?.ready?.();
  }, [tg]);

  const expand = useCallback(() => {
    tg?.expand?.();
  }, [tg]);

  return { tg, expand };
}