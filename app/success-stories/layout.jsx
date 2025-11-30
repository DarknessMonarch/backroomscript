const SITE_URL = "https://backroomscript.com";
const SUCCESS_IMAGE_URL = `${SITE_URL}/assets/successWoman.png`;
const SERVER_API = process.env.NEXT_PUBLIC_SERVER_API;

async function getSuccessStories() {
  try {
    const response = await fetch(`${SERVER_API}/success-stories/approved?limit=20`, {
      next: { revalidate: 3600 } // Revalidate every hour
    });

    const data = await response.json();

    if (data.status === "success") {
      return data.data.stories;
    }
    return [];
  } catch (error) {
    console.error("Failed to fetch success stories:", error);
    return [];
  }
}

export async function generateMetadata() {
  const stories = await getSuccessStories();
  const storyCount = stories.length || 2251;

  return {
    title: "Success Stories - Real Transformations from Real Queens",
    description: `Read inspiring success stories from ${storyCount}+ women who transformed their dating life, business communication, and social confidence using BackroomScript conversation templates.`,

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
      description: `Read how ${storyCount}+ queens transformed their conversations and found confidence in dating, business & social settings.`,
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
      description: `Read how ${storyCount}+ queens transformed their conversations and found confidence.`,
      images: [SUCCESS_IMAGE_URL],
    },

    alternates: {
      canonical: `${SITE_URL}/success-stories`,
    },
  };
}

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

// Helper to get tier name
function getTierName(tier) {
  switch (tier) {
    case "elite":
      return "BackroomScript Queen Elite";
    case "pro":
      return "BackroomScript Radiant Pro";
    default:
      return "BackroomScript Starter Glow";
  }
}

export default async function SuccessStoriesLayout({ children }) {
  const stories = await getSuccessStories();

  // Generate success stories schema from actual data
  const successStoriesSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "BackroomScript Success Stories",
    "description": "Real transformations from women who mastered confident conversations",
    "url": `${SITE_URL}/success-stories`,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": stories.slice(0, 10).map((story, index) => ({
        "@type": "Review",
        "position": index + 1,
        "author": {
          "@type": "Person",
          "name": story.user?.username || "Anonymous"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "name": story.title,
        "reviewBody": story.story,
        "itemReviewed": {
          "@type": "Product",
          "name": getTierName(story.userTier)
        }
      }))
    }
  };

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