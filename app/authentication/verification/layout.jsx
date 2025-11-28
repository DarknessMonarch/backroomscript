const SITE_URL = "http://backroomscript.com";

export const metadata = {
  title: "Email Verification - Verify Your Account",
  description: "Verify your BackroomScript account to unlock access to conversation templates and start your journey to confident communication.",

  robots: {
    index: false,
    follow: false,
  },

  alternates: {
    canonical: `${SITE_URL}/authentication/verification`,
  },
};

export default function VerificationLayout({ children }) {
  return <>{children}</>;
}
