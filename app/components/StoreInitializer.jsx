"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/app/store/AuthStore";
import { useSubscriptionStore } from "@/app/store/SubscriptionStore";

export function StoreInitializer({ children }) {
  useEffect(() => {
    const initializeAuth = useAuthStore.getState().initializeAuth;
    const fetchPricing = useSubscriptionStore.getState().fetchPricing;

    initializeAuth();
    fetchPricing();

    console.log("🔧 StoreInitializer: Auth and pricing initialization started");
  }, []);

  return <>{children}</>;
}
