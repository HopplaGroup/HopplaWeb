"use client";

import type { User, Message } from "@prisma/client";
import { useEffect, useRef } from "react";

type MessageWithSender = Message & {
    sender: User;
};

type MessageListProps = {
    messages: MessageWithSender[];
    currentUserId: string;
};

export default function MessageList({ messages, currentUserId }: MessageListProps) {
    const bottomRef = useRef<HTMLDivElement>(null);

    // biome-ignore lint/correctness/useExhaustiveDependencies: scroll when messages change
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages.length]);

    return (
        <div className="flex-1 min-h-0 overflow-y-auto px-3 py-4 sm:px-4 space-y-3 bg-gray-50">
            {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                    <p className="text-gray-400 text-sm sm:text-base text-center px-4">
                        No messages yet. Start the conversation!
                    </p>
                </div>
            ) : (
                messages.map((message) => {
                    const isOwn = message.senderId === currentUserId;

                    return (
                        <div
                            key={message.id}
                            className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-[85%] sm:max-w-[70%] rounded-2xl px-3 py-2 sm:px-4 shadow-sm ${
                                    isOwn
                                        ? "bg-primary text-white rounded-br-md"
                                        : "bg-white border border-gray-100 rounded-bl-md"
                                }`}
                            >
                                <p className="break-words text-sm sm:text-base leading-relaxed">{message.content}</p>
                                <p
                                    className={`text-[10px] sm:text-xs mt-1 ${
                                        isOwn ? "text-white/70" : "text-gray-400"
                                    }`}
                                >
                                    {formatTime(message.createdAt)}
                                </p>
                            </div>
                        </div>
                    );
                })
            )}
            <div ref={bottomRef} />
        </div>
    );
}

function formatTime(date: Date): string {
    return new Date(date).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
}

