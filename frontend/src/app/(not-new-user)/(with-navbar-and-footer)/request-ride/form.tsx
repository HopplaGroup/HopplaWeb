"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Autocomplete } from "@/components/ui/autocomplete";
import PLACES from "@/lib/constants/places";
import { languageTag } from "@/paraglide/runtime";
import { DatePicker } from "@/components/ui/date-picker";
import { useCreatePassengerTripRequest } from "@/lib/hooks";
import { revalidateHomePage } from "./actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { PASSENGER_PREFERENCES } from "@/lib/constants/passenger-preferences";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Minus, Plus, Circle, MapPin, Clock } from "lucide-react";
import * as m from '@/paraglide/messages.js';

const FormSchema = z.object({
  from: z.string().min(1, "Please select a pickup location"),
  to: z.string().min(1, "Please select a destination"),
  departureDateFrom: z.date({ required_error: "Please select a start date" }),
  departureDateTo: z.date({ required_error: "Please select an end date" }),
  preferredTimeSlot: z.enum(["MORNING", "AFTERNOON", "EVENING", "NIGHT", "ANY"]),
  seatsNeeded: z.number().min(1).default(1),
  description: z.string().max(500).optional(),
  preferenceIds: z.array(z.string()).optional(),
});

// Helper to get next day of week
function getNextDayOfWeek(date: Date, dayOfWeek: number): Date {
  const result = new Date(date);
  result.setDate(date.getDate() + ((dayOfWeek + 7 - date.getDay()) % 7 || 7));
  return result;
}

// Date presets
const today = new Date();
today.setHours(0, 0, 0, 0);

const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

const thisWeekend = getNextDayOfWeek(today, 6); // Saturday
const thisWeekendEnd = new Date(thisWeekend);
thisWeekendEnd.setDate(thisWeekend.getDate() + 1); // Sunday

const nextWeekStart = new Date(today);
nextWeekStart.setDate(today.getDate() + (7 - today.getDay() + 1)); // Next Monday

const nextWeekEnd = new Date(nextWeekStart);
nextWeekEnd.setDate(nextWeekStart.getDate() + 6); // Next Sunday

const DATE_PRESETS = [
  { en: "Today", ka: "დღეს", from: today, to: today },
  { en: "Tomorrow", ka: "ხვალ", from: tomorrow, to: tomorrow },
  { en: "This weekend", ka: "ამ შაბათ-კვირას", from: thisWeekend, to: thisWeekendEnd },
  { en: "Next week", ka: "მომავალ კვირას", from: nextWeekStart, to: nextWeekEnd },
];

const TIME_SLOTS = [
  { value: "ANY", en: "Flexible / Any time", ka: "მოქნილი / ნებისმიერ დროს" },
  { value: "MORNING", en: "Morning · 6:00 – 12:00", ka: "დილა · 6:00 – 12:00" },
  { value: "AFTERNOON", en: "Afternoon · 12:00 – 17:00", ka: "შუადღე · 12:00 – 17:00" },
  { value: "EVENING", en: "Evening · 17:00 – 21:00", ka: "საღამო · 17:00 – 21:00" },
  { value: "NIGHT", en: "Night · 21:00 – 6:00", ka: "ღამე · 21:00 – 6:00" },
] as const;

