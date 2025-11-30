"use client";

import { useEffect } from "react";
import { useSuccessStoryStore } from "@/app/store/SuccessStoryStore";
import styles from "@/app/style/success.module.css";
import dashboardStyles from "@/app/style/dashboard.module.css";
import { IoSparkles as SparklesIcon, IoHeart as HeartIcon } from "react-icons/io5";

export default function SuccessStories() {
  const { approvedStories, storiesLoading, getApprovedStories } = useSuccessStoryStore();

  useEffect(() => {
    getApprovedStories(20);
  }, []);

  const getTierIcon = (tier) => {
    switch (tier) {
      case "elite":
        return "👑";
      case "pro":
        return "✨";
      default:
        return "💕";
    }
  };

  const getTierName = (tier) => {
    switch (tier) {
      case "elite":
        return "Queen Elite";
      case "pro":
        return "Radiant Pro";
      default:
        return "Starter Glow";
    }
  };

  if (storiesLoading) {
    return (
      <div className={dashboardStyles.loadingContainer}>
        <div className={dashboardStyles.loader}>
          <SparklesIcon className={dashboardStyles.loaderIcon} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerIcon}>
          <SparklesIcon />
        </div>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Success Stories</h1>
          <p className={styles.subtitle}>
            Real transformations from real queens in our community
          </p>
        </div>
      </div>

      {approvedStories.length > 0 ? (
        <div className={styles.storiesGrid}>
          {approvedStories.map((story) => (
            <div key={story._id} className={styles.storyCard}>
              <div className={styles.cardHeader}>
                <div className={styles.storyIcon}>
                  {story.image || getTierIcon(story.userTier)}
                </div>
                <div className={styles.tierBadge}>
                  {getTierName(story.userTier)}
                </div>
              </div>
              <h3 className={styles.storyTitle}>{story.title}</h3>
              <p className={styles.storyText}>&ldquo;{story.story}&rdquo;</p>
              <div className={styles.storyFooter}>
                <div className={styles.authorInfo}>
                  <HeartIcon className={styles.heartIcon} />
                  <span className={styles.storyName}>
                    {story.user?.username || story.user}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>
            <HeartIcon />
          </div>
          <h3>No Success Stories Yet</h3>
          <p>Be the first to share your transformation journey with our community!</p>
        </div>
      )}

      <div className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2>Ready to Write Your Own Success Story?</h2>
          <p>Join thousands of women transforming their conversations and confidence</p>
          <a href="/tiers" className={styles.ctaButton}>
            <SparklesIcon />
            <span>Get Started Today</span>
          </a>
        </div>
      </div>
    </div>
  );
}