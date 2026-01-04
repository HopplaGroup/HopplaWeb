"use client";

import { useUser } from "@/lib/providers/UserProvider";
import { languageTag } from "@/paraglide/runtime";
import { X, Bell } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

const BANNER_DISMISSED_KEY = "create-post-banner-dismissed";

export function CreatePostBanner() {
  const { user } = useUser();
  const lang = languageTag();
  const [isDismissed, setIsDismissed] = useState(true);

  useEffect(() => {
    const dismissed = localStorage.getItem(BANNER_DISMISSED_KEY);
    setIsDismissed(dismissed === "true");
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem(BANNER_DISMISSED_KEY, "true");
  };

  if (!user || isDismissed) return null;

  return (
    <>
      {/* Mobile: Normal flow */}
      <div className="md:hidden bg-primary text-white">
        <div className="container py-2.5 px-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Bell className="size-4 flex-shrink-0" />
            <p className="text-sm truncate">
              {lang === "ka" 
                ? "ვერ იპოვე მგზავრობა?" 
                : "Can't find a ride?"}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link
              href="/request-ride"
              className="text-sm font-medium px-3 py-1 bg-white/20 hover:bg-white/30 rounded-md transition-colors whitespace-nowrap"
            >
              {lang === "ka" ? "პოსტის შექმნა" : "Create Post"}
            </Link>
            <button
              type="button"
              onClick={handleDismiss}
              className="p-1 hover:bg-white/20 rounded transition-colors"
              aria-label="Dismiss"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop: Fixed at very top */}
      <div className="hidden md:block fixed top-16 md:top-20 left-0 right-0 z-[101] bg-primary text-white">
        <div className="container py-2 px-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Bell className="size-4 flex-shrink-0" />
            <p className="text-sm">
              {lang === "ka" 
                ? "ვერ იპოვე მგზავრობა? გამოაქვეყნე პოსტი და მძღოლები გიპოვიან" 
                : "Can't find a ride? Post your trip and let drivers find you"}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link
              href="/request-ride"
              className="text-sm font-medium px-3 py-1 bg-white/20 hover:bg-white/30 rounded-md transition-colors whitespace-nowrap"
            >
              {lang === "ka" ? "პოსტის შექმნა" : "Create Post"}
            </Link>
            <button
              type="button"
              onClick={handleDismiss}
              className="p-1 hover:bg-white/20 rounded transition-colors"
              aria-label="Dismiss"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      </div>

    </>
  );
}
