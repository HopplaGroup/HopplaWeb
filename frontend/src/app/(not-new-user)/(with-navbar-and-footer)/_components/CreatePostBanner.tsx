"use client";

import { useUser } from "@/lib/providers/UserProvider";
import { languageTag } from "@/paraglide/runtime";
import { X, Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { AuthModal } from "@/app/_components/AuthModals";

const BANNER_DISMISSED_KEY = "create-post-banner-dismissed";

export function CreatePostBanner() {
  const { user } = useUser();
  const lang = languageTag();
  const router = useRouter();
  const [isDismissed, setIsDismissed] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  useEffect(() => {
    const dismissed = localStorage.getItem(BANNER_DISMISSED_KEY);
    setIsDismissed(dismissed === "true");
  }, []);

  // Check if user just logged in and redirect to request-ride
  useEffect(() => {
    if (user) {
      const redirectUrl = sessionStorage.getItem("post_login_redirect");
      if (redirectUrl) {
        sessionStorage.removeItem("post_login_redirect");
        router.push(redirectUrl);
      }
    }
  }, [user, router]);

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem(BANNER_DISMISSED_KEY, "true");
  };

  const handleCreatePostClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (user) {
      // User is logged in, go directly to request-ride page
      router.push("/request-ride");
    } else {
      // User is not logged in, store return URL and show login modal
      sessionStorage.setItem("post_login_redirect", "/request-ride");
      setAuthMode('login');
      setIsAuthModalOpen(true);
    }
  };

  if (isDismissed) return null;

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
            <button
              onClick={handleCreatePostClick}
              className="text-sm font-medium px-3 py-1 bg-white/20 hover:bg-white/30 rounded-md transition-colors whitespace-nowrap"
            >
              {lang === "ka" ? "პოსტის შექმნა" : "Create Post"}
            </button>
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
      <div className="hidden md:block bg-primary text-white md:mt-20 md:mb-[-80px]">
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
            <button
              onClick={handleCreatePostClick}
              className="text-sm font-medium px-3 py-1 bg-white/20 hover:bg-white/30 rounded-md transition-colors whitespace-nowrap"
            >
              {lang === "ka" ? "პოსტის შექმნა" : "Create Post"}
            </button>
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

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onSwitchMode={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
        customSubheader={lang === "ka" ? "დასაპოსტად შედით სისტემაში" : "Login to create a post"}
      />
    </>
  );
}
