const SITE_URL = "http://backroomscript.com";

export const metadata = {
  title: "Reset Password - Recover Your Account",
  description: "Reset your BackroomScript password to regain access to your conversation templates and account.",

  robots: {
    index: false,
    follow: false,
  },

  alternates: {
    canonical: `${SITE_URL}/authentication/resetcode`,
  },
};

export default function ResetCodeLayout({ children }) {
  return <>{children}</>;
}
