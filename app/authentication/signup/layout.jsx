const SITE_URL = "http://backroomscript.com";

export const metadata = {
  title: "Sign Up - Join 2,251+ Queens Mastering Conversations",
  description: "Create your free BackroomScript account and start mastering confident conversations today. Join 2,251+ women transforming their dating, business & social communication.",

  openGraph: {
    title: "Sign Up - Join BackroomScript Today",
    description: "Create your free account and access conversation templates that transform communication.",
    url: `${SITE_URL}/authentication/signup`,
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "Sign Up - Join BackroomScript Today",
    description: "Create your free account and access conversation templates.",
  },

  alternates: {
    canonical: `${SITE_URL}/authentication/signup`,
  },

  robots: {
    index: false,
    follow: true,
  },
};

export default function SignupLayout({ children }) {
  return <>{children}</>;
}
