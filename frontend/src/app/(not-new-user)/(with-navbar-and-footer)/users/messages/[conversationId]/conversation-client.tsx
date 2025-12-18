"use client";

import type { User, Message } from "@prisma/client";
import MessageList from "./message-list";
import MessageInput from "./message-input";
import { useFindManyMessage } from "@/lib/hooks";

type MessageWithSender = Message & {
    sender: User;
};

type ConversationClientProps = {
    conversationId: string;
    currentUserId: string;
    initialMessages: MessageWithSender[];
};

export default function ConversationClient({
    conversationId,
    currentUserId,
    initialMessages,
}: ConversationClientProps) {
    // Poll for new messages every 3 seconds
    const { data: messages, refetch } = useFindManyMessage(
        {
            where: {
                conversationId,
            },
            include: {
                sender: true,
            },
            orderBy: {
                createdAt: "asc",
            },
        },
        {
            initialData: initialMessages,
            refetchInterval: 3000, // Poll every 3 seconds
            refetchIntervalInBackground: false, // Don't poll when tab is not focused
        }
    );

    const handleMessageSent = () => {
        // Refetch immediately after sending
        refetch();
    };

    return (
        <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
            <MessageList 
                messages={(messages as MessageWithSender[]) || initialMessages} 
                currentUserId={currentUserId} 
            />
            <div className="flex-shrink-0">
                <MessageInput
                    conversationId={conversationId}
                    onMessageSent={handleMessageSent}
                />
            </div>
        </div>
    );
}

