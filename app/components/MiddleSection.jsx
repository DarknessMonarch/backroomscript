"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useSubscriptionStore } from "@/app/store/SubscriptionStore";
import { useAuthStore } from "@/app/store/AuthStore";
import { toast } from "sonner";
import PricingGrid from "@/app/components/PricingGrid";
import styles from "@/app/style/middleSection.module.css";
import {
  IoHeart as HeartIcon,
  IoShield as ShieldIcon,
  IoSparkles as SparklesIcon,
  IoFlower as FlowerIcon,
} from "react-icons/io5";

import { FaCrown as CrownIcon } from "react-icons/fa";

export default function MiddleSection() {
  const router = useRouter();
  const { isAuth, currentTier } = useAuthStore();

  const tiersObject = useSubscriptionStore((state) => state.tiers);
  const getTierLevel = useSubscriptionStore((state) => state.getTierLevel);
  const initializePayment = useSubscriptionStore((state) => state.initializePayment);
  const paymentLoading = useSubscriptionStore((state) => state.paymentLoading);

  const tiers = useMemo(() => Object.values(tiersObject), [tiersObject]);

  const [loadingTier, setLoadingTier] = useState(null);

  const features = [
    {
      icon: <HeartIcon />,
      title: "Authentic Connection",
      description:
        "Build genuine relationships without losing yourself or your boundaries.",
    },
    {
      icon: <ShieldIcon />,
      title: "Safe & Secure",
      description:
        "Your privacy matters. Watermarked content for your protection only.",
    },
    {
      icon: <SparklesIcon />,
      title: "Confidence Boost",
      description:
        "Feel empowered in every conversation, whether dating or business.",
    },
    {
      icon: <CrownIcon />,
      title: "Queen Energy",
      description: "Crafted by women, for women who know their worth.",
    },
  ];

  const steps = [
    {
      icon: <HeartIcon />,
      title: "Choose Your Path",
      description:
        "Select the tier that matches your goals. Whether dating, business, or content creation - find your perfect fit.",
    },
    {
      icon: <SparklesIcon />,
      title: "Learn & Grow",
      description:
        "Access proven templates crafted by women who understand your journey. Follow our confidence-building guide.",
    },
    {
      icon: <FlowerIcon />,
      title: "Bloom & Thrive",
      description:
        "Watch your confidence soar as you master authentic conversations. Track your beautiful transformation.",
    },
  ];

  const handleSelectTier = async (tier) => {
    if (!isAuth) {
      toast.error("Please login to upgrade your tier");
      router.push("/authentication/login");
      return;
    }

    if (tier.id === "starter") {
      toast.info("Starter tier is free and available to all users!");
      return;
    }

    if (currentTier === tier.id) {
      toast.info(`You're already on the ${tier.name} tier!`);
      return;
    }

    const currentLevel = getTierLevel(currentTier);
    const targetLevel = getTierLevel(tier.id);
    
    if (targetLevel < currentLevel) {
      toast.info("Please contact support to downgrade your plan");
      return;
    }

    setLoadingTier(tier.id);

    try {
      const result = await initializePayment(tier.id);

      if (result.success) {
        toast.success("Redirecting to payment...");
        window.location.href = result.data.authorizationUrl;
      } else {
        toast.error(result.message || "Failed to initialize payment");
      }
    } catch (error) {
      console.error("Payment initialization error:", error);
      toast.error("Failed to process payment. Please try again.");
    } finally {
      setLoadingTier(null);
    }
  };

  return (
    <section className={styles.middleSection}>
      <div className={styles.middleContainer}>
        <div className={styles.howItWorksSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Your Glow-Up Journey</h2>
            <p className={styles.sectionSubtitle}>
              Three simple steps to conversation confidence
            </p>
          </div>

          <div className={styles.stepsGrid}>
            {steps.map((step, i) => (
              <div key={i} className={styles.stepCard}>
                <div className={styles.stepNumber}>{i + 1}</div>
                <div className={styles.stepIcon}>{step.icon}</div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.pricingSection}>
          <PricingGrid
            tiers={tiers}
            currentTier={currentTier}
            onSelectTier={handleSelectTier}
            loading={loadingTier}
            variant="default"
            showHeader={true}
            showFooter={true}
            getTierLevel={getTierLevel}
          />
        </div>
      </div>
    </section>
  );
}