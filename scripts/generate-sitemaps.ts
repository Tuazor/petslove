import fs from 'fs';
import path from 'path';
import sheltersData from '../app/data/shelters.json';

const SITE_URL = process.env.SITE_URL || 'https://petslove.info';
const URLS_PER_SITEMAP = 1000;

interface Shelter {
  id: string;
  updatedAt?: string;
}

function generateSitemapXML(shelters: Shelter[], index: number): string {
  const urls = shelters.map(shelter => `
    <url>
      <loc>${SITE_URL}/shelter/${shelter.id}</loc>
      <lastmod>${shelter.updatedAt || new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.7</priority>
    </url>
  `).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls}
    </urlset>`;
}

function generateSitemapIndex(shelterSitemapCount: number): string {
  const sitemaps = [`
    <sitemap>
      <loc>${SITE_URL}/sitemap-pages.xml</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </sitemap>
  `];

  // Add shelter sitemaps
  for (let i = 0; i < shelterSitemapCount; i++) {
    sitemaps.push(`
      <sitemap>
        <loc>${SITE_URL}/sitemap-shelters-${i}.xml</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </sitemap>
    `);
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemaps.join('')}
    </sitemapindex>`;
}

async function generateSitemaps() {
  const publicDir = path.join(process.cwd(), 'public');
  
  // Create chunks of shelter URLs
  const shelterChunks = sheltersData.reduce((chunks: Shelter[][], shelter, index) => {
    const chunkIndex = Math.floor(index / URLS_PER_SITEMAP);
    if (!chunks[chunkIndex]) {
      chunks[chunkIndex] = [];
    }
    chunks[chunkIndex].push(shelter);
    return chunks;
  }, []);

  // Generate individual shelter sitemaps
  shelterChunks.forEach((chunk, index) => {
    const sitemapPath = path.join(publicDir, `sitemap-shelters-${index}.xml`);
    fs.writeFileSync(sitemapPath, generateSitemapXML(chunk, index));
  });

  // Generate sitemap index
  const indexPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(indexPath, generateSitemapIndex(shelterChunks.length));

  console.log(`Generated ${shelterChunks.length} shelter sitemaps and index`);
}

generateSitemaps(); 