"use client";

import { useState, useTransition } from "react";
import { Send } from "lucide-react";
import { sendMessage } from "./actions";

type MessageInputProps = {
    conversationId: string;
    onMessageSent?: () => void;
};

export default function MessageInput({ conversationId, onMessageSent }: MessageInputProps) {
    const [content, setContent] = useState("");
    const [isPending, startTransition] = useTransition();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!content.trim()) return;

        const messageContent = content;
        setContent("");

        startTransition(async () => {
            const result = await sendMessage({
                conversationId,
                content: messageContent,
            });

            if (result.success && onMessageSent) {
                onMessageSent();
            }
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="px-3 py-3 sm:p-4 border-t bg-white flex items-center gap-2 sm:gap-3"
        >
            <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2.5 sm:py-2 text-sm sm:text-base border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary bg-gray-50 focus:bg-white transition-colors"
                disabled={isPending}
            />
            <button
                type="submit"
                disabled={!content.trim() || isPending}
                className="p-2.5 sm:p-3 bg-primary text-white rounded-full hover:bg-primary/90 active:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
            >
                <Send className="w-5 h-5" />
            </button>
        </form>
    );
}

