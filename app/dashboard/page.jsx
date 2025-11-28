"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/app/store/AuthStore";
import { useTemplateStore } from "@/app/store/TemplateStore";
import { useSubscriptionStore } from "@/app/store/SubscriptionStore";
import ProfilePicture from "@/app/components/ProfilePicture";
import SuccessStorySubmission from "@/app/components/SuccessStorySubmission";
import styles from "@/app/style/dashboard.module.css";
import { toast } from "sonner";

import {
  IoSparkles as SparklesIcon,
  IoChevronForward as ChevronIcon,
  IoSearch as SearchIcon,
  IoFilter as FilterIcon,
  IoClose as CloseIcon,
  IoBookmark as BookmarkIcon,
  IoBookmarkOutline as BookmarkOutlineIcon,
  IoSend as SendIcon,
  IoTime as TimeIcon,
  IoChatbubbles as ChatIcon,
  IoTrophy as TrophyIcon,
  IoRocket as RocketIcon,
  IoLockClosed as LockIcon,
  IoCheckmarkCircle as CheckIcon,
  IoHeart as HeartIcon,
  IoBusiness as BusinessIcon,
  IoText as TextIcon,
  IoPeople as PeopleIcon,
  IoCalendar as CalendarIcon,
  IoStar as StarIcon,
} from "react-icons/io5";

import { FaCrown as CrownIcon, FaTelegram as TelegramIcon } from "react-icons/fa";

