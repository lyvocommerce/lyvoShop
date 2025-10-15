import React, { useEffect } from 'react';
import { useTelegram } from '../hooks/useTelegram.js';
import { CatalogPage } from '../pages/CatalogPage.jsx';
import { useTelegramAuth } from '../hooks/useTelegramAuth.js';

export default function App() {
  const { tg, expand } = useTelegram();
  const { user, status } = useTelegramAuth(); // 'idle' | 'loading' | 'ok' | 'guest' | 'error'

  useEffect(() => {
    expand(); // запросить максимум высоты
  }, [expand]);

  return (
    <div className="container mx-auto max-w-[720px] px-4 pb-6 relative">
     {/* маленькая плашка статуса авторизации */}
      {status === 'loading' && (
        <div className="mb-3 text-[13px] text-[var(--muted)]">Authorizing in Telegram…</div>
      )}
      {status === 'guest' && (
        <div className="mb-3 text-[13px] text-[var(--muted)]">
          Opened in browser (guest mode). Open via Telegram to authorize.
        </div>
      )}
      {status === 'error' && (
        <div className="mb-3 text-[13px] text-red-600">
          Auth error. Try re-opening the Mini App from Telegram.
        </div>
      )}

      {/* пробрасываем user в каталог (пригодится дальше для UX/аналитики) */}
     <CatalogPage user={user} />
   </div>
  );
}