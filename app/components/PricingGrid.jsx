"use client";

import { useEffect } from "react";
import PricingCard from "./PricingCard";
import styles from "@/app/style/pricingGrid.module.css";
import { useSubscriptionStore } from "@/app/store/SubscriptionStore";
import {
  IoCheckmark as CheckIcon,
  IoShield as ShieldIcon,
  IoLockClosed as LockIcon,
} from "react-icons/io5";

export default function PricingGrid({
  tiers,
  currentTier,
  onSelectTier,
  loading = null,
  variant = "default", // 'default', 'compact', 'detailed'
  showHeader = true,
  showFooter = true,
  getTierLevel,
}) {
  const fetchPricing = useSubscriptionStore((state) => state.fetchPricing);

  // Fetch pricing on mount - runs once per component instance
  useEffect(() => {
    fetchPricing();
  }, [fetchPricing]);

  const isPopular = (tierId) => tierId === "pro";
  const isCurrent = (tierId) => currentTier === tierId;
  const isLocked = (tierId) => {
    if (!getTierLevel || !currentTier) return false;
    return getTierLevel(tierId) < getTierLevel(currentTier);
  };

  return (
    <div className={styles.container}>
      {showHeader && (
        <div className={styles.header}>
          <h2 className={styles.title}>Choose Your Glow Level</h2>
          <p className={styles.subtitle}>
            One-time investment in yourself. Lifetime confidence.
          </p>
          <div className={styles.guaranteeBadge}>
            <CheckIcon />
            <span>30-Day Love-It Guarantee</span>
          </div>
        </div>
      )}

      <div className={`${styles.grid} ${styles[variant]}`}>
        {tiers.map((tier) => (
          <PricingCard
            key={tier.id}
            tier={tier}
            isPopular={isPopular(tier.id)}
            isCurrent={isCurrent(tier.id)}
            isLocked={isLocked(tier.id)}
            onSelect={onSelectTier}
            loading={loading === tier.id}
            variant={variant}
          />
        ))}
      </div>

      {showFooter && (
        <div className={styles.footer}>
          <div className={styles.badge}>
            <ShieldIcon />
            <div>
              <strong>Trusted Service</strong>
              <p>Reliable and secure service with dedicated support.</p>
            </div>
          </div>
          <div className={styles.badge}>
            <LockIcon />
            <div>
              <strong>Secure Payment</strong>
              <p>Protected by Paystack with M-Pesa support</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}