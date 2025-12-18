import { getUser } from "@/lib/utils/auth";
import db from "@/lib/utils/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import * as m from "@/paraglide/messages.js";
export default async function MessagesPage() {
    const user = await getUser();

    if (!user) {
        redirect("/");
    }

    // Fetch all conversations the user is part of
    const conversations = await db.conversation.findMany({
        where: {
            participants: {
                some: {
                    userId: user.id,
                },
            },
        },
        include: {
            participants: {
                include: {
                    user: true,
                },
            },
            messages: {
                orderBy: {
                    createdAt: "desc",
                },
                take: 1,
                include: {
                    sender: true,
                },
            },
        },
        orderBy: {
            updatedAt: "desc",
        },
    });

    // Get the other participant for each conversation
    const conversationsWithOtherUser = conversations.map((conv) => {
        const otherParticipant = conv.participants.find(
            (p) => p.userId !== user.id
        );
        const lastMessage = conv.messages[0];
        const myParticipant = conv.participants.find(
            (p) => p.userId === user.id
        );
        const hasUnread =
            lastMessage &&
            myParticipant?.lastReadAt &&
            lastMessage.createdAt > myParticipant.lastReadAt;

        return {
            id: conv.id,
            otherUser: otherParticipant?.user,
            lastMessage,
            hasUnread,
            updatedAt: conv.updatedAt,
        };
    });

    return (
        <div className="min-h-[calc(100vh-10rem)] md:min-h-0 pb-20 md:pb-0">
            <div className="max-w-2xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
                <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">{m.quick_actual_squid_bump()}</h1>

                {conversationsWithOtherUser.length === 0 ? (
                    <div className="text-center py-12">
                        <MessageCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <p className="text-gray-500">{m.bright_proof_jan_care()}</p>
                        <p className="text-sm text-gray-400 mt-2">
                            {m.misty_front_opossum_drum()}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {conversationsWithOtherUser.map((conv) => (
                            <Link
                                key={conv.id}
                                href={`/users/messages/${conv.id}`}
                                className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border transition-colors hover:bg-gray-50 active:bg-gray-100 ${
                                    conv.hasUnread
                                        ? "bg-primary/5 border-primary/20"
                                        : "bg-white border-gray-200"
                                }`}
                            >
                                <img
                                    src={conv.otherUser?.profileImg || "/default-pfp.jpg"}
                                    alt={conv.otherUser?.name || "User"}
                                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover flex-shrink-0"
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2">
                                        <h3 className="font-semibold truncate text-sm sm:text-base">
                                            {conv.otherUser?.name || "Unknown User"}
                                        </h3>
                                        <span className="text-xs text-gray-400 flex-shrink-0">
                                            {conv.lastMessage &&
                                                formatTimeAgo(conv.lastMessage.createdAt)}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500 truncate mt-0.5">
                                        {conv.lastMessage ? (
                                            <>
                                                {conv.lastMessage.senderId === user.id && (
                                                    <span className="text-gray-400">You: </span>
                                                )}
                                                {conv.lastMessage.content}
                                            </>
                                        ) : (
                                            <span className="text-gray-400 italic">
                                                {m.giant_suave_martin_vent()}
                                            </span>
                                        )}
                                    </p>
                                </div>
                                {conv.hasUnread && (
                                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-primary flex-shrink-0" />
                                )}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function formatTimeAgo(date: Date): string {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;

    return date.toLocaleDateString();
}

