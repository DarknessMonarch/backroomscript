const SITE_URL = "http://backroomscript.com";
const BANNER_URL = "https://raw.githubusercontent.com/DarknessMonarch/backroomscript/refs/heads/master/public/assets/banner.png";

export const metadata = {
  title: "About Us - Empowering Women Through Confident Communication",
  description: "Learn about BackroomScript's mission to empower women with expertly crafted conversation templates. Built by women, for women. Helping 2,251+ queens find their voice in dating, business & social settings.",

  keywords: [
    "about BackroomScript",
    "women communication platform",
    "conversation confidence mission",
    "dating template creators",
    "women empowerment company",
    "authentic conversation experts",
    "communication coaching platform",
    "women-led business",
    "conversation mastery story",
    "BackroomScript team"
  ],

  openGraph: {
    title: "About BackroomScript - Empowering Women Through Confident Communication",
    description: "Our mission: Help women master conversations that matter. From dating to boardrooms, we provide templates that work.",
    url: `${SITE_URL}/about`,
    type: "website",
    images: [
      {
        url: BANNER_URL,
        width: 1200,
        height: 630,
        alt: "About BackroomScript - Women's Communication Empowerment Platform"
      }
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "About BackroomScript - Empowering Women Through Confident Communication",
    description: "Built by women, for women. Helping 2,251+ queens find their voice.",
    images: [BANNER_URL],
  },

  alternates: {
    canonical: `${SITE_URL}/about`,
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
      "name": "About Us",
      "item": `${SITE_URL}/about`
    }
  ]
};

// JSON-LD for AboutPage
const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About BackroomScript",
  "description": "BackroomScript is your premier destination for conversation confidence and authentic connection",
  "url": `${SITE_URL}/about`,
  "mainEntity": {
    "@type": "Organization",
    "name": "BackroomScript",
    "url": SITE_URL,
    "logo": `${SITE_URL}/assets/logo.png`,
    "description": "Premier conversation templates and communication strategies for women seeking confidence in dating, business, and social interactions",
    "foundingDate": "2023",
    "founder": {
      "@type": "Organization",
      "name": "BackroomScript Team"
    },
    "areaServed": "Worldwide",
    "slogan": "Master confident conversations. Built by women, for women."
  }
};

// JSON-LD for FAQPage
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is BackroomScript?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "BackroomScript is your premier destination for conversation confidence and authentic connection. We specialize in providing women with expertly crafted conversation templates and communication strategies for dating, business, and social settings."
      }
    },
    {
      "@type": "Question",
      "name": "Why choose BackroomScript?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We offer authentic, tested templates created by women who understand unique communication challenges. You get lifetime access to all resources, excellent customer support, and templates that have helped thousands build unshakeable confidence."
      }
    },
    {
      "@type": "Question",
      "name": "What template categories are available?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We offer templates across Dating & Flirting, Business Communication Scripts, Social Confidence Builders, Content Creation Guides, and Professional Networking Tools."
      }
    }
  ]
};

export default function AboutLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
