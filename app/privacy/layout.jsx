const SITE_URL = "http://backroomscript.com";

export const metadata = {
  title: "Privacy Policy - How We Protect Your Data",
  description: "Read BackroomScript's privacy policy. Learn how we collect, use, and protect your personal information, including payment security, cookies, and your data rights.",

  keywords: [
    "BackroomScript privacy policy",
    "data protection",
    "user privacy",
    "personal information security",
    "payment security",
    "cookie policy",
    "data rights",
    "GDPR compliance",
    "user data protection"
  ],

  openGraph: {
    title: "Privacy Policy | BackroomScript",
    description: "Learn how BackroomScript protects your personal information and data privacy.",
    url: `${SITE_URL}/privacy`,
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "Privacy Policy | BackroomScript",
    description: "Learn how BackroomScript protects your personal information and data privacy.",
  },

  alternates: {
    canonical: `${SITE_URL}/privacy`,
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyLayout({ children }) {
  return <>{children}</>;
}
