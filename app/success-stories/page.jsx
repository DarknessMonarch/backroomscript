"use client";

import { useEffect } from "react";
import { useSuccessStoryStore } from "@/app/store/SuccessStoryStore";
import styles from "@/app/style/success.module.css";

export default function SuccessStories() {
  const { approvedStories, storiesLoading, getApprovedStories } = useSuccessStoryStore();

  useEffect(() => {
    getApprovedStories(20); // Fetch up to 20 approved stories
  }, []);

  // Fallback stories if no approved stories are available
  const fallbackStories = [
    {
      title: "Transformed My Dating Life",
      story: "The conversation templates transformed my dating life. I went from awkward silences to engaging conversations that led to 3 amazing dates in one month!",
      user: { username: "Sarah M." },
      userTier: "pro",
      image: "👑"
    },
    {
      title: "Game-Changing Coaching",
      story: "As a busy professional, I needed confidence in my conversations. BackroomScript gave me that and more. The coaching sessions were game-changers!",
      user: { username: "Jessica K." },
      userTier: "elite",
      image: "✨"
    },
    {
      title: "Found My Perfect Match",
      story: "I was skeptical at first, but the templates helped me break the ice naturally. Now I'm in a beautiful relationship, all thanks to BackroomScript!",
      user: { username: "Maria L." },
      userTier: "pro",
      image: "💕"
    }
  ];

  const displayStories = approvedStories.length > 0 ? approvedStories : fallbackStories;

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
      <div className={styles.container}>
        <div className={styles.loading}>
          <p>Loading success stories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Success Stories</h1>
        <p className={styles.subtitle}>
          {approvedStories.length > 0
            ? "Real transformations from real queens"
            : "Join our community of empowered women"}
        </p>
      </div>

      <div className={styles.storiesGrid}>
        {displayStories.map((story, idx) => (
          <div key={story._id || idx} className={styles.storyCard}>
            <div className={styles.storyIcon}>
              {story.image || getTierIcon(story.userTier)}
            </div>
            <h3 className={styles.storyTitle}>{story.title}</h3>
            <p className={styles.storyText}>"{story.story}"</p>
            <div className={styles.storyFooter}>
              <p className={styles.storyName}>
                {story.user?.username || story.user}
              </p>
              <span className={styles.storyTier}>
                {getTierName(story.userTier)} Member
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.cta}>
        <h2>Ready to write your own success story?</h2>
        <a href="/tiers" className={styles.ctaButton}>
          Get Started Today
        </a>
      </div>
    </div>
  );
}
