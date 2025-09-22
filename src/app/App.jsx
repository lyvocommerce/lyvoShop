import React, { useEffect } from 'react';
import { useTelegram } from '../hooks/useTelegram.js';
import { CatalogPage } from '../pages/CatalogPage.jsx';

export default function App() {
  const { tg, expand } = useTelegram();

  useEffect(() => {
    expand(); // запросить максимум высоты
  }, [expand]);

  return (
    <div className="container mx-auto max-w-[720px] px-4 pb-6 relative">
      <CatalogPage />
    </div>
  );
}