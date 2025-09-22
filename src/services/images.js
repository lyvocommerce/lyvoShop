export const FALLBACK_IMG = '/img/placeholder.jpg';

export const IMAGE_MAP = {
  'wireless-earbuds': '/img/earbuds.jpg',
  'smart-watch': '/img/smartwatch.jpg',
  'laptop': '/img/laptop.jpg',
  'mechanical-keyboard': '/img/keyboard.jpg',
  'dog-bed': '/img/dogbed.jpg',
  'automatic-cat-feeder': '/img/catfeeder.jpg',
  'hoodie': '/img/hoodie.jpg',
  'sneakers': '/img/sneakers.jpg',
  'running-shoes': '/img/running-shoes.jpg',
  'yoga-mat': '/img/yoga-mat.jpg',
  't-shirt': '/img/tshirt.jpg',
  'denim-jacket': '/img/denim-jacket.jpg',
  'coffee-maker': '/img/coffee-maker.jpg',
  'vacuum-cleaner': '/img/vacuum-cleaner.jpg',
};

export const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const isHttpsOrLocal = (u) => {
  if (!u) return false;
  if (u.startsWith('/img/') || u.startsWith('img/')) return true;
  try { return new URL(u).protocol === 'https:'; } catch { return false; }
};

export function imgSrc(p) {
  const m = IMAGE_MAP[norm(p?.title)];
  if (isHttpsOrLocal(m)) return m;
  if (isHttpsOrLocal(p?.image)) return p.image;
  return FALLBACK_IMG;
}