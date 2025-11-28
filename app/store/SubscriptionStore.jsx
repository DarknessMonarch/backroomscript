import { create } from "zustand";
import { useAuthStore } from "./AuthStore";

const SERVER_API = process.env.NEXT_PUBLIC_SERVER_API;

export const useSubscriptionStore = create((set, get) => ({
  // Subscription State
  currentSubscription: null,
  subscriptionLoading: false,
  paymentLoading: false,
  verifyingPayment: false,
  allSubscriptions: [],
  allSubscriptionsLoading: false,

  // Unified Tier Information - Single source of truth
  tiers: {
    starter: {
      id: "starter",
      name: "Starter Glow",
      price: 0,
      currency: "KSh",
      description: "Perfect for beginning your conversation journey",
      features: [
        "Access to 1 template per day",
        "Quick-start confidence guide",
        "Email support (24h response)"
      ],
      limits: {
        templatesPerDay: 1,
        totalTemplates: 15,
        bookmarks: false,
        previousAccess: false,
        coaching: false,
        responseTime: "24 hours"
      },
      color: "#ec4899",
      gradient: "linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)"
    },
    pro: {
      id: "pro",
      name: "Radiant Pro",
      price: 3499,
      currency: "KSh",
      description: "Elevate your communication with confidence",
      features: [
        "Community support",
        "50+ Premium templates",
        "Bookmark your favorites",
        "Access previous templates",
        "Everything in Starter Glow",
        "Advanced flirting techniques",
        "Relationship building methods",
        "Priority support (12h response)",
      ],
      limits: {
        templatesPerDay: "unlimited",
        totalTemplates: 50,
        bookmarks: true,
        previousAccess: true,
        coaching: false,
        responseTime: "12 hours"
      },
      color: "#a855f7",
      gradient: "linear-gradient(135deg, #a855f7 0%, #8b5cf6 100%)"
    },
    elite: {
      id: "elite",
      name: "Queen Elite",
      price: 9999,
      currency: "KSh",
      description: "Complete mastery with personal coaching",
      features: [
        "100+ Expert templates (unlimited access)",
        "All categories unlocked",
        "Monthly content updates",
        "Direct WhatsApp support",
        "Custom template requests",
        "Lifetime content updates",
        "Everything on Radiant Pro",
        "Coaching & support access",
        "Priority feature requests",
        "1-on-1 coaching session (60min)",
      ],
      limits: {
        templatesPerDay: "unlimited",
        totalTemplates: "unlimited",
        bookmarks: true,
        previousAccess: true,
        coaching: true,
        responseTime: "2 hours"
      },
      color: "#fbbf24",
      gradient: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)"
    }
  },

  // Get Current Subscription
  getSubscription: async () => {
    try {
      set({ subscriptionLoading: true });
      const { getAuthHeader } = useAuthStore.getState();
      
      const response = await fetch(`${SERVER_API}/subscriptions/me`, {
        headers: getAuthHeader(),
      });

      const data = await response.json();
      if (data.status === "success") {
        set({
          currentSubscription: data.data.subscription,
          subscriptionLoading: false,
        });
        
        // Update auth store with current tier
        useAuthStore.getState().updateUser({ 
          currentTier: data.data.currentTier 
        });
        
        return { success: true, data: data.data };
      }
      set({ subscriptionLoading: false });
      return { success: false, message: data.message };
    } catch (error) {
      console.error("Get subscription error:", error);
      set({ subscriptionLoading: false });
      return { success: false, message: "Failed to fetch subscription" };
    }
  },

  // Initialize Payment
  initializePayment: async (tier) => {
    try {
      set({ paymentLoading: true });
      const { getAuthHeader } = useAuthStore.getState();
      
      const response = await fetch(`${SERVER_API}/subscriptions/initialize`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
        body: JSON.stringify({ tier }),
      });

      const data = await response.json();
      if (data.status === "success") {
        set({ paymentLoading: false });
        return { 
          success: true, 
          data: data.data // Contains authorizationUrl, reference, accessCode
        };
      }
      set({ paymentLoading: false });
      return { success: false, message: data.message };
    } catch (error) {
      console.error("Initialize payment error:", error);
      set({ paymentLoading: false });
      return { success: false, message: "Failed to initialize payment" };
    }
  },

  // Verify Payment
  verifyPayment: async (reference) => {
    try {
      set({ verifyingPayment: true });
      const { getAuthHeader } = useAuthStore.getState();
      
      const response = await fetch(`${SERVER_API}/subscriptions/verify/${reference}`, {
        headers: getAuthHeader(),
      });

      const data = await response.json();
      if (data.status === "success") {
        set({ 
          verifyingPayment: false,
          currentSubscription: data.data.subscription,
        });
        
        // Update auth store with new tier
        useAuthStore.getState().updateUser({ 
          currentTier: data.data.tier 
        });
        
        return { 
          success: true, 
          data: data.data,
          message: "Payment verified successfully! Welcome to your new tier!" 
        };
      }
      set({ verifyingPayment: false });
      return { success: false, message: data.message };
    } catch (error) {
      console.error("Verify payment error:", error);
      set({ verifyingPayment: false });
      return { success: false, message: "Failed to verify payment" };
    }
  },

  // Get Tier Info
  getTierInfo: (tier) => {
    const { tiers } = get();
    return tiers[tier] || tiers.starter;
  },

  // Get All Tiers as Array
  getAllTiers: () => {
    const { tiers } = get();
    return Object.values(tiers);
  },

  // Check if User Can Access Tier
  canAccessTier: (requiredTier) => {
    const { currentTier } = useAuthStore.getState();
    const tierHierarchy = { starter: 0, pro: 1, elite: 2 };
    return tierHierarchy[currentTier] >= tierHierarchy[requiredTier];
  },

  // Get Tier Hierarchy Level
  getTierLevel: (tier) => {
    const tierHierarchy = { starter: 0, pro: 1, elite: 2 };
    return tierHierarchy[tier] || 0;
  },

  // Admin: Get All Subscriptions
  getAllSubscriptions: async () => {
    try {
      set({ allSubscriptionsLoading: true });
      const { getAuthHeader } = useAuthStore.getState();
      
      const response = await fetch(`${SERVER_API}/subscriptions-admin/all`, {
        headers: getAuthHeader(),
      });

      const data = await response.json();
      if (data.status === "success") {
        set({
          allSubscriptions: data.data.subscriptions,
          allSubscriptionsLoading: false,
        });
        return { success: true, data: data.data.subscriptions };
      }
      set({ allSubscriptionsLoading: false });
      return { success: false, message: data.message };
    } catch (error) {
      console.error("Get all subscriptions error:", error);
      set({ allSubscriptionsLoading: false });
      return { success: false, message: "Failed to fetch subscriptions" };
    }
  },

  // Admin: Grant Subscription
  grantSubscription: async (userId, tier, duration) => {
    try {
      const { getAuthHeader } = useAuthStore.getState();
      
      const response = await fetch(`${SERVER_API}/subscriptions-admin/grant`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
        body: JSON.stringify({ userId, tier, duration }),
      });

      const data = await response.json();
      if (data.status === "success") {
        get().getAllSubscriptions(); // Refresh subscriptions list
        return { success: true, message: "Subscription granted successfully" };
      }
      return { success: false, message: data.message };
    } catch (error) {
      console.error("Grant subscription error:", error);
      return { success: false, message: "Failed to grant subscription" };
    }
  },
}));