"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SuccessWoman from "@/public/assets/successWoman.png";
import styles from "@/app/style/homeSection.module.css";
import {
  IoSparkles as SparklesIcon,
  IoHeart as HeartIcon,
  IoChevronForward as ChevronIcon,
} from "react-icons/io5";

const SERVER_API = process.env.NEXT_PUBLIC_SERVER_API;

export default function HomeSection() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    weeklyUsers: 0,
    weeklyGrowth: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${SERVER_API}/auth/stats/public`);
        const data = await response.json();

        if (data.status === "success") {
          setStats({
            totalUsers: data.data.totalUsers,
            weeklyUsers: data.data.weeklyUsers,
            weeklyGrowth: data.data.weeklyGrowth,
          });
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className={styles.homeSection}>
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <div className={styles.badge}>
              <HeartIcon className={styles.badgeIcon} />
              <span>Join 2,251 + Women Finding Their Voice</span>
            </div>

            <h1 className={styles.heroTitle}>
              Speak With Confidence.
              <br />
              <span className={styles.heroTitleGradient}>
                Bloom Into Your Power
              </span>
            </h1>

            <p className={styles.heroDescription}>
              Master how to have <span>real conversations</span> that create
              connections, whether you're dating, starting a business, or
              expanding your influence.
            </p>

            <div className={styles.ctaButtons}>
              <Link href="/tiers" className={styles.ctaPrimary}>
                <span>Start Your Journey</span>
                <SparklesIcon className={styles.ctaIcon} />
              </Link>
              <Link href="/about" className={styles.ctaSecondary}>
                <span>See How It Works</span>
                <ChevronIcon className={styles.ctaIcon} />
              </Link>
            </div>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <h1>200+</h1>
                <p>QueensRising</p>
              </div>
              <div className={styles.statCard}>
                <h1>300%</h1>
                <p>Confidence Boost</p>
              </div>
              <div className={styles.statCard}>
                <h1>1000+</h1>
                <p>Templates</p>
              </div>
            </div>
          </div>

          <div className={styles.heroImage}>
            <div className={styles.imageWrapper}>
              <Image
                src={SuccessWoman}
                alt="Confident woman"
                className={styles.mainImage}
                priority
              />

              <div className={styles.floatingCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardTitle}>New Queens</span>
                  <span className={styles.cardBadge}>
                    {isLoading ? "..." : `${stats.weeklyGrowth > 0 ? "+" : ""}${stats.weeklyGrowth}%`} {stats.weeklyGrowth >= 0 ? "↑" : "↓"}
                  </span>
                </div>
                <div className={styles.cardSubtitle}>Today</div>
                <div className={styles.cardValue}>
                  {isLoading ? "..." : `${stats.weeklyUsers.toLocaleString()}`}
                </div>
                <div className={styles.cardChart}>
                  <svg width="100%" height="30" viewBox="0 0 100 30">
                    <path
                      d="M 0 15 Q 25 5, 50 15 T 100 10"
                      fill="none"
                      stroke="#fbbf24"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </div>

              <div className={styles.mentorsBadge}>
                <div className={styles.mentorsAvatars}>
                  <div className={styles.avatar}>👩🏾</div>
                  <div className={styles.avatar}>👩🏽</div>
                  <div className={styles.avatar}>👩🏻</div>
                  <div className={styles.avatar}>👸🏿</div>
                </div>
                <span className={styles.mentorsText}>
                  100+ Top Mentor
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}