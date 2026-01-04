"use server";

import { getUser } from "@/lib/utils/auth";
import db from "@/lib/utils/db";
import { revalidatePath } from "next/cache";

type SendMessageInput = {
    conversationId: string;
    content: string;
};

export async function sendMessage({ conversationId, content }: SendMessageInput) {
    const user = await getUser();

    if (!user) {
        return { success: false, error: "Not authenticated" };
    }

    if (!content.trim()) {
        return { success: false, error: "Message cannot be empty" };
    }

    try {
        // Verify user is a participant
        const participant = await db.conversationParticipant.findUnique({
            where: {
                userId_conversationId: {
                    userId: user.id,
                    conversationId,
                },
            },
        });

        if (!participant) {
            return { success: false, error: "Not a participant" };
        }

        // Create the message with sender info
        const message = await db.message.create({
            data: {
                content: content.trim(),
                senderId: user.id,
                conversationId,
            },
            include: {
                sender: true,
            },
        });

        // Update conversation's updatedAt
        await db.conversation.update({
            where: { id: conversationId },
            data: { updatedAt: new Date() },
        });

        revalidatePath(`/users/messages/${conversationId}`);
        revalidatePath("/users/messages");

        return { success: true, message };
    } catch (error) {
        console.error("Failed to send message:", error);
        return { success: false, error: "Failed to send message" };
    }
}

type StartConversationInput = {
    otherUserId: string;
    initialMessage?: string;
    initialMessageFromOther?: boolean; // If true, the initial message appears to be from otherUserId
};

export async function startConversation({ otherUserId, initialMessage, initialMessageFromOther }: StartConversationInput) {
    const user = await getUser();

    if (!user) {
        return { success: false, error: "Not authenticated" };
    }

    if (user.id === otherUserId) {
        return { success: false, error: "Cannot start conversation with yourself" };
    }

    try {
        // Check if conversation already exists between these two users
        const existingConversation = await db.conversation.findFirst({
            where: {
                AND: [
                    { participants: { some: { userId: user.id } } },
                    { participants: { some: { userId: otherUserId } } },
                ],
            },
        });

        let conversationId: string;

        if (existingConversation) {
            conversationId = existingConversation.id;
        } else {
            // Create new conversation with both participants
            const conversation = await db.conversation.create({
                data: {
                    participants: {
                        create: [
                            { userId: user.id },
                            { userId: otherUserId },
                        ],
                    },
                },
            });
            conversationId = conversation.id;
        }

        // If there's an initial message, create it (for both new and existing conversations)
        if (initialMessage?.trim()) {
            const senderId = initialMessageFromOther ? otherUserId : user.id;
            await db.message.create({
                data: {
                    content: initialMessage.trim(),
                    senderId,
                    conversationId,
                },
            });

            // Update conversation's updatedAt
            await db.conversation.update({
                where: { id: conversationId },
                data: { updatedAt: new Date() },
            });
        }

        revalidatePath("/users/messages");
        revalidatePath(`/users/messages/${conversationId}`);

        return { success: true, conversationId };
    } catch (error) {
        console.error("Failed to start conversation:", error);
        return { success: false, error: "Failed to start conversation" };
    }
}