export default function Dashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuth, username, currentTier, logout } = useAuthStore();

  const {
    templates,
    templatesLoading,
    previousTemplates,
    previousLoading,
    bookmarkedTemplates: storeBookmarkedTemplates,
    bookmarksLoading,
    templateLimit,
    totalAvailable,
    displayedCount,
    getAllTemplates,
    getPreviousTemplates,
    getBookmarkedTemplates,
    getTemplate,
    toggleBookmark,
  } = useTemplateStore();

  const { 
    getTierInfo,
    getAllTiers,
    getTierLevel,
    initializePayment, 
    paymentLoading,
    verifyPayment,
    verifyingPayment
  } = useSubscriptionStore();

  const [activeTab, setActiveTab] = useState("templates");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [upgradingToTier, setUpgradingToTier] = useState(null);
  const [verificationComplete, setVerificationComplete] = useState(false);

  // Handle payment verification on mount
  useEffect(() => {
    if (!isAuth) {
      router.push("/authentication/login");
      return;
    }

    // Check for payment verification parameters
    const reference = searchParams.get('reference');
    const trxref = searchParams.get('trxref');
    const status = searchParams.get('status');

    if ((reference || trxref) && !verificationComplete) {
      handlePaymentVerification(reference || trxref, status);
    } else {
      // Normal data fetch
      getAllTemplates();
      getPreviousTemplates();
      getBookmarkedTemplates();
    }
  }, [isAuth, router, searchParams, verificationComplete]);

  const handlePaymentVerification = async (reference, status) => {
    if (status === 'cancelled') {
      toast.error("Payment was cancelled");
      router.replace('/dashboard');
      return;
    }

    toast.loading("Verifying your payment...", { id: 'verify-payment' });

    try {
      const result = await verifyPayment(reference);

      if (result.success) {
        toast.success(result.message || "Payment verified! Welcome to your new tier! 🎉", { 
          id: 'verify-payment',
          duration: 5000 
        });
        
        setVerificationComplete(true);
        
        await Promise.all([
          getAllTemplates(),
          getPreviousTemplates(),
          getBookmarkedTemplates()
        ]);

        router.replace('/dashboard');
      } else {
        toast.error(result.message || "Payment verification failed", { 
          id: 'verify-payment' 
        });
        router.replace('/dashboard');
      }
    } catch (error) {
      console.error("Payment verification error:", error);
      toast.error("Failed to verify payment. Please contact support.", {
        id: 'verify-payment'
      });
      router.replace('/dashboard');
    }
  };

  const categories = [
    { id: "all", label: "All Templates", icon: <SparklesIcon /> },
    { id: "dating", label: "Dating & Flirting", icon: <HeartIcon /> },
    { id: "business", label: "Business", icon: <BusinessIcon /> },
    { id: "social", label: "Social", icon: <PeopleIcon /> },
    { id: "content", label: "Content", icon: <TextIcon /> },
  ];

  const filteredTemplates = (templates || []).filter((template) => {
    const matchesCategory =
      selectedCategory === "all" || template.category === selectedCategory;
    const matchesSearch =
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleTemplateClick = async (template) => {
    const tierHierarchy = { starter: 0, pro: 1, elite: 2 };
    const userTierLevel = tierHierarchy[currentTier] || 0;
    const templateTierLevel = tierHierarchy[template.tier] || 0;

    if (templateTierLevel > userTierLevel) {
      setShowUpgradeModal(true);
      return;
    }

    if (currentTier === "starter") {
      const result = await getTemplate(template._id || template.id);
      if (!result.success) {
        if (result.message?.includes('only 1 template')) {
          toast.error(result.message);
          setShowUpgradeModal(true);
        } else {
          toast.error(result.message || "Failed to access template");
        }
        return;
      }
      setSelectedTemplate(result.data);
    } else {
      setSelectedTemplate(template);
    }
  };

  const handleToggleBookmark = async (templateId) => {
    const result = await toggleBookmark(templateId);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message || "Failed to update bookmark");
    }
  };

  const handleUpgrade = async (tier) => {
    if (tier.id === "starter") {
      toast.info("Starter tier is free and available to all users");
      return;
    }

    if (currentTier === tier.id) {
      toast.info(`You're already on the ${tier.name} tier`);
      return;
    }

    const currentLevel = getTierLevel(currentTier);
    const targetLevel = getTierLevel(tier.id);
    
    if (targetLevel < currentLevel) {
      toast.info("Please contact support to downgrade your plan");
      return;
    }

    setUpgradingToTier(tier.id);

    const result = await initializePayment(tier.id);
    if (result.success) {
      toast.success("Redirecting to payment...");
      window.location.href = result.data.authorizationUrl;
    } else {
      toast.error(result.message || "Failed to initialize payment");
      setUpgradingToTier(null);
    }
  };

  const handleReplySubmit = () => {
    if (!replyText.trim()) return;
    toast.success("Reply sent! Our team will respond within 24 hours.");
    setReplyText("");
  };

  const handleTelegramClick = () => {
    window.open("https://t.me/backroomscript", "_blank");
  };

  const currentTierInfo = getTierInfo(currentTier);

  const getTierIcon = () => {
    switch(currentTier) {
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

  if (verifyingPayment) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}>
          <SparklesIcon className={styles.loaderIcon} />
          <p>Verifying your payment...</p>
        </div>
      </div>
    );
  }

  if (templatesLoading && !templates.length && !verificationComplete) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}>
          <SparklesIcon className={styles.loaderIcon} />
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.userProfile}>
            <ProfilePicture />
            <div className={styles.userInfo}>
              <h3>{username || "Queen"}</h3>
              <span className={styles.userTier}>{currentTierInfo.name}</span>
            </div>
          </div>
        </div>

        <nav className={styles.sidebarNav}>
          <button
            className={`${styles.navItem} ${
              activeTab === "templates" ? styles.navItemActive : ""
            }`}
            onClick={() => setActiveTab("templates")}
          >
            <SparklesIcon />
            <span>Templates</span>
          </button>
          <button
            className={`${styles.navItem} ${
              activeTab === "previous" ? styles.navItemActive : ""
            } ${!currentTierInfo.limits.previousAccess ? styles.navItemLocked : ""}`}
            onClick={() => {
              if (!currentTierInfo.limits.previousAccess) {
                toast.info("Upgrade to Pro to access previous templates");
                setShowUpgradeModal(true);
              } else {
                setActiveTab("previous");
              }
            }}
          >
            <TimeIcon />
            <span>Previous Templates</span>
            {!currentTierInfo.limits.previousAccess && <LockIcon className={styles.lockIcon} />}
          </button>
          <button
            className={`${styles.navItem} ${
              activeTab === "bookmarks" ? styles.navItemActive : ""
            } ${!currentTierInfo.limits.bookmarks ? styles.navItemLocked : ""}`}
            onClick={() => {
              if (!currentTierInfo.limits.bookmarks) {
                toast.info("Upgrade to Pro to bookmark templates");
                setShowUpgradeModal(true);
              } else {
                setActiveTab("bookmarks");
              }
            }}
          >
            <BookmarkIcon />
            <span>Bookmarked</span>
            {!currentTierInfo.limits.bookmarks && <LockIcon className={styles.lockIcon} />}
          </button>
          <button
            className={`${styles.navItem} ${
              activeTab === "coaching" ? styles.navItemActive : ""
            } ${!currentTierInfo.limits.coaching ? styles.navItemLocked : ""}`}
            onClick={() => {
              if (!currentTierInfo.limits.coaching) {
                toast.info("Upgrade to Queen Elite for coaching & support");
                setShowUpgradeModal(true);
              } else {
                setActiveTab("coaching");
              }
            }}
          >
            <ChatIcon />
            <span>Coaching & Support</span>
            {!currentTierInfo.limits.coaching && <LockIcon className={styles.lockIcon} />}
          </button>
          <button
            className={`${styles.navItem} ${
              activeTab === "success-stories" ? styles.navItemActive : ""
            }`}
            onClick={() => setActiveTab("success-stories")}
          >
            <StarIcon />
            <span>Success Stories</span>
          </button>
        </nav>

        <div className={styles.sidebarFooter}>
          <button
            className={styles.upgradeButton}
            onClick={() => setShowUpgradeModal(true)}
          >
            <RocketIcon />
            <span>Upgrade Plan</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {/* Header */}
        <header className={styles.contentHeader}>
          <div className={styles.headerTop}>
            <div>
              <h1>
                {activeTab === "templates" && "Your Templates"}
                {activeTab === "previous" && "Previous Templates"}
                {activeTab === "bookmarks" && "Bookmarked Templates"}
                {activeTab === "coaching" && "Coaching & Support"}
                {activeTab === "success-stories" && "Success Stories"}
              </h1>
              <p className={styles.headerSubtitle}>
                {activeTab === "templates" && (
                  <>
                    Master confident conversations with our expert templates
                    {templateLimit && displayedCount > 0 && (
                      <span className={styles.limitBadge}>
                        {displayedCount} of {templateLimit === "unlimited" ? "unlimited" : totalAvailable} templates
                        {templateLimit !== "unlimited" && totalAvailable > displayedCount && (
                          <button
                            className={styles.upgradeLinkInline}
                            onClick={() => setShowUpgradeModal(true)}
                          >
                            Upgrade for more
                          </button>
                        )}
                      </span>
                    )}
                  </>
                )}
                {activeTab === "previous" &&
                  "Review templates you've accessed before"}
                {activeTab === "bookmarks" && "Your saved favorite templates"}
                {activeTab === "coaching" &&
                  "Get personalized guidance from our experts"}
                {activeTab === "success-stories" &&
                  "Share your success story and inspire others"}
              </p>
            </div>
          </div>

          {activeTab === "templates" && (
            <div className={styles.searchBar}>
              <SearchIcon className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
              {searchQuery && (
                <button
                  className={styles.clearButton}
                  onClick={() => setSearchQuery("")}
                >
                  <CloseIcon />
                </button>
              )}
            </div>
          )}
        </header>

        {/* Categories Filter */}
        {activeTab === "templates" && (
          <div className={styles.categoriesFilter}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`${styles.categoryChip} ${
                  selectedCategory === cat.id ? styles.categoryChipActive : ""
                }`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Templates Grid */}
        {activeTab === "templates" && (
          <div className={styles.templatesGrid}>
            {filteredTemplates.map((template) => {
              const tierHierarchy = { starter: 0, pro: 1, elite: 2 };
              const userTierLevel = tierHierarchy[currentTier] || 0;
              const templateTierLevel = tierHierarchy[template.tier] || 0;
              const isLocked = templateTierLevel > userTierLevel;

              return (
                <div
                  key={template._id || template.id}
                  className={`${styles.templateCard} ${isLocked ? styles.templateCardLocked : ''}`}
                  onClick={() => handleTemplateClick(template)}
                >
                  {isLocked && (
                    <div className={styles.premiumBadge}>
                      <LockIcon />
                      <span>{template.tier === 'pro' ? 'Pro' : 'Elite'}</span>
                    </div>
                  )}
                  <div className={styles.templateHeader}>
                    <h3>{template.title}</h3>
                    {!currentTierInfo.limits.bookmarks ? (
                      <button
                        className={`${styles.bookmarkButton} ${styles.bookmarkLocked}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toast.info("Upgrade to Pro to bookmark templates");
                          setShowUpgradeModal(true);
                        }}
                      >
                        <LockIcon />
                      </button>
                    ) : (
                      <button
                        className={styles.bookmarkButton}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleBookmark(template._id || template.id);
                        }}
                      >
                        {template.isBookmarked ? (
                          <BookmarkIcon className={styles.bookmarked} />
                        ) : (
                          <BookmarkOutlineIcon />
                        )}
                      </button>
                    )}
                  </div>
                  <p className={styles.templateDescription}>
                    {template.description}
                  </p>
                  <div className={styles.templateFooter}>
                    <span className={styles.templateCategory}>
                      {template.category}
                    </span>
                    <span className={styles.templateReads}>
                      {template.views || 0} views
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Previous Templates */}
        {activeTab === "previous" && (
          <div className={styles.previousList}>
            {previousLoading ? (
              <div className={styles.loadingContainer}>
                <p>Loading previous templates...</p>
              </div>
            ) : (previousTemplates || []).length === 0 ? (
              <div className={styles.emptyState}>
                <TimeIcon className={styles.emptyIcon} />
                <h3>No Previous Templates</h3>
                <p>Templates you access will appear here</p>
              </div>
            ) : (
              (previousTemplates || []).map((template) => (
                <div
                  key={template._id || template.id}
                  className={styles.previousItem}
                  onClick={() => handleTemplateClick(template)}
                >
                  <div className={styles.previousInfo}>
                    <h3>{template.title}</h3>
                    <div className={styles.previousMeta}>
                      <span>
                        <CalendarIcon /> {new Date(template.accessedAt || template.createdAt).toLocaleDateString()}
                      </span>
                      <span className={styles.templateCategory}>
                        {template.category}
                      </span>
                    </div>
                  </div>
                  <ChevronIcon className={styles.previousChevron} />
                </div>
              ))
            )}
          </div>
        )}

        {/* Bookmarked Templates */}
        {activeTab === "bookmarks" && (
          <div className={styles.templatesGrid}>
            {bookmarksLoading ? (
              <div className={styles.loadingContainer}>
                <p>Loading bookmarked templates...</p>
              </div>
            ) : (storeBookmarkedTemplates || []).length === 0 ? (
              <div className={styles.emptyState}>
                <BookmarkIcon className={styles.emptyIcon} />
                <h3>No Bookmarked Templates</h3>
                <p>Save your favorite templates for quick access</p>
              </div>
            ) : (
              (storeBookmarkedTemplates || []).map((template) => (
                <div
                  key={template._id || template.id}
                  className={styles.templateCard}
                  onClick={() => handleTemplateClick(template)}
                >
                  <div className={styles.templateHeader}>
                    <h3>{template.title}</h3>
                    <button
                      className={styles.bookmarkButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleBookmark(template._id || template.id);
                      }}
                    >
                      <BookmarkIcon className={styles.bookmarked} />
                    </button>
                  </div>
                  <p className={styles.templateDescription}>
                    {template.description}
                  </p>
                  <div className={styles.templateFooter}>
                    <span className={styles.templateCategory}>
                      {template.category}
                    </span>
                    <span className={styles.templateReads}>
                      {template.views || 0} views
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Coaching & Support */}
        {activeTab === "coaching" && (
          <div className={styles.coachingSection}>
            {(currentTier === "elite") && (
              <div className={styles.coachingCard}>
                <div className={styles.coachingIcon}>
                  <TelegramIcon />
                </div>
                <h2>Join Our Telegram Community</h2>
                <p>
                  Connect with other queens, get instant support, and access exclusive content in our private Telegram group.
                </p>
                <button 
                  className={styles.coachingBookButton}
                  onClick={handleTelegramClick}
                >
                  <TelegramIcon />
                  <span>Join Telegram Group</span>
                </button>
              </div>
            )}

            <div className={styles.coachingCard}>
              <div className={styles.coachingIcon}>
                <ChatIcon />
              </div>
              <h2>Ask Our Experts</h2>
              <p>
                Have questions about using a template? Need personalized advice?
                Our team is here to help!
              </p>
              <textarea
                className={styles.coachingTextarea}
                placeholder="Type your question here..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                rows={5}
              />
              <button
                className={styles.coachingSendButton}
                onClick={handleReplySubmit}
              >
                <SendIcon />
                <span>Send Message</span>
              </button>
            </div>

            {currentTier === "elite" && (
              <div className={styles.coachingCard}>
                <div className={styles.coachingIcon}>
                  <CrownIcon />
                </div>
                <h2>1-on-1 Coaching Session</h2>
                <p>
                  As a Queen Elite member, you have access to a 60-minute
                  coaching session!
                </p>
                <button className={styles.coachingBookButton}>
                  <CalendarIcon />
                  <span>Book Your Session</span>
                </button>
              </div>
            )}

            <div className={styles.responseTimes}>
              <div className={styles.responseTimeItem}>
                <CheckIcon />
                <div>
                  <strong>Response Time</strong>
                  <p>{currentTierInfo.limits.responseTime}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Success Stories */}
        {activeTab === "success-stories" && (
          <SuccessStorySubmission />
        )}
      </main>

      {/* Template Modal */}
      {selectedTemplate && (
        <div className={styles.modalOverlay} onClick={() => setSelectedTemplate(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.modalClose}
              onClick={() => setSelectedTemplate(null)}
            >
              <CloseIcon />
            </button>
            <div className={styles.modalHeader}>
              <h2>{selectedTemplate.title}</h2>
              {currentTierInfo.limits.bookmarks && (
                <button
                  className={styles.modalBookmark}
                  onClick={() => handleToggleBookmark(selectedTemplate._id || selectedTemplate.id)}
                >
                  {selectedTemplate.isBookmarked ? (
                    <BookmarkIcon className={styles.bookmarked} />
                  ) : (
                    <BookmarkOutlineIcon />
                  )}
                </button>
              )}
            </div>
            <div
              className={styles.modalBody}
              dangerouslySetInnerHTML={{ __html: selectedTemplate.content }}
            />
            <div className={styles.modalFooter}>
              <button className={styles.modalAskButton}>
                <ChatIcon />
                <span>Ask a Question</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowUpgradeModal(false)}
        >
          <div
            className={styles.upgradeModal}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.modalClose}
              onClick={() => setShowUpgradeModal(false)}
            >
              <CloseIcon />
            </button>
            <div className={styles.upgradeHeader}>
              <RocketIcon />
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
              {getAllTiers()
                .filter(tier => getTierLevel(tier.id) > getTierLevel(currentTier))
                .map((tier) => (
                  <div 
                    key={tier.id}
                    className={`${styles.upgradeTier} ${
                      tier.id === "pro" && currentTier === "starter" ? styles.upgradeTierPopular : ""
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
                          <CheckIcon className={styles.benefitIcon} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      className={styles.upgradeSelectButton}
                      onClick={() => handleUpgrade(tier)}
                      disabled={paymentLoading || upgradingToTier === tier.id}
                    >
                      {upgradingToTier === tier.id 
                        ? "Processing..." 
                        : `Upgrade to ${tier.name.split(' ')[1]}`}
                    </button>
                  </div>
                ))}

              {currentTier === "elite" && (
                <div className={styles.eliteMessage}>
                  <CrownIcon className={styles.eliteCrown} />
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
      )}
    </div>
  );
}