"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useMask } from "@react-input/mask";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { NumericFormat } from "react-number-format";
import ReactSelect from "react-select";

import * as m from "@/paraglide/messages.js";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Car, Rule, User } from "@prisma/client";
import { getDirections } from "./actions";
import { Autocomplete } from "@/components/ui/autocomplete";
import { Circle, MapPin } from "lucide-react";
import PLACES from "@/lib/constants/places";
import { languageTag } from "@/paraglide/runtime";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { RideCreateSchema } from "@zenstackhq/runtime/zod/models";

import { useCreateRide } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { revalidateHomePage } from "./actions";
import { cn } from "@/lib/utils/cn";

const FormSchema = RideCreateSchema.extend({
    ruleIds: z.array(z.string()).optional(),
});

const FuelPricePerLitre = 2.5;
const FuelConsumptionPerKm = 0.1;

const getPriceByDistance = (distance: number) => {
    return Number(
        (
            FuelPricePerLitre *
            (distance / 1000) *
            FuelConsumptionPerKm
        ).toFixed(2)
    );
};

export function CreateRideForm({
    user,
    cars,
    rules,
}: {
    user: User;
    cars: Car[];
    rules: Rule[];
}) {
    const [selectedCar, setSelectedCar] = useState<Car | null>(null);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            distance: 0,
            duration: 0,
        },
    });

    const [bestPriceValue, setBestPriceValue] = useState<number | null>(null);
    const { mutate, isPending } = useCreateRide();
    const router = useRouter();

    async function onSubmit(input: z.infer<typeof FormSchema>) {
        mutate(
            {
                data: {
                    availableSeats: input.availableSeats,
                    price: input.price,
                    from: input.from,
                    to: input.to,
                    departure: input.departure,
                    duration: input.duration,
                    distance: input.distance,
                    carId: input.carId,
                    rideRules: {
                        create: input.ruleIds
                            ? input.ruleIds.map((id) => ({
                                  ruleId: id,
                              }))
                            : undefined,
                    },
                },
            },
            {
                async onSuccess(data) {
                    await revalidateHomePage();
                    toast.success(m.mellow_nimble_earthworm_coax());
                    if (data) {
                        router.push(`/rides/${data.id}`);
                    }
                },
            }
        );
    }

    // Watch form values properly outside of useEffect
    const fromValue = form.watch("from");
    const toValue = form.watch("to");

    useEffect(() => {
        if (!fromValue || !toValue) return;
        getDirections({ from: fromValue, to: toValue }).then((res) => {
            setBestPriceValue(
                res.success ? getPriceByDistance(res.data.distance) : 0
            );
            form.setValue("distance", res.success ? res.data.distance : 0);
            form.setValue("duration", res.success ? res.data.duration : 0);
        });
    }, [fromValue, toValue, form]);

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 text-left mx-auto mb-20"
            >
                <div className="grid grid-cols-2 gap-5">
                    <FormField
                        control={form.control}
                        name="from"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    {m.bald_wild_rabbit_fall()}
                                </FormLabel>
                                <FormControl>
                                    <Autocomplete
                                        // startContent={<Circle size={18} />}
                                        items={PLACES}
                                        displayValue={(item) =>
                                            item.name[languageTag()]
                                        }
                                        onChange={(place) =>
                                            field.onChange(place?.osm || "")
                                        }
                                        getKey={(item) => item.osm}
                                        // showMax={10}
                                        filterItems={(items, query) =>
                                            items.filter(
                                                (item) =>
                                                    item.name.en
                                                        .toLowerCase()
                                                        .startsWith(
                                                            query.toLowerCase()
                                                        ) ||
                                                    item.name.ka
                                                        .toLowerCase()
                                                        .startsWith(
                                                            query.toLowerCase()
                                                        )
                                            )
                                        }
                                        placeholder={m.proof_lazy_wasp_rise()}
                                    />
                                </FormControl>
                                <FormDescription>
                                    {m.helpful_honest_swan_enjoy()}
                                </FormDescription>
                                <FormMessage
                                    errorMessage={m.chunky_weird_peacock_pick()}
                                />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="to"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    {m.teary_zesty_squirrel_bend()}
                                </FormLabel>
                                <FormControl>
                                    <Autocomplete
                                        // startContent={<MapPin size={18} />}
                                        items={PLACES}
                                        displayValue={(item) =>
                                            item.name[languageTag()]
                                        }
                                        onChange={(place) =>
                                            field.onChange(place?.osm || "")
                                        }
                                        getKey={(item) => item.osm}
                                        // showMax={10}
                                        filterItems={(items, query) =>
                                            items.filter(
                                                (item) =>
                                                    item.name.en
                                                        .toLowerCase()
                                                        .startsWith(
                                                            query.toLowerCase()
                                                        ) ||
                                                    item.name.ka
                                                        .toLowerCase()
                                                        .startsWith(
                                                            query.toLowerCase()
                                                        )
                                            )
                                        }
                                        placeholder={m.antsy_lucky_butterfly_fear()}
                                    />
                                </FormControl>
                                <FormDescription>
                                    {m.giant_born_jaguar_vent()}
                                </FormDescription>
                                <FormMessage
                                    errorMessage={m.tiny_trite_eel_bloom()}
                                />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="carId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                {m.shy_mellow_florian_strive()}
                            </FormLabel>
                            <FormControl>
                                <Select
                                    value={field.value}
                                    onValueChange={(v) => {
                                        setSelectedCar(
                                            cars.find((c) => c.id === v) || null
                                        );
                                        form.resetField("availableSeats");
                                        field.onChange(v);
                                    }}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue
                                            placeholder={m.honest_ideal_jan_bump()}
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {cars.map(({ id, name }) => (
                                                <SelectItem key={id} value={id}>
                                                    {name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormDescription>
                                {m.heroic_moving_firefox_jest()}
                            </FormDescription>
                            <FormMessage
                                errorMessage={m.just_clear_reindeer_gleam()}
                            />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="availableSeats"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                {m.mushy_home_cougar_embrace()}
                            </FormLabel>
                            <FormControl>
                                <Select
                                    key={selectedCar?.id}
                                    value={field.value?.toString()}
                                    onValueChange={(v) => {
                                        field.onChange(Number(v));
                                    }}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue
                                            placeholder={m.honest_ideal_jan_bump()}
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {Array.from(
                                                {
                                                    length:
                                                        selectedCar?.capacity ||
                                                        0,
                                                },
                                                (_, i) => i + 1
                                            ).map((o) => (
                                                <SelectItem
                                                    key={o}
                                                    value={o.toString()}
                                                >
                                                    {o}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormDescription>
                                {m.early_factual_shrike_revive()}
                            </FormDescription>
                            <FormMessage
                                errorMessage={m.trite_novel_sheep_intend()}
                            />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="departure"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{m.aqua_broad_bison_glow()}</FormLabel>
                            <FormControl>
                                <DatePicker
                                    startDate={new Date()}
                                    isHour
                                    placeholder={m.last_ornate_lion_dine()}
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                {m.many_strong_moose_enchant()}
                            </FormDescription>
                            <FormMessage
                                errorMessage={m.honest_chunky_butterfly_delight()}
                            />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{m.teal_game_hornet_slurp()}</FormLabel>
                            <FormControl>
                                <NumericFormat
                                    className={cn({
                                        "border-red-500 border-2":
                                            field.value >
                                            (bestPriceValue || 0) /
                                                (form.watch("availableSeats") ||
                                                    1),
                                    })}
                                    placeholder={m.weak_vivid_moth_flop()}
                                    decimalScale={2}
                                    customInput={Input}
                                    value={field.value}
                                    onValueChange={(v) => {
                                        const { floatValue } = v;
                                        // console.log(floatValue);
                                        // if (
                                        //   floatValue === undefined ||
                                        //   !(
                                        //     floatValue <= realPriceValue + PRICE_RANGE &&
                                        //     floatValue >= Math.max(0, realPriceValue - PRICE_RANGE)
                                        //   )
                                        // ) {
                                        //   setIsPriceValidated(false);
                                        // } else {
                                        //   setIsPriceValidated(true);
                                        // }
                                        field.onChange(Number(floatValue));
                                    }}
                                />
                            </FormControl>
                            <FormDescription>
                                {m.happy_patchy_frog_animate()}{" "}
                                {(
                                    (bestPriceValue || 0) /
                                    (form.watch("availableSeats") || 1)
                                ).toFixed(1)}{" "}
                                {m.flaky_wide_samuel_drum()}
                            </FormDescription>
                            <FormMessage
                                errorMessage={m.next_light_hyena_savor()}
                            />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="ruleIds"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                {m.super_agent_albatross_animate()}
                            </FormLabel>
                            <FormControl>
                                <ReactSelect
                                    isMulti
                                    name="rules"
                                    placeholder={m.ok_full_duck_edit()}
                                    options={rules.map((r) => ({
                                        value: r.id,
                                        label: (r.labels as any)[
                                            languageTag()
                                        ] as any,
                                    }))}
                                    className="basic-multi-select py-0"
                                    classNamePrefix="select"
                                    onChange={(v) => {
                                        // console.log(v);
                                        field.onChange(v.map((x) => x.value));
                                    }}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <Button disabled={isPending} type="submit">
                    {m.any_tasty_racoon_win()}
                </Button>
            </form>
        </Form>
    );
}
