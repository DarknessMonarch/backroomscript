import { Toaster } from "sonner";
import "@/app/style/global.css";
import Script from "next/script";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import GlobalLoader from "@/app/components/GlobalLoader";
import styles from "@/app/style/applayout.module.css";
import { Inter, Playfair_Display } from "next/font/google";
import { StoreInitializer } from "@/app/components/StoreInitializer";

const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

const SITE_URL = "https://backroomscript.com";
const BANNER_URL =
  "https://raw.githubusercontent.com/DarknessMonarch/backroomscript/refs/heads/master/public/assets/banner.png";

export const viewport = {
  themeColor: "#fef3f8",
};

export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "BackroomScript - Conversation Templates & Confidence for Women",
    template: "%s | BackroomScript",
  },
  applicationName: "BackroomScript",
  description:
    "Master confident conversations with BackroomScript. Premium conversation templates for dating, business, and social confidence. Built by women, for women. 2,251+ queens rising.",
  authors: [{ name: "BackroomScript", url: SITE_URL }],
  generator: "Next.js",
  keywords: [
    "BackroomScript",
    "conversation templates",
    "dating templates",
    "flirting templates",
    "business communication",
    "confident communication",
    "conversation confidence",
    "women empowerment",
    "dating confidence",
    "social confidence",
    "conversation starters",
    "communication skills",
    "text templates",
    "messaging templates",
    "professional communication",
    "networking templates",
    "content creation",
    "authentic conversations",
    "relationship building",
    "confident texting",
    "dating scripts",
    "business scripts",
    "social scripts",
    "communication mastery",
    "conversation tools",
    "women's communication",
    "confident messaging",
    "authentic connection",
  ],

  referrer: "origin-when-cross-origin",
  creator: "BackroomScript",
  publisher: "BackroomScript",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "BackroomScript",
    title: "BackroomScript - Conversation Templates & Confidence for Women",
    description:
      "Master confident conversations with premium templates for dating, business, and social confidence. Join 2,251+ women finding their voice.",
    images: [
      {
        url: BANNER_URL,
        width: 1200,
        height: 630,
        alt: "BackroomScript - Conversation Templates & Confidence for Women",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "BackroomScript - Conversation Templates & Confidence for Women",
    description:
      "Master confident conversations with premium templates for dating, business, and social confidence. Built by women, for women.",
    images: [BANNER_URL],
    creator: "@backroomscript",
  },

  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  verification: {
    google: "",
    yandex: "",
  },

  alternates: {
    canonical: `${SITE_URL}`,
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "BackroomScript",
  url: SITE_URL,
  logo: `${SITE_URL}/assets/logo.png`,
  description:
    "BackroomScript - Premium conversation templates and communication strategies for women seeking confidence in dating, business, and social interactions",
  sameAs: [
    "https://www.facebook.com/backroomscript",
    "https://instagram.com/backroomscript",
    "https://www.tiktok.com/@backroomscript",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "support@backroomscript.com",
    contactType: "Customer Support",
    url: SITE_URL,
    telephone: "+254796620365",
    areaServed: "Worldwide",
    availableLanguage: "English",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "2251",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Conversation Templates & Tiers",
    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "Starter Glow",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "15+ Conversation Starters & Basic Framework",
            },
          },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Radiant Pro",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "50+ Templates, Advanced Techniques & Community Access",
            },
          },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Queen Elite",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "100+ Expert Templates, 1-on-1 Coaching & VIP Support",
            },
          },
        ],
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Organization Schema - Global */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        {/* Paystack SDK for payment processing */}
        <Script
          id="paystack-js"
          strategy="lazyOnload"
          src="https://js.paystack.co/v1/inline.js"
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} ${inter.className}`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* Google Analytics */}
        <Script
          id="ga-tag"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-', {
                page_path: window.location.pathname,
                custom_map: {
                  'custom_parameter_1': 'conversation_category'
                }
              });
              
              gtag('config', 'G-', {
                'custom_map.category': 'templates'
              });
            `,
          }}
        />

        <Toaster
          position="top-center"
          richColors={true}
          toastOptions={{
            style: {
              background: "#ec4899",
              color: "#ffffff",
              borderRadius: "15px",
              border: "1px solid #ec4899",
            },
          }}
        />
        <GlobalLoader />
        <div className={styles.appLayout}>
          <Navbar />
          <StoreInitializer>{children}</StoreInitializer>
          <Footer />
        </div>
      </body>
    </html>
  );
}
