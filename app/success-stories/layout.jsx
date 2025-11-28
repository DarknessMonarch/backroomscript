const SITE_URL = "http://backroomscript.com";
const SUCCESS_IMAGE_URL = `${SITE_URL}/assets/successWoman.png`;

export const metadata = {
  title: "Success Stories - Real Transformations from Real Queens",
  description: "Read inspiring success stories from 2,251+ women who transformed their dating life, business communication, and social confidence using BackroomScript conversation templates.",

  keywords: [
    "BackroomScript success stories",
    "conversation template testimonials",
    "dating success stories",
    "communication transformation",
    "women empowerment stories",
    "conversation confidence reviews",
    "dating life transformation",
    "business communication success",
    "social confidence testimonials",
    "real customer reviews"
  ],

  openGraph: {
    title: "Success Stories - Real Transformations | BackroomScript",
    description: "Read how 2,251+ queens transformed their conversations and found confidence in dating, business & social settings.",
    url: `${SITE_URL}/success-stories`,
    type: "website",
    images: [
      {
        url: SUCCESS_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "BackroomScript Success Stories - Women's Communication Transformations"
      }
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Success Stories - Real Transformations | BackroomScript",
    description: "Read how 2,251+ queens transformed their conversations and found confidence.",
    images: [SUCCESS_IMAGE_URL],
  },

  alternates: {
    canonical: `${SITE_URL}/success-stories`,
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
      "name": "Success Stories",
      "item": `${SITE_URL}/success-stories`
    }
  ]
};

// JSON-LD for Reviews/Testimonials
const successStoriesSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "BackroomScript Success Stories",
  "description": "Real transformations from women who mastered confident conversations",
  "url": `${SITE_URL}/success-stories`,
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "Review",
        "position": 1,
        "author": {
          "@type": "Person",
          "name": "Sarah M."
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "name": "Transformed My Dating Life",
        "reviewBody": "The conversation templates transformed my dating life. I went from awkward silences to engaging conversations that led to 3 amazing dates in one month!",
        "itemReviewed": {
          "@type": "Product",
          "name": "BackroomScript Radiant Pro"
        }
      },
      {
        "@type": "Review",
        "position": 2,
        "author": {
          "@type": "Person",
          "name": "Jessica K."
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "name": "Game-Changing Coaching",
        "reviewBody": "As a busy professional, I needed confidence in my conversations. BackroomScript gave me that and more. The coaching sessions were game-changers!",
        "itemReviewed": {
          "@type": "Product",
          "name": "BackroomScript Queen Elite"
        }
      },
      {
        "@type": "Review",
        "position": 3,
        "author": {
          "@type": "Person",
          "name": "Maria L."
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "name": "Found My Perfect Match",
        "reviewBody": "I was skeptical at first, but the templates helped me break the ice naturally. Now I'm in a beautiful relationship, all thanks to BackroomScript!",
        "itemReviewed": {
          "@type": "Product",
          "name": "BackroomScript Radiant Pro"
        }
      }
    ]
  }
};

export default function SuccessStoriesLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(successStoriesSchema) }}
      />
      {children}
    </>
  );
}
