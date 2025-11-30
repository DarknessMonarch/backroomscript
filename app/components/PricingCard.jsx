"use client";

import { useState } from "react";
import LoadingLogo from "@/app/components/loadingLogo"
import styles from "@/app/style/pricingCard.module.css";
import {
  IoCheckmark as CheckIcon,
  IoSparkles as SparklesIcon,
  IoTrophy as TrophyIcon,
  IoLockClosed as LockIcon,
} from "react-icons/io5";
import { FaCrown as CrownIcon } from "react-icons/fa";

export default function PricingCard({
  tier,
  isPopular = false,
  isCurrent = false,
  isLocked = false,
  onSelect,
  loading = false,
  variant = "default", // 'default', 'compact', 'detailed'
}) {
  const getTierIcon = () => {
    switch (tier.id) {
      case "starter":
        return <SparklesIcon />;
      case "pro":
        return <TrophyIcon />;
      case "elite":
        return <CrownIcon />;
      default:
        return <SparklesIcon />;
    }
  };

  const handleClick = () => {
    if (!loading && !isCurrent && !isLocked && onSelect) {
      onSelect(tier);
    }
  };

  const getButtonText = () => {
    if (loading) return "Processing...";
    if (isCurrent) return "Current Plan";
    if (isLocked) return "Contact Support";
    if (tier.id === "starter") return "Get Started";
    if (tier.id === "pro") return "Upgrade to Pro";
    if (tier.id === "elite") return "Upgrade to Elite";
    return "Select Plan";
  };

  return (
    <div
      className={`${styles.card} ${isPopular ? styles.popular : ""} ${
        isCurrent ? styles.current : ""
      } ${isLocked ? styles.locked : ""} ${styles[variant]}`}
    >
      {/* Popular Badge */}
      {isPopular && (
        <div className={styles.popularBadge}>
          <CrownIcon />
          <span>MOST LOVED</span>
        </div>
      )}

      {/* Current Plan Badge */}
      {isCurrent && (
        <div className={styles.currentBadge}>
          <CheckIcon />
          <span>YOUR PLAN</span>
        </div>
      )}

      {/* Locked Overlay */}
      {isLocked && (
        <div className={styles.lockedOverlay}>
          <LockIcon />
          <span>Contact Support to Downgrade</span>
        </div>
      )}

      {/* Card Header */}
      <div className={styles.header}>
        <div className={styles.iconWrapper}>{getTierIcon()}</div>
        <h3 className={styles.name}>{tier.name}</h3>
        {variant === "detailed" && (
          <p className={styles.description}>{tier.description}</p>
        )}
      </div>

      {/* Price */}
      <div className={styles.priceWrapper}>
        <div className={styles.price}>
          <span className={styles.currency}>{tier.currency}</span>
          <span className={styles.amount}>
            {tier.price != null && tier.price > 0
              ? tier.price.toLocaleString()
              : tier.id === "starter"
              ? "Free"
              : <LoadingLogo/>}
          </span>
        </div>
        {tier.price > 0 && variant !== "compact" && (
          <span className={styles.priceNote}>one-time payment</span>
        )}
      </div>

      {/* Features List */}
      <ul className={styles.features}>
        {tier.features.map((feature, index) => (
          <li key={index} className={styles.feature}>
            <div className={styles.featureIcon}>
              <CheckIcon />
            </div>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <button
        className={`${styles.button} ${isPopular ? styles.buttonPrimary : ""} ${
          isCurrent ? styles.buttonCurrent : ""
        }`}
        onClick={handleClick}
        disabled={loading || isCurrent || isLocked}
      >
        {getButtonText()}
      </button>
    </div>
  );
}
