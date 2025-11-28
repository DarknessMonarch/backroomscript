"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/app/store/AuthStore";

export function StoreInitializer({ children }) {
  const { initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return <>{children}</>;
}
