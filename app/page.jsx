"use client";

import Testimonials from "@/app/components/Testimonials";
import HomeSection from "@/app/components/HomeSection";
import MiddleSection from "@/app/components/MiddleSection";

export default function Home() {
  return (
    <main>
      <HomeSection />
      <MiddleSection />
      <Testimonials />
    </main>
  );
}
