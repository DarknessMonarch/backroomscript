"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/style/home.module.css";
import Testimonials from "@/app/components/Testimonials";
import HomeSection from "@/app/components/HomeSection";
import MiddleSection from "@/app/components/MiddleSection";

export default function Home() {
  return (
    <main className={styles.homeContainer}>
      <HomeSection />
      <MiddleSection />
      <Testimonials />
    </main>
  );
}