export function PassengerTripRequestForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      preferredTimeSlot: "ANY",
      seatsNeeded: 1,
      preferenceIds: [],
    },
  });

  const { mutate, isPending } = useCreatePassengerTripRequest();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  async function onSubmit(input: z.infer<typeof FormSchema>) {
    const selectedPreferences = PASSENGER_PREFERENCES.filter((p) =>
      input.preferenceIds?.includes(p.id)
    ).map(({ id, en, ka }) => ({ id, en, ka }));

    mutate(
      {
        data: {
          from: input.from,
          to: input.to,
          departureDateFrom: input.departureDateFrom,
          departureDateTo: input.departureDateTo,
          preferredTimeSlot: input.preferredTimeSlot,
          seatsNeeded: input.seatsNeeded,
          description: input.description,
          preferences: selectedPreferences,
        },
      },
      {
        async onSuccess() {
          await revalidateHomePage();
          toast.success(m.noisy_vivid_mule_amuse());
          setIsRedirecting(true);
          router.push("/profile/my-posts");
        },
        onError() {
          toast.error(m.trick_trick_capybara_pause());
        },
      }
    );
  }

  const isLoading = isPending || isRedirecting;

  const togglePreference = (id: string) => {
    const current = form.getValues("preferenceIds") || [];
    if (current.includes(id)) {
      form.setValue(
        "preferenceIds",
        current.filter((p) => p !== id)
      );
    } else {
      form.setValue("preferenceIds", [...current, id]);
    }
  };

  const seatsValue = form.watch("seatsNeeded");
  const fromValue = form.watch("from");
  const toValue = form.watch("to");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Route Section */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4">
            {m.tough_real_worm_quiz()}
          </h2>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="from"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600 dark:text-gray-400">
                    {m.jumpy_tense_butterfly_reap()}
                  </FormLabel>
                  <FormControl>
                    <Autocomplete
                      items={PLACES.filter((p) => p.osm !== toValue)}
                      displayValue={(item) => item.name[languageTag()]}
                      onChange={(place) => field.onChange(place?.osm || "")}
                      getKey={(item) => item.osm}
                      filterItems={(items, query) =>
                        items.filter(
                          (item) =>
                            item.name.en
                              .toLowerCase()
                              .startsWith(query.toLowerCase()) ||
                            item.name.ka
                              .toLowerCase()
                              .startsWith(query.toLowerCase())
                        )
                      }
                      placeholder={m.arable_teal_platypus_earn()}
                      startIcon={<Circle className="size-4 text-gray-400" />}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="to"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600 dark:text-gray-400">
                    {m.quick_dizzy_lion_enrich()}
                  </FormLabel>
                  <FormControl>
                    <Autocomplete
                      items={PLACES.filter((p) => p.osm !== fromValue)}
                      displayValue={(item) => item.name[languageTag()]}
                      onChange={(place) => field.onChange(place?.osm || "")}
                      getKey={(item) => item.osm}
                      filterItems={(items, query) =>
                        items.filter(
                          (item) =>
                            item.name.en
                              .toLowerCase()
                              .startsWith(query.toLowerCase()) ||
                            item.name.ka
                              .toLowerCase()
                              .startsWith(query.toLowerCase())
                        )
                      }
                      placeholder={m.every_spry_alligator_borrow()}
                      startIcon={<MapPin className="size-4 text-gray-400" />}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Date & Time Section */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4">
            {m.fine_keen_oryx_taste()}
          </h2>

          {/* Quick date presets */}
          <div className="flex flex-wrap gap-2 mb-4">
            {DATE_PRESETS.map((preset) => {
              const isSelected =
                form.watch("departureDateFrom")?.toDateString() ===
                  preset.from.toDateString() &&
                form.watch("departureDateTo")?.toDateString() ===
                  preset.to.toDateString();
              return (
                <button
                  key={preset.en}
                  type="button"
                  onClick={() => {
                    form.setValue("departureDateFrom", preset.from);
                    form.setValue("departureDateTo", preset.to);
                  }}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm transition-all",
                    isSelected
                      ? "bg-primary text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  )}
                >
                  {languageTag() === "ka" ? preset.ka : preset.en}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <FormField
              control={form.control}
              name="departureDateFrom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600 dark:text-gray-400">
                    {m.muddy_weary_fox_type()}
                  </FormLabel>
                  <FormControl>
                    <DatePicker
                      value={field.value}
                      onChange={(date) => {
                        field.onChange(date);
                        // If "to" date is before new "from" date, update it
                        const toDate = form.getValues("departureDateTo");
                        if (date && (!toDate || toDate < date)) {
                          form.setValue("departureDateTo", date);
                        }
                      }}
                      placeholder={m.equal_hour_earthworm_aid()}
                      startDate={new Date()}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="departureDateTo"
              render={({ field }) => {
                const fromDate = form.watch("departureDateFrom");
                return (
                  <FormItem>
                    <FormLabel className="text-gray-600 dark:text-gray-400">
                      {m.hour_weary_slug_wish()}
                    </FormLabel>
                    <FormControl>
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                        placeholder={fromDate ? m.smug_just_toad_hurl() : m.even_slow_macaw_hush()}
                        startDate={fromDate || new Date()}
                        disabled={!fromDate}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>

          <FormField
            control={form.control}
            name="preferredTimeSlot"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-600 dark:text-gray-400">
                  {m.warm_next_herring_boil()}
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <div className="flex items-center gap-2">
                        <Clock className="size-4 text-gray-400" />
                        <SelectValue placeholder={m.merry_early_niklas_emerge()} />
                      </div>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {TIME_SLOTS.map((slot) => (
                      <SelectItem key={slot.value} value={slot.value}>
                        {languageTag() === "ka" ? slot.ka : slot.en}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Passengers Section */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {m.seemly_active_pug_drip()}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                {m.basic_brief_bulldog_dine()}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  form.setValue("seatsNeeded", Math.max(1, seatsValue - 1))
                }
                disabled={seatsValue <= 1}
                className={cn(
                  "size-10 rounded-full border flex items-center justify-center transition-colors",
                  seatsValue <= 1
                    ? "border-gray-200 text-gray-300 cursor-not-allowed"
                    : "border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-gray-800"
                )}
              >
                <Minus className="size-4" />
              </button>
              <span className="w-8 text-center text-lg font-medium text-gray-900 dark:text-gray-100">
                {seatsValue}
              </span>
              <button
                type="button"
                onClick={() => form.setValue("seatsNeeded", seatsValue + 1)}
                className="size-10 rounded-full border border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50 flex items-center justify-center transition-colors dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-gray-800"
              >
                <Plus className="size-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
            {m.sour_blue_kitten_offer()}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {m.tidy_bright_myna_adapt()}
          </p>
          <div className="flex flex-wrap gap-2">
            {PASSENGER_PREFERENCES.map((pref) => {
              const isSelected = form.watch("preferenceIds")?.includes(pref.id);
              return (
                <button
                  key={pref.id}
                  type="button"
                  onClick={() => togglePreference(pref.id)}
                  className={cn(
                    "inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all",
                    isSelected
                      ? "bg-primary text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  )}
                >
                  <span className="size-4 flex items-center justify-center">
                    {pref.icon}
                  </span>
                  <span>{languageTag() === "ka" ? pref.ka : pref.en}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Description Section */}
        <div className="p-6">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {m.yummy_loose_sloth_surge()}
                  <span className="font-normal text-gray-500 dark:text-gray-400 ml-1">
                    ({m.zippy_ornate_liger_yell()})
                  </span>
                </FormLabel>
                <FormControl>
                  <textarea
                    placeholder={m.patchy_honest_anteater_urge()}
                    rows={3}
                    className={cn(
                      "w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700",
                      "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100",
                      "placeholder:text-gray-400 dark:placeholder:text-gray-500",
                      "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
                      "resize-none text-sm"
                    )}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full mt-6 h-12"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 mr-2 animate-spin" />
                {m.main_zesty_jackal_charm()}
              </>
            ) : (
              m.key_careful_pelican_laugh()
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
