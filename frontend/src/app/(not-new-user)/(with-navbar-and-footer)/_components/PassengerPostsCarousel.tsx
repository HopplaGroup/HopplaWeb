"use client";

import { languageTag } from "@/paraglide/runtime";
import PLACES from "@/lib/constants/places";
import { PASSENGER_PREFERENCES } from "@/lib/constants/passenger-preferences";
import { format } from "date-fns";
import { ka, enUS } from "date-fns/locale";
import { Calendar, Clock, Users, ArrowRight, User, ChevronRight, MessageCircle, MapPin } from "lucide-react";
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
    
    const cardWidth = 340 + 16; // card width + gap
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
              className="flex-shrink-0 w-[340px]"
            >
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-200 group h-full flex flex-col shadow-sm hover:shadow-md">
              <div className="p-4 flex flex-col flex-1">
                {/* Top Section - Route on Left, Date/Passengers on Right */}
                <div className="flex items-start justify-between mb-3">
                  {/* Route Section - Top Left */}
                  <div className="flex-1 pr-2">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-8 h-5 bg-gray-100 dark:bg-gray-800 rounded-lg">
                          <MapPin className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                        </div>
                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm truncate">
                            {getPlaceName(post.from)}
                          </h3>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 ml-3.5">
                        <div className="w-px h-2.5 bg-gray-300 dark:bg-gray-600"></div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-8 h-5 bg-gray-100 dark:bg-gray-800 rounded-lg">
                          <MapPin className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                        </div>
                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm truncate">
                            {getPlaceName(post.to)}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Date and Passengers - Top Right */}
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-primary/10 rounded-lg border border-primary/20">
                      <span className="text-sm font-medium text-primary whitespace-nowrap">
                        {format(new Date(post.departureDateFrom), "d MMM", { locale })}
                        {post.departureDateFrom !== post.departureDateTo && (
                          <span className="text-primary/70"> - {format(new Date(post.departureDateTo), "d MMM", { locale })}</span>
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                      <Users className="h-3.5 w-3.5 text-gray-600 dark:text-gray-400" />
                      <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                        {post.seatsNeeded}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Time Slot Badge */}
                <div className="mb-3">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <Clock className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {TIME_SLOT_LABELS[post.preferredTimeSlot as keyof typeof TIME_SLOT_LABELS]?.[lang] || post.preferredTimeSlot}
                    </span>
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
                          className="flex items-center justify-center w-7 h-7 bg-gray-100 dark:bg-gray-800 rounded-lg group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700"
                        >
                          {prefConfig && (
                            <span className="w-3.5 h-3.5 flex items-center justify-center text-gray-600 dark:text-gray-400">
                              {prefConfig.icon}
                            </span>
                          )}
                        </div>
                      );
                    })}
                    {post.preferences.length > 3 && (
                      <div className="flex items-center justify-center w-7 h-7 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          +{post.preferences.length - 3}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Passenger Info Section */}
                <div className="border-t border-gray-200 dark:border-gray-800 pt-3 mt-auto">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <Link href={`/users/${post.passenger.id}`} className="relative hover:opacity-80 transition-opacity">
                        {post.passenger.profileImg ? (
                          <Image
                            src={post.passenger.profileImg}
                            alt={post.passenger.name}
                            width={36}
                            height={36}
                            className="rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                          />
                        ) : (
                          <div className="size-9 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center border-2 border-gray-200 dark:border-gray-700">
                            <User className="size-4 text-gray-400" />
                          </div>
                        )}
                        <span className="absolute -bottom-0.5 -right-0.5 size-2.5 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
                      </Link>
                      <div>
                        <Link href={`/users/${post.passenger.id}`} className="hover:underline">
                          <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                            {post.passenger.name.split(' ')[0]}
                          </p>
                        </Link>
                        <p className="text-xs text-primary font-medium">
                          {lang === "ka" ? "მგზავრობას ეძებს" : "Looking for a ride"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message Button */}
                {!currentUser ? (
                  <button
                    type="button"
                    disabled
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg text-sm font-semibold cursor-not-allowed"
                  >
                    <MessageCircle className="size-4" />
                    {lang === "ka" ? "შედით სისტემაში" : "Login to message"}
                  </button>
                ) : currentUser.id === post.passenger.id ? (
                  <button
                    type="button"
                    disabled
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg text-sm font-semibold cursor-not-allowed"
                  >
                    {lang === "ka" ? "თქვენი პოსტი" : "Your post"}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => handleMessage(e, post)}
                    disabled={isPending && pendingUserId === post.passenger.id}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 shadow-sm hover:shadow-md"
                  >
                    <MessageCircle className="size-4" />
                    {isPending && pendingUserId === post.passenger.id
                      ? (lang === "ka" ? "იტვირთება..." : "Loading...")
                      : (lang === "ka" ? "მიწერე" : "Message")}
                  </button>
                )}
              </div>
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
