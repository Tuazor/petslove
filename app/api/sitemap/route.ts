import { NextResponse } from 'next/server';
import sheltersData from '../../data/shelters.json';

export async function GET() {
  // Create URLs for all static pages
  const staticPages = [
    '',
    '/about',
    '/contact',
    '/find-shelters',
    '/adopt',
    '/care-tips',
    '/faq',
    '/privacy',
    '/terms'
  ].map(route => `https://petslove.info${route}`);

  // Create URLs for all shelter pages
  const shelterPages = sheltersData.map(shelter => 
    `https://petslove.info/shelter/${shelter.id}`
  );

  // Combine all URLs
  const allUrls = [...staticPages, ...shelterPages];

  // Create sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allUrls.map(url => `
        <url>
          <loc>${url}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>daily</changefreq>
          <priority>0.7</priority>
        </url>
      `).join('')}
    </urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, must-revalidate'
    }
  });
} 