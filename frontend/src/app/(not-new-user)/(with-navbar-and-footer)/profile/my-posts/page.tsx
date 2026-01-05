"use client";

import { useFindManyPassengerTripRequest, useUpdatePassengerTripRequest } from "@/lib/hooks";
import { useUser } from "@/lib/providers/UserProvider";
import { languageTag } from "@/paraglide/runtime";
import PLACES from "@/lib/constants/places";
import { PASSENGER_PREFERENCES } from "@/lib/constants/passenger-preferences";
import { format } from "date-fns";
import { ka, enUS } from "date-fns/locale";
import { 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle2,
  XCircle,
  Loader2,
  Bell,
  Plus,
  Circle,
  MapPin,
  AlertTriangle
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

const TIME_SLOT_LABELS = {
  ANY: { en: "Any time", ka: "ნებისმიერ დროს" },
  MORNING: { en: "Morning", ka: "დილა" },
  AFTERNOON: { en: "Afternoon", ka: "შუადღე" },
  EVENING: { en: "Evening", ka: "საღამო" },
  NIGHT: { en: "Night", ka: "ღამე" },
} as const;

const STATUS_CONFIG = {
  ACTIVE: {
    label: { en: "Active", ka: "აქტიური" },
    icon: CheckCircle2,
    dotColor: "bg-green-500",
    bgColor: "bg-green-50 dark:bg-green-950/30",
    textColor: "text-green-700 dark:text-green-400",
    borderColor: "border-green-200 dark:border-green-800/50",
  },
  CANCELLED: {
    label: { en: "Cancelled", ka: "გაუქმებული" },
    icon: XCircle,
    dotColor: "bg-red-500",
    bgColor: "bg-red-50 dark:bg-red-950/30",
    textColor: "text-red-700 dark:text-red-400",
    borderColor: "border-red-200 dark:border-red-800/50",
  },
  FULFILLED: {
    label: { en: "Fulfilled", ka: "შესრულებული" },
    icon: CheckCircle2,
    dotColor: "bg-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    textColor: "text-blue-700 dark:text-blue-400",
    borderColor: "border-blue-200 dark:border-blue-800/50",
  },
};

export default function MyPostsPage() {
  const lang = languageTag();
  const locale = lang === "ka" ? ka : enUS;
  const { user: currentUser } = useUser();

  const { data: posts, isLoading, refetch } = useFindManyPassengerTripRequest({
    where: {
      passengerId: currentUser?.id,
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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {lang === "ka" ? "ჩემი პოსტები" : "My Posts"}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {lang === "ka" 
              ? "თქვენი მგზავრის პოსტების მართვა" 
              : "Manage your passenger posts"}
          </p>
        </div>
        <Link href="/request-ride">
          <Button className="gap-2">
            <Plus className="size-4" />
            {lang === "ka" ? "ახალი პოსტი" : "New Post"}
          </Button>
        </Link>
      </div>

      {/* Posts List */}
      {posts && posts.length > 0 ? (
        <div className="space-y-4">
          {posts.map((post) => {
            const statusConfig = STATUS_CONFIG[post.status as keyof typeof STATUS_CONFIG];
            const isCancelling = cancellingId === post.id;
            const isActive = post.status === "ACTIVE";

            return (
              <div
                key={post.id}
                className={cn(
                  "group relative bg-white dark:bg-gray-900 rounded-2xl border overflow-hidden transition-all duration-200",
                  isActive 
                    ? "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-lg hover:shadow-gray-100 dark:hover:shadow-none" 
                    : "border-gray-100 dark:border-gray-800/50 opacity-70"
                )}
              >
                {/* Status Strip */}
                <div className={cn("h-1", statusConfig.dotColor)} />
                
                <div className="p-5">
                  {/* Top Row: Route & Status */}
                  <div className="flex items-start justify-between gap-4 mb-5">
                    {/* Route Visualization */}
                    <div className="flex items-start gap-3">
                      <div className="flex flex-col items-center pt-1">
                        <Circle className="size-3 text-gray-400 fill-white dark:fill-gray-900" strokeWidth={2.5} />
                        <div className="w-0.5 h-8 bg-gradient-to-b from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-500 my-1" />
                        <MapPin className="size-4 text-primary" />
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-0.5">
                            {lang === "ka" ? "საიდან" : "From"}
                          </p>
                          <p className="font-semibold text-gray-900 dark:text-gray-100">
                            {getPlaceName(post.from)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-0.5">
                            {lang === "ka" ? "სად" : "To"}
                          </p>
                          <p className="font-semibold text-gray-900 dark:text-gray-100">
                            {getPlaceName(post.to)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className={cn(
                      "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border",
                      statusConfig.bgColor,
                      statusConfig.textColor,
                      statusConfig.borderColor
                    )}>
                      <span className={cn("size-2 rounded-full", statusConfig.dotColor)} />
                      {statusConfig.label[lang]}
                    </div>
                  </div>

                  {/* Info Pills */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm text-gray-600 dark:text-gray-300">
                      <Calendar className="size-3.5 text-gray-400" />
                      <span className="font-medium">
                        {format(new Date(post.departureDateFrom), "d MMM", { locale })}
                        {post.departureDateFrom !== post.departureDateTo && (
                          <span className="text-gray-400"> → {format(new Date(post.departureDateTo), "d MMM", { locale })}</span>
                        )}
                      </span>
                    </div>
                    
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm text-gray-600 dark:text-gray-300">
                      <Clock className="size-3.5 text-gray-400" />
                      <span className="font-medium">
                        {TIME_SLOT_LABELS[post.preferredTimeSlot as keyof typeof TIME_SLOT_LABELS][lang]}
                      </span>
                    </div>
                    
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm text-gray-600 dark:text-gray-300">
                      <Users className="size-3.5 text-gray-400" />
                      <span className="font-medium">
                        {post.seatsNeeded} {lang === "ka" ? "ადგილი" : "seat(s)"}
                      </span>
                    </div>
                  </div>

                  {/* Preferences */}
                  {post.preferences && Array.isArray(post.preferences) && post.preferences.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(post.preferences as Array<{ id: string; en: string; ka: string }>).map((pref) => {
                        const prefConfig = PASSENGER_PREFERENCES.find((p) => p.id === pref.id);
                        return (
                          <div
                            key={pref.id}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary/5 dark:bg-primary/10 rounded-full text-xs text-primary dark:text-primary-400 font-medium"
                          >
                            {prefConfig && (
                              <span className="size-3.5 flex items-center justify-center [&>svg]:size-3.5">
                                {prefConfig.icon}
                              </span>
                            )}
                            <span>{lang === "ka" ? pref.ka : pref.en}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Description */}
                  {post.description && (
                    <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700/50">
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        &ldquo;{post.description}&rdquo;
                      </p>
                    </div>
                  )} 

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {lang === "ka" ? "შექმნილია" : "Posted"} {format(new Date(post.createdAt), "d MMM, HH:mm", { locale })}
                    </p>
                    
                    {isActive && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setPostToCancel(post.id)}
                        disabled={isCancelling}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 -mr-2"
                      >
                        {isCancelling ? (
                          <>
                            <Loader2 className="size-4 mr-1.5 animate-spin" />
                            {lang === "ka" ? "უქმდება..." : "Cancelling..."}
                          </>
                        ) : (
                          <>
                            <XCircle className="size-4 mr-1.5" />
                            {lang === "ka" ? "გაუქმება" : "Cancel"}
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="relative overflow-hidden text-center py-16 px-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5 rotate-3">
              <Bell className="size-10 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {lang === "ka" ? "პოსტები არ გაქვთ" : "No posts yet"}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm mx-auto">
              {lang === "ka" 
                ? "შექმენით პოსტი და მძღოლები თავად გიპოვიან" 
                : "Create a post and let drivers find you"}
            </p>
            <Link href="/request-ride">
              <Button size="lg" className="gap-2 rounded-xl">
                <Plus className="size-5" />
                {lang === "ka" ? "პოსტის შექმნა" : "Create Post"}
              </Button>
            </Link>
          </div>
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
