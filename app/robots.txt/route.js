export function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Allow important pages
Allow: /tiers
Allow: /about
Allow: /contact
Allow: /success-stories

# Disallow admin and private areas
Disallow: /admin
Disallow: /api
Disallow: /_next
Disallow: /static
Disallow: /authentication

# Sitemap location
Sitemap: http://backroomscript.com/sitemap.xml

# Crawl delay
Crawl-delay: 1`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
