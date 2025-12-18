import { getUser } from "@/lib/utils/auth";
import db from "@/lib/utils/db";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ConversationClient from "./conversation-client";

type ConversationPageProps = {
    params: { conversationId: string };
};

export default async function ConversationPage({ params }: ConversationPageProps) {
    const { conversationId } = params;
    const user = await getUser();

    if (!user) {
        redirect("/");
    }

    // Fetch the conversation with participants and messages
    const conversation = await db.conversation.findUnique({
        where: {
            id: conversationId,
        },
        include: {
            participants: {
                include: {
                    user: true,
                },
            },
            messages: {
                orderBy: {
                    createdAt: "asc",
                },
                include: {
                    sender: true,
                },
            },
        },
    });

    if (!conversation) {
        notFound();
    }

    // Check if user is a participant
    const isParticipant = conversation.participants.some(
        (p) => p.userId === user.id
    );

    if (!isParticipant) {
        notFound();
    }

    // Get the other user
    const otherParticipant = conversation.participants.find(
        (p) => p.userId !== user.id
    );
    const otherUser = otherParticipant?.user;

    // Update lastReadAt for the current user
    await db.conversationParticipant.updateMany({
        where: {
            conversationId,
            userId: user.id,
        },
        data: {
            lastReadAt: new Date(),
        },
    });

    return (
        <div className="fixed inset-x-0 top-0 bottom-16 md:top-20 md:bottom-0 flex flex-col bg-gray-50">
            <div className="flex-1 flex flex-col max-w-2xl w-full mx-auto bg-white md:my-4 md:rounded-xl md:border md:border-gray-200 md:shadow-sm overflow-hidden md:max-h-[calc(100vh-5rem-2rem)]">
                {/* Header */}
                <div className="flex items-center gap-3 px-3 py-3 sm:px-4 sm:py-4 border-b bg-white flex-shrink-0">
                    <Link
                        href="/users/messages"
                        className="p-2 -ml-1 hover:bg-gray-100 active:bg-gray-200 rounded-full transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <Link
                        href={`/users/${otherUser?.id}`}
                        className="flex items-center gap-3 flex-1 min-w-0"
                    >
                        <img
                            src={otherUser?.profileImg || "/default-pfp.jpg"}
                            alt={otherUser?.name || "User"}
                            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="min-w-0">
                            <h2 className="font-semibold truncate text-sm sm:text-base">
                                {otherUser?.name || "Unknown User"}
                            </h2>
                        </div>
                    </Link>
                </div>

                {/* Messages and Input with real-time updates */}
                <ConversationClient
                    conversationId={conversationId}
                    currentUserId={user.id}
                    initialMessages={conversation.messages}
                />
            </div>
        </div>
    );
}

