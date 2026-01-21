"use client";

import { useFindManyPassengerTripRequest, useUpdatePassengerTripRequest } from "@/lib/hooks";
import { languageTag } from "@/paraglide/runtime";
import PLACES from "@/lib/constants/places";
import { PASSENGER_PREFERENCES } from "@/lib/constants/passenger-preferences";
import { format } from "date-fns";
import { ka, enUS } from "date-fns/locale";
import { 
  Loader2,
  Plus,
  AlertTriangle,
  Users,
  Calendar,
  Clock,
  Trash2
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { useUser } from "@/lib/providers/UserProvider";

const TIME_SLOT_LABELS = {
  ANY: { en: "Any time", ka: "ნებისმიერი" },
  MORNING: { en: "Morning", ka: "დილა" },
  AFTERNOON: { en: "Afternoon", ka: "შუადღე" },
  EVENING: { en: "Evening", ka: "საღამო" },
  NIGHT: { en: "Night", ka: "ღამე" },
} as const;

const STATUS_CONFIG = {
  ACTIVE: {
    label: { en: "Active", ka: "აქტიური" },
    bgColor: "bg-emerald-500",
    textColor: "text-white",
    cardBorder: "border-l-emerald-500",
  },
  CANCELLED: {
    label: { en: "Cancelled", ka: "გაუქმებული" },
    bgColor: "bg-gray-400",
    textColor: "text-white",
    cardBorder: "border-l-gray-400",
  },
  FULFILLED: {
    label: { en: "Fulfilled", ka: "შესრულებული" },
    bgColor: "bg-blue-500",
    textColor: "text-white",
    cardBorder: "border-l-blue-500",
  },
};

export default function MyPostsPage() {
  const lang = languageTag();
  const locale = lang === "ka" ? ka : enUS;
  const { user } = useUser();

  const { data: posts, isLoading, refetch } = useFindManyPassengerTripRequest({
    where: {
      passengerId: user?.id,
    },
    orderBy: { createdAt: "desc" },
    include: { passenger: true },
  });

  const { mutate: updatePost } = useUpdatePassengerTripRequest();
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [postToCancel, setPostToCancel] = useState<string | null>(null);

  const handleCancelConfirm = () => {
    if (!postToCancel) return;
    
    setCancellingId(postToCancel);
    setPostToCancel(null);
    
    updatePost(
      {
        where: { id: postToCancel },
        data: { status: "CANCELLED" },
      },
      {
        onSuccess: () => {
          toast.success(lang === "ka" ? "პოსტი გაუქმდა" : "Post cancelled");
          refetch();
          setCancellingId(null);
        },
        onError: () => {
          toast.error(lang === "ka" ? "შეცდომა" : "Error cancelling post");
          setCancellingId(null);
        },
      }
    );
  };

  const getPlaceName = (osm: string) => {
    const place = PLACES.find((p) => p.osm === osm);
    return place ? place.name[lang] : osm;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {lang === "ka" ? "ჩემი პოსტები" : "My Posts"}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {lang === "ka" ? "თქვენი მგზავრის მოთხოვნები" : "Your passenger requests"}
          </p>
        </div>
        <Link href="/request-ride">
          <Button className="gap-2 rounded-full bg-primary hover:bg-primary/90">
            <Plus className="size-4" />
            {lang === "ka" ? "ახალი პოსტი" : "New Post"}
          </Button>
        </Link>
      </div>

      {/* Posts List - Grid on desktop, single column on mobile */}
      {posts && posts.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {posts.map((post) => {
            const statusConfig = STATUS_CONFIG[post.status as keyof typeof STATUS_CONFIG];
            const isCancelling = cancellingId === post.id;
            const isActive = post.status === "ACTIVE";

            return (
              <div
                key={post.id}
                className={cn(
                  "relative bg-white dark:bg-gray-800/80 rounded-xl overflow-hidden border-l-4 shadow-sm hover:shadow-md transition-shadow",
                  statusConfig.cardBorder,
                  !isActive && "opacity-60"
                )}
              >
                {/* Status Badge - Only for non-active */}
                {!isActive && (
                  <div className={cn(
                    "absolute top-0 right-0 px-2.5 py-1 text-[10px] font-bold uppercase rounded-bl-lg",
                    statusConfig.bgColor,
                    statusConfig.textColor
                  )}>
                    {statusConfig.label[lang]}
                  </div>
                )}

                <div className="p-4">
                  {/* Main Content */}
                  <div className="flex gap-3">
                    {/* Left: Date Column */}
                    <div className="flex flex-col items-center justify-center min-w-[56px]">
                      {post.departureDateFrom === post.departureDateTo ? (
                        <>
                          <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                            {format(new Date(post.departureDateFrom), "d", { locale })}
                          </div>
                          <div className="text-xs text-gray-500">
                            {format(new Date(post.departureDateFrom), "MMM", { locale })}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="text-center">
                            <div className="text-sm font-bold text-gray-900 dark:text-gray-100">
                              {format(new Date(post.departureDateFrom), "d", { locale })}
                              <span className="text-gray-400 mx-0.5">-</span>
                              {format(new Date(post.departureDateTo), "d", { locale })}
                            </div>
                            <div className="text-xs text-gray-500">
                              {format(new Date(post.departureDateFrom), "MMM", { locale }) === format(new Date(post.departureDateTo), "MMM", { locale }) 
                                ? format(new Date(post.departureDateFrom), "MMM", { locale })
                                : `${format(new Date(post.departureDateFrom), "MMM", { locale })}-${format(new Date(post.departureDateTo), "MMM", { locale })}`
                              }
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Divider */}
                    <div className="w-px bg-gray-200 dark:bg-gray-700 self-stretch" />

                    {/* Middle: Route */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2.5">
                        {/* Route Line */}
                        <div className="flex flex-col items-center pt-1.5 flex-shrink-0">
                          <div className="w-2.5 h-2.5 rounded-full border-2 border-red-400 bg-white dark:bg-gray-800" />
                          <div className="w-0.5 h-7 bg-gradient-to-b from-red-300 to-red-500 dark:from-red-400 dark:to-red-600" />
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                        </div>

                        {/* Cities */}
                        <div className="flex-1 min-w-0 space-y-2">
                          <div>
                            <div className="text-[10px] text-gray-400 uppercase tracking-wider">
                              {lang === "ka" ? "საიდან" : "FROM"}
                            </div>
                            <div className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                              {getPlaceName(post.from)}
                            </div>
                          </div>
                          <div>
                            <div className="text-[10px] text-gray-400 uppercase tracking-wider">
                              {lang === "ka" ? "სად" : "TO"}
                            </div>
                            <div className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                              {getPlaceName(post.to)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right: Seats */}
                    <div className="flex flex-col items-end justify-center">
                      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                        <span className="text-lg font-bold">{post.seatsNeeded}</span>
                        <Users className="size-4 text-gray-400" />
                      </div>
                      <div className="text-[10px] text-gray-400">
                        {lang === "ka" ? "ადგილი" : "seats"}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Row: Meta Info & Actions */}
                  <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700/50 flex items-center gap-2 flex-wrap">
                    {/* Time Slot */}
                    <div className="inline-flex items-center gap-1 text-[11px] px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-gray-600 dark:text-gray-300">
                      <Clock className="size-3" />
                      {TIME_SLOT_LABELS[post.preferredTimeSlot as keyof typeof TIME_SLOT_LABELS][lang]}
                    </div>

                    {/* Preferences Icons */}
                    {post.preferences && Array.isArray(post.preferences) && post.preferences.length > 0 && (
                      <div className="flex items-center gap-1">
                        {(post.preferences as Array<{ id: string; en: string; ka: string }>).slice(0, 3).map((pref) => {
                          const prefConfig = PASSENGER_PREFERENCES.find((p) => p.id === pref.id);
                          return prefConfig ? (
                            <div
                              key={pref.id}
                              className="size-6 flex items-center justify-center bg-primary/10 dark:bg-primary/20 rounded-md text-primary"
                              title={lang === "ka" ? pref.ka : pref.en}
                            >
                              <span className="[&>svg]:size-3.5">
                                {prefConfig.icon}
                              </span>
                            </div>
                          ) : null;
                        })}
                        {(post.preferences as Array<{ id: string }>).length > 3 && (
                          <div className="text-[10px] text-gray-400">
                            +{(post.preferences as Array<{ id: string }>).length - 3}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Spacer */}
                    <div className="flex-1" />

                    {/* Cancel Button */}
                    {isActive && (
                      <button
                        type="button"
                        onClick={() => setPostToCancel(post.id)}
                        disabled={isCancelling}
                        className="inline-flex items-center gap-1 text-[11px] text-red-500 hover:text-red-600 font-medium disabled:opacity-50 px-2 py-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                      >
                        {isCancelling ? (
                          <>
                            <Loader2 className="size-3 animate-spin" />
                            <span className="hidden sm:inline">{lang === "ka" ? "უქმდება..." : "Cancelling..."}</span>
                          </>
                        ) : (
                          <>
                            <Trash2 className="size-3" />
                            <span>{lang === "ka" ? "გაუქმება" : "Cancel"}</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {/* Description if exists */}
                  {post.description && (
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 line-clamp-1 italic">
                      &ldquo;{post.description}&rdquo;
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
          <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center mx-auto mb-5">
            <Calendar className="size-9 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {lang === "ka" ? "პოსტები არ გაქვთ" : "No posts yet"}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
            {lang === "ka" 
              ? "შექმენით პოსტი და მძღოლები თავად გიპოვიან" 
              : "Create a post and let drivers find you"}
          </p>
          <Link href="/request-ride">
            <Button className="gap-2 rounded-full">
              <Plus className="size-4" />
              {lang === "ka" ? "პოსტის შექმნა" : "Create Post"}
            </Button>
          </Link>
        </div>
      )}

      {/* Cancel Confirmation Dialog */}
      <AlertDialog open={!!postToCancel} onOpenChange={(open) => !open && setPostToCancel(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="size-5 text-red-600 dark:text-red-400" />
              </div>
              <AlertDialogTitle>
                {lang === "ka" ? "პოსტის გაუქმება" : "Cancel Post"}
              </AlertDialogTitle>
            </div>
            <AlertDialogDescription className="pt-2">
              {lang === "ka" 
                ? "დარწმუნებული ხართ, რომ გსურთ ამ პოსტის გაუქმება? ეს მოქმედება ვერ გაუქმდება." 
                : "Are you sure you want to cancel this post? This action cannot be undone."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {lang === "ka" ? "არა, დაბრუნება" : "No, go back"}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelConfirm}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {lang === "ka" ? "დიახ, გაუქმება" : "Yes, cancel it"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
