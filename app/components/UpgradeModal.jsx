"use client";

import styles from "@/app/style/upgradeModal.module.css";
import {
  IoClose,
  IoRocket,
  IoCheckmarkCircle,
} from "react-icons/io5";
import { FaCrown } from "react-icons/fa";

export default function UpgradeModal({
  currentTier,
  tiers,
  getTierLevel,
  onUpgrade,
  onClose,
  paymentLoading,
  upgradingToTier,
}) {
  const filteredTiers = tiers.filter(
    (tier) => getTierLevel(tier.id) > getTierLevel(currentTier)
  );

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.upgradeModal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose}>
          <IoClose />
        </button>

        <div className={styles.upgradeHeader}>
          <IoRocket />
          <h2>Upgrade Your Plan</h2>
          <p>
            {currentTier === "starter"
              ? "Unlock more templates and premium features"
              : currentTier === "pro"
              ? "Get access to exclusive coaching and unlimited templates"
              : "You're on the best plan!"}
          </p>
        </div>

        <div className={styles.upgradeTiers}>
          {filteredTiers.map((tier) => (
            <div
              key={tier.id}
              className={`${styles.upgradeTier} ${
                tier.id === "pro" && currentTier === "starter"
                  ? styles.upgradeTierPopular
                  : ""
              }`}
            >
              {tier.id === "pro" && currentTier === "starter" && (
                <div className={styles.popularBadge}>Most Popular</div>
              )}
              
              <h3>{tier.name}</h3>
              <p className={styles.upgradePrice}>
                {tier.currency} {tier.price.toLocaleString()}
              </p>

              <ul>
                {tier.features.map((feature, idx) => (
                  <li key={idx}>
                    <IoCheckmarkCircle className={styles.benefitIcon} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={styles.upgradeSelectButton}
                onClick={() => onUpgrade(tier)}
                disabled={paymentLoading || upgradingToTier === tier.id}
              >
                {upgradingToTier === tier.id
                  ? "Processing..."
                  : `Upgrade to ${tier.name.split(" ")[1]}`}
              </button>
            </div>
          ))}

          {currentTier === "elite" && (
            <div className={styles.eliteMessage}>
              <FaCrown className={styles.eliteCrown} />
              <h3>You&apos;re a Queen Elite!</h3>
              <p>
                You have access to all premium features including unlimited
                templates, coaching & support, and VIP assistance.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}