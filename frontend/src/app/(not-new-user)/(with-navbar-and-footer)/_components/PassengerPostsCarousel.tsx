"use client";

import { languageTag } from "@/paraglide/runtime";
import PLACES from "@/lib/constants/places";
import { PASSENGER_PREFERENCES } from "@/lib/constants/passenger-preferences";
import { format } from "date-fns";
import { ka, enUS } from "date-fns/locale";
import { Calendar, Clock, Users, ArrowRight, User, ChevronRight, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect, useTransition, useCallback } from "react";
import { useUser } from "@/lib/providers/UserProvider";
import { useRouter } from "next/navigation";
import { startConversation } from "../users/messages/[conversationId]/actions";

type PassengerPost = {
  id: string;
  from: string;
  to: string;
  departureDateFrom: string;
  departureDateTo: string;
  preferredTimeSlot: string;
  seatsNeeded: number;
  description: string | null;
  preferences: Array<{ id: string; en: string; ka: string }>;
  passenger: {
    id: string;
    name: string;
    profileImg: string | null;
  };
};

type Props = {
  posts: PassengerPost[];
};

const TIME_SLOT_LABELS = {
  ANY: { en: "Any time", ka: "ნებისმიერ დროს" },
  MORNING: { en: "Morning", ka: "დილა" },
  AFTERNOON: { en: "Afternoon", ka: "შუადღე" },
  EVENING: { en: "Evening", ka: "საღამო" },
  NIGHT: { en: "Night", ka: "ღამე" },
} as const;

