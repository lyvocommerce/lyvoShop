import { useCallback, useEffect, useMemo } from 'react';

export function useTelegram() {
  const tg = useMemo(() => window.Telegram?.WebApp, []);

  useEffect(() => {
    try {
      tg?.ready();
      tg?.enableClosingConfirmation();
    } catch {}
  }, [tg]);

  const expand = useCallback(() => {
    try { tg?.expand(); } catch {}
  }, [tg]);

  return { tg, expand };
}