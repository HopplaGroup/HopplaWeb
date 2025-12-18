"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { startConversation } from "./[conversationId]/actions";
import * as m from "@/paraglide/messages.js";

type StartConversationButtonProps = {
    otherUserId: string;
    className?: string;
};

export default function StartConversationButton({
    otherUserId,
    className = "",
}: StartConversationButtonProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleClick = () => {
        startTransition(async () => {
            const result = await startConversation({ otherUserId });

            if (result.success && result.conversationId) {
                router.push(`/users/messages/${result.conversationId}`);
            }
        });
    };

    return (
        <button
            onClick={handleClick}
            disabled={isPending}
            className={`flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${className}`}
        >
            <MessageCircle className="w-5 h-5" />
            {isPending ? m.sad_cozy_swan_push() : m.slimy_lofty_iguana_twist()}
        </button>
    );
}

