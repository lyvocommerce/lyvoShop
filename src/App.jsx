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
    // (опц) цвета хедера/фона
    tg?.setHeaderColor?.('#ffffff');
    tg?.setBackgroundColor?.('#ffffff');
  }, []);

  if (status === 'loading') {
    return <div className="p-4 text-[15px]">Connecting Telegram…</div>;
  }

  // user === null, если открыто НЕ из Telegram (гость) — это нормально
  return <CatalogPage user={user} />;
}