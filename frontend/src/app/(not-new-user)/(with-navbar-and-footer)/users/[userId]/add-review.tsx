"use client";
import { Plus } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { Rating } from "react-simple-star-rating";
import { useCreateUserReview } from "@/lib/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as m from "@/paraglide/messages.js";

import { z } from "zod";
import { UserReviewCreateSchema } from "@zenstackhq/runtime/zod/models";
import { useUser } from "@/lib/providers/UserProvider";

export default function AddReview({ revieweeId }: { revieweeId: string }) {
    const { mutate, isPending } = useCreateUserReview({
        optimisticUpdate: true,
    });
    const [open, setOpen] = useState(false);
    const { user: loggedUser } = useUser();
    const form = useForm<z.infer<typeof UserReviewCreateSchema>>({
        resolver: zodResolver(UserReviewCreateSchema),
        defaultValues: {
            revieweeId,
        },
    });

    function onSubmit(values: z.infer<typeof UserReviewCreateSchema>) {
        form.reset();
        setOpen(false);
        mutate({
            data: {
                rating: values.rating,
                comment: values.comment,
                revieweeId: values.revieweeId,
                authorId: loggedUser?.id,
            },
        });
    }

    return (
        <>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger className="w-full">
                    <div className="mt-4 bg-white shadow-sm rounded-lg p-5">
                        <div className="flex items-center justify-center gap-2 font-medium">
                            <Plus size={22} /> {m.day_blue_piranha_strive()}
                        </div>
                    </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    {m.grand_every_panther_love()}
                                </AlertDialogTitle>
                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="rating"
                                        render={({ field }) => (
                                            <FormItem>
                                                {/* <FormLabel>Rating</FormLabel> */}
                                                <FormControl>
                                                    <div>
                                                        <Rating
                                                            allowFraction
                                                            initialValue={
                                                                field.value
                                                            }
                                                            onClick={(v) =>
                                                                field.onChange(
                                                                    v
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </FormControl>
                                                {/* <FormDescription>This is the rating .</FormDescription> */}
                                                <FormMessage
                                                    errorMessage={m.weak_noble_donkey_nourish()}
                                                />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="comment"
                                        render={({ field }) => (
                                            <FormItem>
                                                {/* <FormLabel>Comment</FormLabel> */}
                                                <FormControl>
                                                    <Input
                                                        placeholder={m.trite_mad_warthog_dare()}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                {/* <FormDescription>This is the comment .</FormDescription> */}
                                                <FormMessage
                                                    errorMessage={m.lucky_solid_gopher_adore()}
                                                />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>
                                    {m.clean_nice_bumblebee_radiate()}
                                </AlertDialogCancel>
                                <Button type="submit">
                                    {m.mean_next_camel_peel()}
                                </Button>
                            </AlertDialogFooter>
                        </form>
                    </Form>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
