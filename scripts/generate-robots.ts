import fs from 'fs';
import path from 'path';
import sheltersData from '../app/data/shelters.json';

const SITE_URL = process.env.SITE_URL || 'https://petslove.info';
const URLS_PER_SITEMAP = 1000;

const sitemapCount = Math.ceil(sheltersData.length / URLS_PER_SITEMAP);

const robotsTxt = `
User-agent: *
Allow: /

# Sitemaps
Sitemap: ${SITE_URL}/sitemap.xml
Sitemap: ${SITE_URL}/sitemap-pages.xml
${Array.from({ length: sitemapCount }, (_, i) => 
  `Sitemap: ${SITE_URL}/sitemap-shelters-${i}.xml`
).join('\n')}
`;

const publicDir = path.join(process.cwd(), 'public');
fs.writeFileSync(
  path.join(publicDir, 'robots.txt'),
  robotsTxt.trim()
); 