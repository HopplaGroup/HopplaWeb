"use client";
import { Plus, Ticket, X, Menu, Home, Info, Phone } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import * as m from "@/paraglide/messages.js";
import type { Prisma } from "@prisma/client";
import Logo from "@/app/_components/Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import AuthBlock from "./AuthBlock";
import MessagesNavItem from "./MessagesNavItem";

const BANNER_DISMISSED_KEY = "create-post-banner-dismissed";

export default function Navbar({
    user,
    openSidebar,
    isSidebarOpened,
}: {
    user: Prisma.UserGetPayload<{
        include: { driverVerificationRequest: { select: { status: true } } };
    }> | null;
    openSidebar: () => void;
    isSidebarOpened: boolean;
}) {
    const [scrolled, setScrolled] = useState(false);
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        const dismissed = localStorage.getItem(BANNER_DISMISSED_KEY);
        // Show banner only if user is logged in and hasn't dismissed
        setShowBanner(user !== null && dismissed !== "true");
        
        // Listen for storage changes (when banner is dismissed)
        const handleStorage = () => {
            const dismissed = localStorage.getItem(BANNER_DISMISSED_KEY);
            setShowBanner(user !== null && dismissed !== "true");
        };
        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, [user]);

    const NAV_ITEMS = [
        { href: "/", label: m.lofty_nimble_goat_succeed(), icon: Home },
        { href: "/about", label: m.tense_every_swallow_clap(), icon: Info },
        { href: "/contact", label: m.round_sour_gazelle_peel(), icon: Phone },
    ];

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`left-0 right-0 w-screen fixed z-[100] transition-all ${
                scrolled ? "bg-white shadow-md" : "bg-white"
            } ${showBanner ? "top-10" : "top-0"}`}
        >
            <div className="container">
                <div className="flex h-16 md:h-20 items-center justify-between">
                    <div className="flex items-center gap-2 md:gap-6">
                        <button
                            type="button"
                            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200 transition-colors duration-200"
                            onClick={openSidebar}
                            aria-label="Toggle menu"
                        >
                            {isSidebarOpened ? (
                                <X size={20} />
                            ) : (
                                <Menu size={20} />
                            )}
                        </button>

                        <div className="flex items-center">
                            <div className="transition-transform duration-200 hover:scale-105">
                                <Logo />
                            </div>
                        </div>

                        <div className="items-center space-x-1 hidden lgx:flex">
                            {NAV_ITEMS.map(({ href, label }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className="relative font-medium px-3 py-2 text-sm text-gray-900 flex items-center gap-2 transition-colors group"
                                >
                                    <span className="">{label}</span>
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-1">
                        <LanguageSwitcher labelClassName="hidden md:hidden lg:block" />

                        {user && (
                            <Link
                                href="/add-ride"
                                className="flex items-center gap-2 px-4 py-3.5 text-sm font-medium bg-transparent hover:bg-gray-200 rounded-full focus:outline-none transition-colors "
                            >
                                <Plus size={18} className="" />
                                <span className="hidden lg:inline font-medium text-sm line-clamp-1">
                                    {m.actual_watery_fireant_foster()}
                                </span>
                            </Link>
                        )}

                        {user && (
                            <div className="h-6 w-px bg-gray-300 hidden md:block"></div>
                        )}

                        <div className="flex items-center gap-0">
                            {user && (
                                <Link
                                    href="/upcoming-rides"
                                    className="flex items-center gap-2 px-4 py-3.5 text-sm font-medium bg-transparent hover:bg-gray-200 rounded-full focus:outline-none transition-colors"
                                >
                                    <Ticket size={18} />
                                    <span className="hidden lg:inline font-medium text-sm">
                                        {m.odd_sleek_mink_taste()}
                                    </span>
                                </Link>
                            )}
                            {user && (
                                <MessagesNavItem
                                    userId={user.id}
                                    variant="navbar"
                                />
                            )}
                            <AuthBlock user={user} />
                        </div>
                    </div>
                </div>
            </div>

            <div
                className={`h-px bg-gray-200 dark:bg-gray-800 transition-opacity duration-300 ${
                    scrolled ? "opacity-0" : "opacity-100"
                }`}
            ></div>
        </nav>
    );
}
