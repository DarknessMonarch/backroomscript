"use client";

import { useState, useRef, useEffect } from "react";
import { useSuccessStoryStore } from "@/app/store/SuccessStoryStore";
import styles from "@/app/style/testimonials.module.css";
import {
  MdOutlineKeyboardArrowLeft as LeftIcon,
  MdOutlineKeyboardArrowRight as RightIcon,
  MdAdd as PlusIcon,
  MdRemove as MinusIcon,
} from "react-icons/md";
import { IoStar as StarIcon } from "react-icons/io5";

const generateAvatar = (username) => {
  if (!username) return "U";
  const words = username.trim().split(" ");
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return username.slice(0, 2).toUpperCase();
};

const formatTierRole = (tier) => {
  const tierRoles = {
    starter: "Starter Member",
    pro: "Radiant Pro Member",
    elite: "Queen Elite Member",
  };
  return tierRoles[tier] || "Member";
};

const transformStoryToTestimonial = (story) => {
  return {
    id: story._id,
    text: story.story,
    user: {
      name: story.user?.username || "Anonymous",
      avatar: generateAvatar(story.user?.username || "Anonymous"),
      role: formatTierRole(story.userTier),
    },
    rating: 5, // All approved stories get 5 stars
  };
};

const FAQ_DATA = [
  {
    id: 1,
    question: "How do I get started with BackroomScript?",
    answer:
      "Getting started is easy! Simply choose your tier, complete the secure payment via Paystack (M-Pesa supported), and you'll instantly receive access to your templates and resources. Our quick-start guide will walk you through everything.",
  },
  {
    id: 2,
    question: "What payment methods do you accept?",
    answer:
      "We accept all major payment methods through Paystack, including M-Pesa, credit/debit cards, and bank transfers. All transactions are secure and encrypted for your protection.",
  },
  {
    id: 3,
    question: "Is there a free trial available?",
    answer:
      "Yes! your first tier is free and come with the basic features to help you get started. You can upgrade to a higher tier at any time for additional benefits.",
  },
  {
    id: 4,
    question: "Is technical support available?",
    answer:
      "Absolutely! You can get support from our contact page and also get quick support from our advanced tier. Our support team is available Monday-Friday, 8AM-6PM EAT.",
  },
  {
    id: 5,
    question: "Can I cancel my subscription?",
    answer:
      "The payment are paid on a monthly basis triggered by you so it's not a cancelable plan.",
  },
  {
    id: 6,
    question: "Is my data secure with BackroomScript?",
    answer:
      "Yes! We take your privacy seriously. All content is heavily protected and payment is procesed by paystack and not us so it's very secure.",
  },
];

