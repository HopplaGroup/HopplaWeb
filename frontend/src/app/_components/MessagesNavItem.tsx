"use client";

import { useFindManyConversation } from "@/lib/hooks";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

type MessagesNavItemProps = {
    userId: string;
    variant?: "bottom-nav" | "navbar";
    label?: string;
};

export default function MessagesNavItem({
    userId,
    variant = "bottom-nav",
    label,
}: MessagesNavItemProps) {
    const { data: conversations } = useFindManyConversation(
        {
            where: {
                participants: {
                    some: {
                        userId: userId,
                    },
                },
            },
            include: {
                participants: true,
                messages: {
                    orderBy: {
                        createdAt: "desc",
                    },
                    take: 1,
                },
            },
        },
        {
            refetchInterval: 30000, // Refetch every 30 seconds
        }
    );

    const unreadCount = useMemo(() => {
        if (!conversations) return 0;

        return conversations.filter((conv) => {
            const myParticipant = conv.participants.find(
                (p) => p.userId === userId
            );
            const lastMessage = conv.messages[0];

            if (!lastMessage || !myParticipant) return false;

            // If lastReadAt is null, treat all messages from others as unread
            if (!myParticipant.lastReadAt) {
                return lastMessage.senderId !== userId;
            }

            return (
                lastMessage.createdAt > myParticipant.lastReadAt &&
                lastMessage.senderId !== userId
            );
        }).length;
    }, [conversations, userId]);

    if (variant === "navbar") {
        return (
            <Link
                href="/users/messages"
                className="flex items-center justify-center w-10 h-10 text-sm font-medium bg-transparent hover:bg-gray-200 rounded-full focus:outline-none transition-colors relative"
            >
                <MessageCircle size={20} />
                {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 min-w-5 h-5 flex items-center justify-center rounded-full bg-primary text-white text-xs font-bold px-1">
                        {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                )}
            </Link>
        );
    }

    // Bottom nav variant
    return (
        <Link
            href="/users/messages"
            prefetch={false}
            className="flex flex-col items-center justify-center flex-1 h-full py-1 hover:text-primary transition-colors relative"
        >
            <div className="relative mb-1">
                <MessageCircle size={20} />
                {unreadCount > 0 && (
                    <span className="absolute -top-2 -right-2 min-w-4 h-4 flex items-center justify-center rounded-full bg-primary text-white text-[10px] font-bold px-1">
                        {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                )}
            </div>
            <span className="text-xs font-medium line-clamp-1 max-w-20 text-center">
                {label}
            </span>
        </Link>
    );
}

