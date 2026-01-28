"use client";

import {
    CarFront,
    Globe,
    Info,
    LogOut,
    Milestone,
    Phone,
    Plus,
    Settings,
    Shield,
    Ticket,
    UserIcon,
    X,
    Bell,
    FileText,
    ChevronRight,
} from "lucide-react";
import * as m from "@/paraglide/messages.js";
import type { Prisma } from "@prisma/client";
import { useEffect, useRef, useState, useCallback } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Link } from "@/lib/i18n";
import LanguageSwitcher from "./LanguageSwitcher";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

type NavItem = {
    href: string;
    label: string;
    icon: LucideIcon;
    requiresAuth?: boolean;
    highlight?: "primary" | "secondary";
};

export default function Sidebar({
    isSidebarOpen,
    setIsSidebarOpen,
    user,
}: {
    isSidebarOpen: boolean;
    setIsSidebarOpen: (open: boolean) => void;
    user: Prisma.UserGetPayload<{
        include: { driverVerificationRequest: { select: { status: true } } };
    }> | null;
}) {
    const QUICK_ACTIONS: NavItem[] = [
        {
            href: "/add-ride",
            label: m.actual_watery_fireant_foster(),
            icon: Plus,
            requiresAuth: true,
            highlight: "primary",
        },
        {
            href: "/request-ride",
            label: m.spry_neat_swan_link(),
            icon: Bell,
            requiresAuth: true,
            highlight: "secondary",
        },
    ];

    const PROFILE_ITEMS: NavItem[] = [
        {
            href: "/profile",
            label: m.wild_tidy_alpaca_nurture(),
            icon: UserIcon,
            requiresAuth: true,
        },
        {
            href: "/profile/trips",
            label: m.long_upper_seal_revive(),
            icon: Ticket,
            requiresAuth: true,
        },
        {
            href: "/profile/rides",
            label: m.candid_silly_stingray_tear(),
            icon: Milestone,
            requiresAuth: true,
        },
        {
            href: "/profile/my-posts",
            label: m.round_nimble_tern_zap(),
            icon: FileText,
            requiresAuth: true,
        },
        {
            href: "/profile/settings",
            label: m.deft_chunky_toad_snap(),
            icon: Settings,
            requiresAuth: true,
        },
    ];

    const INFO_ITEMS: NavItem[] = [
        { href: "/about", label: m.tense_every_swallow_clap(), icon: Info },
        { href: "/contact", label: m.round_sour_gazelle_peel(), icon: Phone },
    ];

    if (
        user &&
        (!user.driverVerificationRequest ||
            user.driverVerificationRequest?.status === "PENDING")
    ) {
        PROFILE_ITEMS.push({
            href: "/send-driver-verification",
            label: m.royal_civil_tuna_slide(),
            icon: CarFront,
            highlight: "primary",
        });
    }

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Scroll indicator state
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showScrollIndicator, setShowScrollIndicator] = useState(false);

    const checkScrollable = useCallback(() => {
        const container = scrollContainerRef.current;
        if (container) {
            const isScrollable = container.scrollHeight > container.clientHeight;
            const isNotAtBottom = container.scrollHeight - container.scrollTop - container.clientHeight > 20;
            setShowScrollIndicator(isScrollable && isNotAtBottom);
        }
    }, []);

    useEffect(() => {
        if (isSidebarOpen) {
            document.body.style.overflow = "hidden";
            // Check scrollability when sidebar opens
            setTimeout(checkScrollable, 100);
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isSidebarOpen, checkScrollable]);

    const renderNavItem = (item: NavItem, index: number) => {
        if (item.requiresAuth && !user) return null;

        const highlightStyles = {
            primary: {
                container: "bg-primary/10 hover:bg-primary/15 dark:bg-primary/15 dark:hover:bg-primary/20",
                icon: "bg-primary text-primary-foreground",
                text: "text-primary dark:text-primary",
                chevron: "text-primary/40 group-hover:text-primary/60",
            },
            secondary: {
                container: "bg-blue-50 dark:bg-blue-950/30 hover:bg-blue-100 dark:hover:bg-blue-900/40",
                icon: "bg-blue-500 dark:bg-blue-600 text-white",
                text: "text-blue-900 dark:text-blue-100",
                chevron: "text-blue-300 dark:text-blue-700 group-hover:text-blue-400",
            },
        };

        const styles = item.highlight ? highlightStyles[item.highlight] : null;

        return (
            <Link
                key={index}
                href={item.href}
                className={cn(
                    "group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
                    styles?.container ?? "hover:bg-gray-50 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300"
                )}
                onClick={toggleSidebar}
            >
                <div className={cn(
                    "flex items-center justify-center size-9 rounded-lg transition-colors",
                    styles?.icon ?? "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 group-hover:bg-gray-200 dark:group-hover:bg-gray-700"
                )}>
                    <item.icon size={18} />
                </div>
                <span className={cn(
                    "flex-1 text-sm font-medium",
                    styles?.text
                )}>{item.label}</span>
                <ChevronRight className={cn(
                    "size-4 group-hover:translate-x-0.5 transition-transform",
                    styles?.chevron ?? "text-gray-300 dark:text-gray-600 group-hover:text-gray-400"
                )} />
            </Link>
        );
    };

    return (
        <>
            {/* Backdrop */}
            <button
                type="button"
                aria-label="Close sidebar"
                className={cn(
                    "fixed inset-0 bg-black/40 backdrop-blur-sm z-[300] transition-all duration-300 cursor-default",
                    {
                        "visible opacity-100": isSidebarOpen,
                        "invisible opacity-0": !isSidebarOpen,
                    }
                )}
                onClick={toggleSidebar}
            />

            {/* Sidebar */}
            <div
                className={cn(
                    "fixed top-0 bottom-0 right-0 md:left-0 md:right-auto w-[85%] max-w-[320px] md:w-72 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg z-[400] transform transition-transform duration-300 ease-out shadow-2xl",
                    "h-[100dvh] pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]",
                    isSidebarOpen
                        ? "translate-x-0"
                        : "md:-translate-x-full translate-x-full"
                )}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100 dark:border-gray-800">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            {m.fun_less_vole_hug()}
                        </h2>
                        <button
                            type="button"
                            onClick={toggleSidebar}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            <X size={20} className="text-gray-500" />
                        </button>
                    </div>

                    {/* Content */}
                    <div 
                        ref={scrollContainerRef}
                        onScroll={checkScrollable}
                        className="flex-1 overflow-y-auto px-3 py-4 space-y-6 relative">
                        {/* Quick Actions */}
                        {user && (
                            <div>
                                <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-3 mb-2">
                                    {m.actual_watery_fireant_foster()}
                                </h3>
                                <nav className="space-y-1">
                                    {QUICK_ACTIONS.map(renderNavItem)}
                                </nav>
                            </div>
                        )}

                        {/* Profile Section */}
                        {user && (
                            <div>
                                <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-3 mb-2">
                                    {m.wild_tidy_alpaca_nurture()}
                                </h3>
                                <nav className="space-y-1">
                                    {PROFILE_ITEMS.map(renderNavItem)}
                                </nav>
                            </div>
                        )}

                        {/* Info Section */}
                        <div>
                            <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-3 mb-2">
                                {m.tense_every_swallow_clap()}
                            </h3>
                            <nav className="space-y-1">
                                {INFO_ITEMS.map(renderNavItem)}
                                <LanguageSwitcher
                                    position="left"
                                    className="block"
                                    customButton={(t, label) => (
                                        <button
                                            type="button"
                                            className="group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300 w-full"
                                            onClick={t}
                                        >
                                            <div className="flex items-center justify-center size-9 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
                                                <Globe size={18} />
                                            </div>
                                            <span className="flex-1 text-sm font-medium text-left">
                                                {label}
                                            </span>
                                            <ChevronRight className="size-4 text-gray-300 dark:text-gray-600 group-hover:text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                                        </button>
                                    )}
                                />
                            </nav>
                        </div>

                        {/* Admin Link */}
                        {user && user.role === "ADMIN" && (
                            <div>
                                <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-3 mb-2">
                                    Admin
                                </h3>
                                <nav className="space-y-1">
                                    <Link
                                        href="/admin"
                                        className="group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300"
                                        onClick={toggleSidebar}
                                    >
                                        <div className="flex items-center justify-center size-9 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
                                            <Shield size={18} />
                                        </div>
                                        <span className="flex-1 text-sm font-medium">
                                            {m.tough_hour_robin_sing()}
                                        </span>
                                        <ChevronRight className="size-4 text-gray-300 dark:text-gray-600 group-hover:text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                                    </Link>
                                </nav>
                            </div>
                        )}
                    </div>

                    {/* Scroll Indicator */}
                    <div 
                        className={cn(
                            "pointer-events-none absolute left-0 right-0 bottom-[70px] h-16 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-gray-900 dark:via-gray-900/80 transition-opacity duration-300 flex items-end justify-center pb-3",
                            showScrollIndicator ? "opacity-100" : "opacity-0"
                        )}
                    >
                        <div className="flex items-center justify-center size-8 rounded-full bg-gray-100/80 dark:bg-gray-800/80 animate-bounce shadow-sm">
                            <svg 
                                className="size-4 text-gray-500 dark:text-gray-400" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    {/* Footer - Logout */}
                    {user && (
                        <div className="border-t border-gray-100 dark:border-gray-800 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
                            <LogoutLink className="group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 w-full">
                                <div className="flex items-center justify-center size-9 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 group-hover:bg-red-100 dark:group-hover:bg-red-900/30 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                                    <LogOut size={18} />
                                </div>
                                <span className="flex-1 text-sm font-medium text-left">
                                    {m.extra_lucky_rook_trust()}
                                </span>
                            </LogoutLink>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
