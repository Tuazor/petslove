/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://petslove.info',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/private/', '/admin/'],
      },
    ],
    additionalSitemaps: [
      'https://petslove.info/server-sitemap.xml',
    ],
  },
  exclude: ['/private/*', '/admin/*'],
  generateIndexSitemap: false,
  changefreq: 'daily',
  priority: 0.7,
} 