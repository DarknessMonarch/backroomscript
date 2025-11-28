const SITE_URL = "http://backroomscript.com";

export const metadata = {
  title: "Terms of Use - Service Terms & Conditions",
  description: "Read BackroomScript's terms of use. Understand your rights and responsibilities when using our conversation templates, tiers, and coaching services.",

  keywords: [
    "BackroomScript terms",
    "terms of use",
    "service terms",
    "terms and conditions",
    "user agreement",
    "legal terms",
    "subscription terms",
    "refund policy",
    "intellectual property"
  ],

  openGraph: {
    title: "Terms of Use | BackroomScript",
    description: "Review BackroomScript's terms of use and service conditions.",
    url: `${SITE_URL}/terms`,
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "Terms of Use | BackroomScript",
    description: "Review BackroomScript's terms of use and service conditions.",
  },

  alternates: {
    canonical: `${SITE_URL}/terms`,
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsLayout({ children }) {
  return <>{children}</>;
}
