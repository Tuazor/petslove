import fs from 'fs';
import path from 'path';

const SITE_URL = process.env.SITE_URL || 'https://petslove.info';

const staticPages = [
  '',
  '/about',
  '/contact',
  '/faq',
  '/privacy',
  '/terms',
  '/volunteer',
  '/suggest-shelter',
  '/adopt',
  '/care-tips',
  '/find-shelters'
];

function generatePagesSitemap(): string {
  const urls = staticPages.map(page => `
    <url>
      <loc>${SITE_URL}${page}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${page === '' ? '1.0' : '0.8'}</priority>
    </url>
  `).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls}
    </urlset>`;
}

const publicDir = path.join(process.cwd(), 'public');
fs.writeFileSync(
  path.join(publicDir, 'sitemap-pages.xml'),
  generatePagesSitemap()
); 