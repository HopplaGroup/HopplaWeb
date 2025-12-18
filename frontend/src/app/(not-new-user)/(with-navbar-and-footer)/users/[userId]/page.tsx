"use client";
import {
    useFindManyUser,
    useFindManyUserReview,
    useFindUniqueUser,
} from "@/lib/hooks";
import highWay from "../../../../../../public/assets/road-svg.svg";

import {
    Calendar,
    Check,
    ImageIcon,
    Mail,
    Phone,
    Stars,
    Text,
    User,
} from "lucide-react";
import Image from "next/image";
import { useMemo } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import ContentWithReviews from "./content-with-reviews";
import Link from "next/link";
import SearchBarLanding from "../../_components/ASearchBarLanding";
import * as m from "@/paraglide/messages.js";
import { useUser } from "@/lib/providers/UserProvider";
import StartConversationButton from "../messages/start-conversation-button";

type UserPageProps = {
    params: { userId: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export default function UserPage({ params, searchParams }: UserPageProps) {
    const { userId } = params;
    const { user: currentUser } = useUser();
    const { data: user, isLoading: isUserLoading } = useFindUniqueUser({
        where: {
            id: userId,
        },
        include: {
            driverVerificationRequest: true,
        },
    });
    const { data: userReviews, isLoading: isUserReviewsLoading } =
        useFindManyUserReview({
            where: {
                revieweeId: userId,
            },
            include: {
                author: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

    const averageUserRating = useMemo(() => {
        if (!userReviews || userReviews.length === 0) return 0;

        const totalRating = userReviews.reduce(
            (sum, review) => sum + review.rating,
            0
        );
        return totalRating / userReviews.length;
    }, [userReviews]);
    // console.log(user);
    const isDriver = user?.driverVerificationRequest?.status === "APPROVED";
    const isOwnProfile = currentUser?.id === userId;

    return (
        <ContentWithReviews userId={userId}>
            {isUserLoading ? (
                <UserProfileSkeleton />
            ) : user ? (
                <>
                    <div>
                        <div className="relative w-full min-h-80">
                            <div className="absolute left-0 top-0 h-full min-h-80 w-full overflow-hidden">
                                <Image
                                    className="object-cover object-center h-full w-full"
                                    src={highWay}
                                    alt="Picture of the author"
                                />
                            </div>
                            <div className="bg-gray-900 border-2 border-gray-900 flex items-end justify-center sm:justify-start h-full min-h-80 bg-opacity-70 p-4 sm:pl-8 relative">
                                <img
                                    src={user.profileImg}
                                    className="size-48 rounded-3xl translate-y-14 border-white border-2 object-cover"
                                    alt=""
                                />
                                {isDriver && (
                                    <div className="size-10 bg-white absolute rounded-3xl translate-y-16 translate-x-20 sm:translate-x-40">
                                        <img
                                            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='384' height='384' viewBox='0 0 24 24'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z'/%3E%3Cpath fill='%23e74f3c' d='M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2M4.205 13.81a8.01 8.01 0 0 0 6.254 6.042c-.193-2.625-1.056-4.2-2.146-5.071c-1.044-.835-2.46-1.158-4.108-.972Zm11.482.97c-1.09.873-1.953 2.447-2.146 5.072a8.01 8.01 0 0 0 6.254-6.043c-1.648-.186-3.064.137-4.108.972ZM12 4a8 8 0 0 0-7.862 6.513l-.043.248l2.21-.442c.582-.116 1.135-.423 1.753-.84l.477-.332C9.332 8.581 10.513 8 12 8c1.388 0 2.509.506 3.3 1.034l.642.445c.54.365 1.032.645 1.536.788l.217.052l2.21.442A8 8 0 0 0 12 4'/%3E%3C/g%3E%3C/svg%3E"
                                            className="object-cover p-1"
                                            alt=""
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex pt-14 flex-col sm:flex-row sm:gap-4 items-center sm:items-start sm:pl-8">
                            <div className="LEFT SIDE w-full">
                                <div className="flex justify-center sm:justify-start gap-2">
                                    <div className="text-2xl font-bold">
                                        {user.name}
                                    </div>
                                    <div className="flex justify-between mt-1">
                                        <div className="bg-primary/10 size-6 flex items-center justify-center rounded-full">
                                            <Check
                                                className="text-primary font-bold"
                                                size={18}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="text-sm">
                                    <p className="flex items-center sm:justify-start justify-center gap-1 ">
                                        {/* {ride.driver.averageRating}{" "} */}
                                        <div className="text-base font-semibold">
                                            {averageUserRating.toFixed(2)}
                                        </div>
                                        <Stars
                                            className="text-primary"
                                            size={20}
                                        />
                                        {/* TODO: Misho aq reviewebis raodenoba unda iyos */}
                                        <div className="text-xs">
                                            {userReviews?.length}{" "}
                                            {m.cozy_ok_gull_strive()}
                                        </div>
                                    </p>
                                </div>
                                <div className="pt-6 flex justify-center sm:justify-start gap-2">
                                    <Text size={20} />
                                    <div className="text-center sm:text-start max-w-96">
                                        {user.bio}
                                        {/* <div>{user.bio}</div> */}
                                    </div>
                                </div>
                                {!isOwnProfile && currentUser && (
                                    <div className="pt-6 flex justify-center sm:justify-start">
                                        <StartConversationButton
                                            otherUserId={userId}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="RIGHT SIDE w-full">
                                <div className="flex justify-center sm:justify-start">
                                    <span className="pt-6 sm:pt-0 text-xl font-semibold">
                                        {m.fancy_quick_macaw_dance()}
                                    </span>
                                </div>
                                <div className="flex items-center ">
                                    <div className="w-full bg-white rounded-sm p-4 lg:max-w-md mt-5">
                                        <dl className="-my-3 divide-y divide-gray-100 text-sm">
                                            {/* User details */}
                                            {[
                                                //   {
                                                //     icon: <Phone size={20} />,
                                                //     label: "Phone",
                                                //     value: user.mobileNumber,
                                                //   },
                                                //   {
                                                //     icon: <Mail size={20} />,
                                                //     label: "E-Mail",
                                                //     value: user.email,
                                                //   },
                                                {
                                                    icon: <User size={20} />,
                                                    label: m.big_solid_bulldog_borrow(),
                                                    value: user.sex,
                                                },
                                                {
                                                    icon: (
                                                        <Calendar size={20} />
                                                    ),
                                                    label: m.frail_jumpy_kitten_gulp(),
                                                    value: `${
                                                        new Date().getFullYear() -
                                                        new Date(
                                                            user.birthDate
                                                        ).getFullYear()
                                                    } ${m.kind_new_alligator_bake()}`,
                                                },
                                                {
                                                    icon: <Stars size={20} />,
                                                    label: m.arable_direct_crab_kiss(),
                                                    value: averageUserRating.toFixed(
                                                        2
                                                    ),
                                                },
                                                //   {
                                                //     icon: <Text size={20} />,
                                                //     label: "Bio",
                                                //     value: user.bio,
                                                //   },
                                            ].map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
                                                >
                                                    <dt className="font-medium text-gray-900 flex items-center gap-2">
                                                        {item.icon}
                                                        {item.label}
                                                    </dt>
                                                    <dd className="text-gray-700 sm:col-span-2">
                                                        {item.value}
                                                    </dd>
                                                </div>
                                            ))}
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* add acordion to another page as well */}
                    {/* no one can read and book as well if not driver itself or admin */}
                    {/* no one can book if driver is not verified as driver */}
                    {/* no one can read if driver is not verified as driver and also car is not verified for driver */}
                    {/* hmm maybe ride also has status for verification, and automatically verified but can be updates aas rejected because of some case */}
                    {/* ask gpt what is the best use case to do here how to handle bussiness logic hmm */}
                </>
            ) : (
                <div className="text-xl font-semibold">
                    {m.tense_fuzzy_mongoose_jump()}
                </div>
            )}
        </ContentWithReviews>
    );
}

const UserProfileSkeleton = () => (
    <div className="animate-pulse">
        <div className="h-8 w-32 bg-gray-200 rounded mb-4"></div>
        <div className="h-10 w-64 bg-gray-200 rounded mb-4"></div>
        <div className="flex gap-4 mb-6">
            <div className="h-6 w-40 bg-gray-200 rounded"></div>
            <div className="h-6 w-40 bg-gray-200 rounded"></div>
        </div>
        <div className="h-10 w-full bg-gray-200 rounded mb-6"></div>
        {[...Array(7)].map((_, index) => (
            <div key={index} className="flex gap-4 mb-4">
                <div className="h-6 w-1/4 bg-gray-200 rounded"></div>
                <div className="h-6 w-2/3 bg-gray-200 rounded"></div>
            </div>
        ))}
    </div>
);
