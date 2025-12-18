"use client";

import {
    Home,
    Ticket,
    Menu,
    User as UserIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import * as m from "@/paraglide/messages.js";
import type { Prisma } from "@prisma/client";
import { AuthModal } from "./AuthModals";
import MessagesNavItem from "./MessagesNavItem";

export default function BottomNavigation({
    user,
    openSidebar,
}: {
    user: Prisma.UserGetPayload<{
        include: { driverVerificationRequest: { select: { status: true } } };
    }> | null;
    openSidebar: () => void;
}) {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

    const MAIN_NAV_ITEMS = [
        { href: "/", label: m.lofty_nimble_goat_succeed(), icon: Home },
        {
            href: "/upcoming-rides",
            label: m.odd_sleek_mink_taste(),
            icon: Ticket,
        },
    ];

  

    return (
        <>
            {/* Bottom Navigation Bar */}
            <div
                className={`fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-[200] md:hidden transition-transform duration-300`}
            >
                <div className="h-px bg-gray-200"></div>
                <div className="flex justify-around items-center h-16">
                    {MAIN_NAV_ITEMS.map(({ href, label, icon: Icon }) => (
                        <Link
                            key={href}
                            href={href}
                            prefetch={false}
                            className="flex flex-col items-center justify-center flex-1 h-full py-1 hover:text-primary transition-colors"
                        >
                            <Icon size={20} className="mb-1" />
                            <span className="text-xs font-medium line-clamp-1 max-w-20 text-center">
                                {label}
                            </span>
                        </Link>
                    ))}
                    {user && (
                        <MessagesNavItem
                            userId={user.id}
                            variant="bottom-nav"
                            label={m.sea_tidy_seahorse_slide()}
                        />
                    )}
                    {!user && (
                        <button
                            type="button"
                            onClick={() => {
                                setAuthMode('login');
                                setIsAuthModalOpen(true);
                            }}
                            className="flex flex-col items-center justify-center flex-1 h-full py-1 hover:text-primary transition-colors"
                        >
                            <UserIcon size={20} className="mb-1" />
                            <span className="text-xs font-medium line-clamp-1 max-w-20 text-center">
                                {m.plane_weird_macaw_slurp()}
                            </span>
                        </button>
                    )}

                    {/* More menu button */}
                    <button
                        type="button"
                        onClick={openSidebar}
                        className="flex flex-col items-center justify-center flex-1 h-full py-1 hover:text-primary transition-colors"
                    >
                        <Menu size={20} className="mb-1" />
                        <span className="text-xs font-medium">
                            {m.tiny_plane_mouse_catch()}
                        </span>
                    </button>
                </div>
            </div>

            {/* Auth Modal */}
            {!user && (
                <AuthModal
                    isOpen={isAuthModalOpen}
                    onClose={() => setIsAuthModalOpen(false)}
                    mode={authMode}
                    onSwitchMode={() => {
                        setAuthMode(authMode === 'login' ? 'register' : 'login');
                    }}
                />
            )}
        </>
    );
}
