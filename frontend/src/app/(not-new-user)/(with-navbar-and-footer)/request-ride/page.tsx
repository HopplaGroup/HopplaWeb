import { getUser } from "@/lib/utils/auth";
import { redirect } from "next/navigation";
import { PassengerTripRequestForm } from "./form";
import { Bell } from "lucide-react";
import * as m from '@/paraglide/messages.js';
export default async function RequestRidePage() {
  const user = await getUser();
  if (!user) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute top-20 right-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        </div>

        <div className="container max-w-2xl py-10 md:py-16 px-4">
          {/* Header */}
          <div className="text-center mb-10 md:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Bell className="size-4" />
              <span>{m.long_calm_cougar_enrich()}</span>
            </div> 
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-50 tracking-tight">
              {m.dry_every_lark_adore()}
            </h1>
            <p className="mt-3 text-gray-600 dark:text-gray-400 text-base md:text-lg max-w-xl mx-auto">
              {m.cuddly_broad_raven_loop()}
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-200 dark:border-gray-800">
            <PassengerTripRequestForm />
          </div>
        </div>
      </div>
    </div>
  );
}
