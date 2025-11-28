"use client";
import Image from "next/image";
import Link from "next/link";
import SuccessWoman from "@/public/assets/successWoman.png";
import styles from "@/app/style/homeSection.module.css";
import {
  IoSparkles as SparklesIcon,
  IoHeart as HeartIcon,
  IoDiamond as DiamondIcon,
  IoLockClosed as LockIcon,
  IoTime as ClockIcon,
  IoChevronForward as ChevronIcon,
} from "react-icons/io5";

export default function HomeSection() {
  return (
    <div className={styles.homeSection}>
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <div className={styles.badge}>
              <HeartIcon className={styles.badgeIcon} />
              <span>Join 2,251+ Women Finding Their Voice</span>
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
              <Link href="#pricing" className={styles.ctaPrimary}>
                <span>Start Your Journey</span>
                <SparklesIcon className={styles.ctaIcon} />
              </Link>
              <Link href="#how-it-works" className={styles.ctaSecondary}>
                <span>See How It Works</span>
                <ChevronIcon className={styles.ctaIcon} />
              </Link>
            </div>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <h1>2,251+</h1>
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
                  <span className={styles.cardTitle}>New learner</span>
                  <span className={styles.cardBadge}>36% ↑</span>
                </div>
                <div className={styles.cardSubtitle}>This Week</div>
                <div className={styles.cardValue}>6544</div>
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
                  200+ Top class mentor
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
