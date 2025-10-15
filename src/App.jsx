// src/App.jsx
import React, { useEffect } from 'react';
import { useTelegramAuth } from './hooks/useTelegramAuth.js';
import { CatalogPage } from './pages/CatalogPage.jsx';

export default function App() {
  const { user, status } = useTelegramAuth();

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    tg?.ready?.();
    tg?.expand?.();
    tg?.setHeaderColor?.('#ffffff');
    tg?.setBackgroundColor?.('#ffffff');
  }, []);

  if (status === 'loading') {
    return <div className="p-4 text-[15px] text-center">Connecting Telegram…</div>;
  }

  return (
    <div className="mx-auto max-w-[720px] px-4 sm:px-6 md:px-8">
      <CatalogPage user={user} />
    </div>
  );
}