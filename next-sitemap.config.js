/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://petslove.info',
  generateIndexSitemap: true,
  generateRobotsTxt: true,
  exclude: ['/shelter/*'],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://petslove.info/sitemap-pages.xml',
      'https://petslove.info/sitemap-shelters-0.xml',
    ],
  },
} 