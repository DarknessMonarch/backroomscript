const SITE_URL = "http://backroomscript.com";

export const metadata = {
  title: "Login - Access Your BackroomScript Account",
  description: "Login to your BackroomScript account to access conversation templates, coaching sessions, and tier benefits. Secure authentication for 2,251+ empowered women.",

  openGraph: {
    title: "Login | BackroomScript",
    description: "Login to access your conversation templates and tier benefits.",
    url: `${SITE_URL}/authentication/login`,
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "Login | BackroomScript",
    description: "Login to access your conversation templates and tier benefits.",
  },

  alternates: {
    canonical: `${SITE_URL}/authentication/login`,
  },

  robots: {
    index: false,
    follow: true,
  },
};

export default function LoginLayout({ children }) {
  return <>{children}</>;
}