export function PassengerPostsCarousel({ posts }: Props) {
  const lang = languageTag();
  const locale = lang === "ka" ? ka : enUS;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const { user: currentUser } = useUser();
  const router = useRouter();
  const [pendingUserId, setPendingUserId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const getPlaceName = (osm: string) => {
    const place = PLACES.find((p) => p.osm === osm);
    return place ? place.name[lang] : osm;
  };

  const buildInitialMessage = (post: PassengerPost) => {
    const fromName = getPlaceName(post.from);
    const toName = getPlaceName(post.to);
    const dateFrom = format(new Date(post.departureDateFrom), "d MMM", { locale });
    const dateTo = format(new Date(post.departureDateTo), "d MMM", { locale });
    const timeSlot = TIME_SLOT_LABELS[post.preferredTimeSlot as keyof typeof TIME_SLOT_LABELS]?.[lang] || "";
    
    let message = lang === "ka" 
      ? `🚗 მგზავრობის მოთხოვნა\n\n📍 ${fromName} → ${toName}\n📅 ${dateFrom}${dateFrom !== dateTo ? ` - ${dateTo}` : ""}\n⏰ ${timeSlot}\n👥 ${post.seatsNeeded} ადგილი`
      : `🚗 Trip Request\n\n📍 ${fromName} → ${toName}\n📅 ${dateFrom}${dateFrom !== dateTo ? ` - ${dateTo}` : ""}\n⏰ ${timeSlot}\n👥 ${post.seatsNeeded} seat(s)`;
    
    if (post.preferences && post.preferences.length > 0) {
      const prefLabels = post.preferences.map(p => lang === "ka" ? p.ka : p.en).join(", ");
      message += lang === "ka" ? `\n\n✨ წესები: ${prefLabels}` : `\n\n✨ Preferences: ${prefLabels}`;
    }
    
    if (post.description?.trim()) {
      message += lang === "ka" 
        ? `\n\n💬 დამატებითი ინფორმაცია:\n${post.description.trim()}`
        : `\n\n💬 Additional info:\n${post.description.trim()}`;
    }
    
    return message;
  };

  const handleMessage = (e: React.MouseEvent, post: PassengerPost) => {
    e.preventDefault();
    e.stopPropagation();
    setPendingUserId(post.passenger.id);
    startTransition(async () => {
      const initialMessage = buildInitialMessage(post);
      const result = await startConversation({ 
        otherUserId: post.passenger.id,
        initialMessage,
        initialMessageFromOther: true, // Message appears from the passenger
      });
      if (result.success && result.conversationId) {
        router.push(`/users/messages/${result.conversationId}`);
      }
      setPendingUserId(null);
    });
  };

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Initial check
    updateScrollState();
    
    // Listen to scroll events
    el.addEventListener("scroll", updateScrollState);
    
    // Also listen to scrollend for when smooth scroll finishes
    el.addEventListener("scrollend", updateScrollState);
    
    // Listen to resize events
    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(el);
    
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      el.removeEventListener("scrollend", updateScrollState);
      resizeObserver.disconnect();
    };
  }, [updateScrollState]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    
    const cardWidth = 320 + 16; // card width + gap
    const currentScroll = el.scrollLeft;
    const maxScroll = el.scrollWidth - el.clientWidth;
    
    let newScroll: number;
    if (direction === "right") {
      newScroll = Math.min(currentScroll + cardWidth, maxScroll);
    } else {
      newScroll = Math.max(currentScroll - cardWidth, 0);
    }
    
    // Optimistically update state based on target position
    setCanScrollLeft(newScroll > 5);
    setCanScrollRight(newScroll + el.clientWidth < el.scrollWidth - 5);
    
    el.scrollTo({ left: newScroll, behavior: "smooth" });
    
    // Fallback: update state after scroll animation (for browsers without scrollend)
    setTimeout(updateScrollState, 350);
  };

  // Check if scrolling is possible at all
  const hasOverflow = posts.length > 0;

  return (
    <div className="relative isolate">
      {/* Scrolling container */}
      <div
        ref={scrollRef}
        className={`flex gap-4 py-4 px-[max(1rem,calc((100vw-1280px)/2+1rem))] overflow-x-auto scrollbar-hide scroll-smooth ${
          posts.length <= 3 ? "justify-center" : ""
        }`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex-shrink-0 w-[320px]"
            >
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-4 h-full flex flex-col">
              {/* User Info - Only this part is clickable */}
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100 dark:border-gray-800">
                <Link href={`/users/${post.passenger.id}`} className="relative hover:opacity-80 transition-opacity">
                  {post.passenger.profileImg ? (
                    <Image
                      src={post.passenger.profileImg}
                      alt={post.passenger.name}
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="size-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <User className="size-5 text-gray-400" />
                    </div>
                  )}
                  <span className="absolute -bottom-0.5 -right-0.5 size-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link href={`/users/${post.passenger.id}`} className="hover:underline">
                    <p className="font-medium text-gray-900 dark:text-gray-100 truncate">
                      {post.passenger.name}
                    </p>
                  </Link>
                  <p className="text-xs text-primary font-medium">
                    {lang === "ka" ? "მგზავრობას ეძებს" : "Looking for a ride"}
                  </p>
                </div>
              </div>

              {/* Route */}
              <div className="flex items-center gap-2 mb-3">
                <span className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                  {getPlaceName(post.from)}
                </span>
                <ArrowRight className="size-4 text-gray-400 flex-shrink-0" />
                <span className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                  {getPlaceName(post.to)}
                </span>
              </div>

              {/* Info */}
              <div className="flex flex-wrap gap-2 mb-3">
                <div className="inline-flex items-center gap-1 px-2 py-1 bg-gray-50 dark:bg-gray-800 rounded-md text-xs text-gray-600 dark:text-gray-300">
                  <Calendar className="size-3" />
                  <span>
                    {format(new Date(post.departureDateFrom), "d MMM", { locale })}
                    {post.departureDateFrom !== post.departureDateTo && (
                      <span className="text-gray-400"> - {format(new Date(post.departureDateTo), "d MMM", { locale })}</span>
                    )}
                  </span>
                </div>
                <div className="inline-flex items-center gap-1 px-2 py-1 bg-gray-50 dark:bg-gray-800 rounded-md text-xs text-gray-600 dark:text-gray-300">
                  <Clock className="size-3" />
                  <span>{TIME_SLOT_LABELS[post.preferredTimeSlot as keyof typeof TIME_SLOT_LABELS]?.[lang] || post.preferredTimeSlot}</span>
                </div>
                <div className="inline-flex items-center gap-1 px-2 py-1 bg-gray-50 dark:bg-gray-800 rounded-md text-xs text-gray-600 dark:text-gray-300">
                  <Users className="size-3" />
                  <span>{post.seatsNeeded}</span>
                </div>
              </div>

              {/* Preferences */}
              {post.preferences && post.preferences.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {post.preferences.slice(0, 3).map((pref) => {
                    const prefConfig = PASSENGER_PREFERENCES.find((p) => p.id === pref.id);
                    return (
                      <div
                        key={pref.id}
                        className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/5 dark:bg-primary/10 rounded-full text-[10px] text-primary font-medium"
                      >
                        {prefConfig && (
                          <span className="size-3 flex items-center justify-center [&>svg]:size-3">
                            {prefConfig.icon}
                          </span>
                        )}
                        <span className="truncate max-w-[80px]">{lang === "ka" ? pref.ka : pref.en}</span>
                      </div>
                    );
                  })}
                  {post.preferences.length > 3 && (
                    <span className="text-[10px] text-gray-400 px-1">
                      +{post.preferences.length - 3}
                    </span>
                  )}
                </div>
              )}

              {/* Message Button */}
              {currentUser && currentUser.id !== post.passenger.id && (
                <button
                  type="button"
                  onClick={(e) => handleMessage(e, post)}
                  disabled={isPending && pendingUserId === post.passenger.id}
                  className="w-full mt-auto pt-3 flex items-center justify-center gap-2 px-3 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                >
                  <MessageCircle className="size-4" />
                  {isPending && pendingUserId === post.passenger.id
                    ? (lang === "ka" ? "იტვირთება..." : "Loading...")
                    : (lang === "ka" ? "მიწერე" : "Message")}
                </button>
              )}
            </div>
          </div>
          ))}
      </div>

      {/* Left scroll button - placed after scroll container to be on top */}
      {hasOverflow && canScrollLeft && (
        <div className="absolute left-2 top-0 bottom-0 flex items-center pointer-events-none">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="size-10 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 pointer-events-auto"
            aria-label="Scroll left"
          >
            <ChevronRight className="size-5 rotate-180" />
          </button>
        </div>
      )}

      {/* Right scroll button */}
      {hasOverflow && canScrollRight && (
        <div className="absolute right-2 top-0 bottom-0 flex items-center pointer-events-none">
          <button
            type="button"
            onClick={() => scroll("right")}
            className="size-10 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 pointer-events-auto"
            aria-label="Scroll right"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      )}

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
