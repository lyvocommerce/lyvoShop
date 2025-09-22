import React from 'react';
import { imgSrc } from '../services/images.js';

export function ProductCard({ product }) {
  const price = typeof product.price === 'number' ? product.price.toFixed(2) : (product.price || '');

  const openLink = () => {
    const url = product.aff_url || product.url;
    if (!url) return;
    const tg = window.Telegram?.WebApp;
    try { tg?.openLink(url, { try_instant_view: false }); } catch { window.open(url, '_blank'); }
  };

  return (
    <div className="h-full flex flex-col rounded-2xl border border-[var(--border)] overflow-hidden bg-white hover:shadow transition-shadow">
      <div className="aspect-[4/3] overflow-hidden bg-[var(--card)] flex items-center justify-center">
        <img src={imgSrc(product)} alt={product.title} className="max-w-full max-h-full object-contain" />
      </div>
      <div className="flex flex-col p-4 h-full">
        <div>
          <h3 className="text-[15px] font-semibold mb-1 leading-snug">{product.title}</h3>
          <p className="text-[13px] text-[var(--muted)] leading-snug">{product.desc || ''}</p>
        </div>
        <div className="mt-auto pt-3 flex items-center justify-between">
          <span className="font-semibold text-[15px]">{price} {product.currency || ''}</span>
          <button onClick={openLink} className="flex items-center justify-center w-10 h-10 rounded-md bg-[var(--accent)] text-white hover:opacity-90" aria-label="Open link">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2.25 2.25h1.5l1.5 13.5h13.5l1.5-9H6.75" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="9" cy="20" r="1"/><circle cx="17" cy="20" r="1"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}