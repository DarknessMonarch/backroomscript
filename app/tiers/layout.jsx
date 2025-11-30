const SITE_URL = "https://backroomscript.com";
const BANNER_URL = "https://raw.githubusercontent.com/DarknessMonarch/backroomscript/refs/heads/master/public/assets/banner.png";

export const metadata = {
  title: "Pricing Tiers - Choose Your Glow Level",
  description: "One-time investment in yourself. Lifetime confidence. Choose from Starter Glow (Free), Radiant Pro (KSh 3,499), or Queen Elite (KSh 9,999). Premium conversation templates for dating, business & social confidence.",

  keywords: [
    "BackroomScript pricing",
    "conversation templates pricing",
    "dating confidence packages",
    "communication coaching tiers",
    "women empowerment pricing",
    "conversation starter packages",
    "business communication pricing",
    "social confidence investment",
    "premium templates cost",
    "conversation mastery tiers"
  ],

  openGraph: {
    title: "Pricing Tiers - Choose Your Glow Level | BackroomScript",
    description: "One-time investment. Lifetime confidence. From free starter templates to elite 1-on-1 coaching. Find your perfect tier.",
    url: `${SITE_URL}/tiers`,
    type: "website",
    images: [
      {
        url: BANNER_URL,
        width: 1200,
        height: 630,
        alt: "BackroomScript Pricing Tiers - Starter Glow, Radiant Pro, Queen Elite"
      }
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Pricing Tiers - Choose Your Glow Level | BackroomScript",
    description: "One-time investment. Lifetime confidence. From free starter templates to elite 1-on-1 coaching.",
    images: [BANNER_URL],
  },

  alternates: {
    canonical: `${SITE_URL}/tiers`,
  },
};

// JSON-LD for BreadcrumbList
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": SITE_URL
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Pricing Tiers",
      "item": `${SITE_URL}/tiers`
    }
  ]
};

// JSON-LD for Pricing/Tier structure
const tiersSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "Offer",
      "position": 1,
      "name": "Starter Glow",
      "description": "Perfect for beginning your conversation journey",
      "price": "0",
      "priceCurrency": "KES",
      "availability": "https://schema.org/InStock",
      "itemOffered": {
        "@type": "Product",
        "name": "Starter Glow Tier",
        "description": "Access to 1 template and Email support"
      }
    },
    {
      "@type": "Offer",
      "position": 2,
      "name": "Radiant Pro",
      "description": "Elevate your communication with confidence",
      "price": "999",
      "priceCurrency": "KES",
      "availability": "https://schema.org/InStock",
      "itemOffered": {
        "@type": "Product",
        "name": "Radiant Pro Tier",
        "description": "Community support, 20+ Premium templates, Bookmark your favorites, Access previous templates, Everything in Starter Glow, Advanced flirting techniques, Relationship building methods, Priority support (12h response) and Teaching strategies to make it on tinder and the likes",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "1842"
        }
      }
    },
    {
      "@type": "Offer",
      "position": 3,
      "name": "Queen Elite",
      "description": "Complete mastery with personal coaching",
      "price": "3499",
      "priceCurrency": "KES",
      "availability": "https://schema.org/InStock",
      "itemOffered": {
        "@type": "Product",
        "name": "Queen Elite Tier",
        "description": "You get unlimited expert templates, all categories unlocked, monthly content updates, direct Telegram support, custom template requests, lifetime content updates, everything included in Radiant Pro, priority feature requests, a 1-on-1 coaching session (60 minutes), and access to a hidden dating site where your success is higher than average",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5.0",
          "reviewCount": "409"
        }
      }
    }
  ]
};

export default function TiersLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tiersSchema) }}
      />
      {children}
    </>
  );
}
