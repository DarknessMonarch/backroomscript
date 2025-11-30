const SITE_URL = "https://backroomscript.com";
const BANNER_URL =
  "https://raw.githubusercontent.com/DarknessMonarch/backroomscript/refs/heads/master/public/assets/banner.png";

export const metadata = {
  title: "Contact Us - Get Support & Connect with BackroomScript",
  description:
    "Contact BackroomScript for support, coaching inquiries, tier questions, or feedback. Available Monday-Friday 8AM-6PM EAT. Phone: +254-796-620-365 | Email: support@backroomscript.com",

  keywords: [
    "BackroomScript contact",
    "customer support",
    "coaching inquiries",
    "template support",
    "tier questions",
    "BackroomScript email",
    "BackroomScript phone",
    "Nairobi customer service",
    "conversation coaching support",
    "VIP support",
  ],

  openGraph: {
    title: "Contact Us - Get Support & Connect | BackroomScript",
    description:
      "Need help? Our team is ready to assist with templates, tiers, and coaching. Reach out today!",
    url: `${SITE_URL}/contact`,
    type: "website",
    images: [
      {
        url: BANNER_URL,
        width: 1200,
        height: 630,
        alt: "Contact BackroomScript Support Team",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Contact Us - Get Support & Connect | BackroomScript",
    description:
      "Need help? Our team is ready to assist with templates, tiers, and coaching.",
    images: [BANNER_URL],
  },

  alternates: {
    canonical: `${SITE_URL}/contact`,
  },  
};

// JSON-LD for BreadcrumbList
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Contact Us",
      item: `${SITE_URL}/contact`,
    },
  ],
};

// JSON-LD for ContactPage
const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact BackroomScript",
  description:
    "Get in touch with BackroomScript for support, coaching, or questions about conversation templates",
  url: `${SITE_URL}/contact`,
  mainEntity: {
    "@type": "Organization",
    name: "BackroomScript",
    url: SITE_URL,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+447401012610",
        contactType: "Customer Support",
        email: "backroomscript@gmail.co",
        areaServed: "Worldwide",
        availableLanguage: "English",
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "18:00",
        },
      },
      {
        "@type": "ContactPoint",
        telephone: "+447401012610",
        contactType: "Customer Support",
        email: "backroomscript@gmail.co",
        areaServed: "Worldwide",
        availableLanguage: "English",
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "09:00",
          closes: "19:00",
        },
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Australia",
      addressCountry: "Us",
      postalCode: "",
    },
  },
};

export default function ContactLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      {children}
    </>
  );
}
