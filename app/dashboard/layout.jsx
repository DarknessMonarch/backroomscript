const SITE_URL = "http://backroomscript.com";

export const metadata = {
  title: "Dashboard - Your Conversation Templates",
  description: "Access your BackroomScript dashboard to view templates, manage your tier, track progress, and master confident conversations.",

  robots: {
    index: false,
    follow: false,
  },

  alternates: {
    canonical: `${SITE_URL}/dashboard`,
  },
};

export default function DashboardLayout({ children }) {
  return <>{children}</>;
}