export default function TestimonialsAndFAQ() {
  const { approvedStories, storiesLoading, getApprovedStories } = useSuccessStoryStore();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [maxScroll, setMaxScroll] = useState(0);
  const [feedbacks, setFeedbacks] = useState([]);
  const [openFAQ, setOpenFAQ] = useState(null);

  const gridRef = useRef(null);

  useEffect(() => {
    const fetchStories = async () => {
      await getApprovedStories(20); // Fetch up to 20 approved stories
    };
    fetchStories();
  }, [getApprovedStories]);

  useEffect(() => {
    if (approvedStories && approvedStories.length > 0) {
      const transformedFeedbacks = approvedStories.map(transformStoryToTestimonial);
      setFeedbacks(transformedFeedbacks);
    }
  }, [approvedStories]);

  useEffect(() => {
    const checkOverflow = () => {
      if (gridRef.current) {
        const container = gridRef.current;
        const scrollWidth = container.scrollWidth;
        const clientWidth = container.clientWidth;
        const overflow = scrollWidth > clientWidth;

        setHasOverflow(overflow);
        setMaxScroll(overflow ? scrollWidth - clientWidth : 0);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [feedbacks]);

  const handlePrevious = () => {
    if (!hasOverflow) return;
    const scrollAmount = 300;
    const newPosition = Math.max(0, scrollPosition - scrollAmount);
    setScrollPosition(newPosition);

    if (gridRef.current) {
      gridRef.current.scrollTo({ left: newPosition, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (!hasOverflow) return;
    const scrollAmount = 300;
    const newPosition = Math.min(maxScroll, scrollPosition + scrollAmount);
    setScrollPosition(newPosition);

    if (gridRef.current) {
      gridRef.current.scrollTo({ left: newPosition, behavior: "smooth" });
    }
  };

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  const canGoPrevious = hasOverflow && scrollPosition > 0;
  const canGoNext = hasOverflow && scrollPosition < maxScroll;

  return (
    <div className={styles.wrapper}>
      {/* Testimonials Section */}
      <section className={styles.testimonialsContainer}>
        <div className={styles.headerContainer}>
          <div className={styles.titleWrapper}>
            <div className={styles.decorativeLine}></div>
            <h2 className={styles.sectionTitle}>
              See why We're rated #1 in{" "}
              <span className={styles.highlight}>Conversation Confidence</span>
            </h2>
          </div>
          <div className={styles.testimonialsController}>
            <button
              className={`${styles.navButton} ${
                !canGoPrevious ? styles.disabled : ""
              }`}
              onClick={handlePrevious}
              disabled={!canGoPrevious}
              aria-label="Previous feedbacks"
            >
              <LeftIcon className={styles.navBtnIcon} />
            </button>
            <button
              className={`${styles.navButton} ${
                !canGoNext ? styles.disabled : ""
              }`}
              onClick={handleNext}
              disabled={!canGoNext}
              aria-label="Next feedbacks"
            >
              <RightIcon className={styles.navBtnIcon} />
            </button>
          </div>
        </div>

        <p className={styles.subtitle}>
          Our conversation templates empower women to communicate with
          confidence and authenticity. Join thousands of queens mastering the
          art of connection.
        </p>

        {storiesLoading ? (
          <div ref={gridRef} className={styles.testimonialsGrid}>
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className={`${styles.testimonialCard} skeleton`}
              ></div>
            ))}
          </div>
        ) : feedbacks.length > 0 ? (
          <div
            ref={gridRef}
            className={styles.testimonialsGrid}
            onScroll={() => {
              if (gridRef.current)
                setScrollPosition(gridRef.current.scrollLeft);
            }}
          >
            {feedbacks.map((feedback) => (
              <div key={feedback.id} className={styles.testimonialCard}>
                <div className={styles.cardContent}>
                  <div className={styles.quoteIcon}>"</div>
                  <p className={styles.testimonialText}>{feedback.text}</p>
                  <div className={styles.rating}>
                    {[...Array(feedback.rating)].map((_, i) => (
                      <StarIcon key={i} className={styles.starIcon} />
                    ))}
                  </div>
                </div>
                <div className={styles.userInfo}>
                  <div className={styles.avatarCircle}>
                    {feedback.user.avatar}
                  </div>
                  <div className={styles.userDetails}>
                    <span className={styles.userName}>
                      {feedback.user.name}
                    </span>
                    <span className={styles.userRole}>
                      {feedback.user.role}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p className={styles.emptyText}>
              No testimonials available yet. Be the first to share your success story!
            </p>
          </div>
        )}
      </section>

      {/* FAQ Section */}
      <section className={styles.faqContainer}>
        <div className={styles.faqHeader}>
          <div className={styles.titleWrapper}>
            <div className={styles.decorativeLine}></div>
            <h2 className={styles.sectionTitle}>
              Frequently asked Questions
            </h2>
          </div>
          <p className={styles.faqSubtitle}>
            For any support-related queries, reach out to our 24/7 customer
            support team. We're equipped to assist you as soon as possible.
          </p>
        </div>

        <div className={styles.faqList}>
          {FAQ_DATA.map((faq) => (
            <div key={faq.id} className={styles.faqItem}>
              <button
                className={styles.faqQuestion}
                onClick={() => toggleFAQ(faq.id)}
                aria-expanded={openFAQ === faq.id}
              >
                <span className={styles.questionText}>{faq.question}</span>
                {openFAQ === faq.id ? (
                  <MinusIcon className={styles.faqIcon} />
                ) : (
                  <PlusIcon className={styles.faqIcon} />
                )}
              </button>
              {openFAQ === faq.id && (
                <div className={styles.faqAnswer}>
                  <p className={styles.answerText}>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
