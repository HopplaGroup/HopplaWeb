"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    FileQuestion,
    Milestone,
    Users,
    Home,
    Settings,
    Menu as MenuIcon,
    X,
    WholeWord,
    Contact,
    CarFront,
    PlusCircle,
    UserPlus,
} from "lucide-react";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";
import * as m from "@/paraglide/messages.js";
import LanguageSwitcher from "@/app/_components/LanguageSwitcher";
// Utility function for conditional class names
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

type NavItem = {
    label: string;
    href: string;
    icon: React.ReactNode;
    children?: { label: string; href: string }[];
};

export default function Navigation({
    children,
}: {
    children: React.ReactNode;
}) {
    const navItems: NavItem[] = [
        {
            label: m.wacky_brief_cat_pull(),
            href: "/admin",
            icon: <Home className="w-5 h-5" />,
        },
        {
            label: m.mild_less_flea_reside(),
            href: "#",
            icon: <FileQuestion className="w-5 h-5" />,
            children: [
                {
                    label: m.dry_key_blackbird_achieve(),
                    href: "/admin/requests/driver",
                },
                {
                    label: m.fancy_brave_swan_pause(),
                    href: "/admin/requests/car",
                },
            ],
        },
        {
            label: m.just_green_robin_adore(),
            href: "/admin/users",
            icon: <Users className="w-5 h-5" />,
        },
        {
            label: m.dirty_active_haddock_engage(),
            href: "/admin/rides",
            icon: <Milestone className="w-5 h-5" />,
        },
        {
            label: m.neat_left_scallop_promise(),
            href: "/admin/settings",
            icon: <Settings className="w-5 h-5" />,
        },
        // contact-submissions and rules
        {
            label: m.yummy_top_lemming_reap(),
            href: "/admin/contact",
            icon: <Contact className="w-5 h-5" />,
        },
        {
            label: m.lime_good_gorilla_pat(),
            href: "/admin/rules",
            icon: <WholeWord className="w-5 h-5" />,
        },
        {
            label: "Driver Pool",
            href: "/admin/driver-pool",
            icon: <CarFront className="w-5 h-5" />,
        },
        {
            label: "User Pool",
            href: "/admin/user-pool",
            icon: <UserPlus className="w-5 h-5" />,
        },
        {
            label: "Add Ride",
            href: "/admin/add-ride",
            icon: <PlusCircle className="w-5 h-5" />,
        },
    ];

    const [isOpen, setIsOpen] = useState(false);
    const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

    const toggleSubmenu = (label: string) => {
        if (activeSubmenu === label) {
            setActiveSubmenu(null);
        } else {
            setActiveSubmenu(label);
        }
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <aside
                className={cn(
                    "fixed top-0 left-0 h-full bg-neutral-900 text-white ease-in-out z-40",
                    "md:w-64 overflow-hidden",
                    "shadow-lg",
                    {
                        "w-64": isOpen,
                        "w-0": !isOpen,
                    }
                )}
            >
                {/* Sidebar Header with Logo */}
                <div className="flex items-center justify-between h-16 px-4">
                    <Link href="/admin" className="flex items-center gap-2">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                            <span className="font-bold text-white">
                                {m.frail_low_cobra_read()}
                            </span>
                        </div>
                        <span className={cn("text-xl font-semibold ")}>
                            {m.arable_late_lionfish_dance()}
                        </span>
                    </Link>
                    <button
                        onClick={toggleSidebar}
                        className="text-white md:hidden"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Sidebar Content */}
                <nav className="mt-2 px-2">
                    <ul className="space-y-1">
                        {navItems.map((item) => (
                            <li key={item.label}>
                                {item.children ? (
                                    <div>
                                        <button
                                            onClick={() =>
                                                toggleSubmenu(item.label)
                                            }
                                            className={cn(
                                                "w-full flex items-center justify-between p-3 rounded-lg transition-colors",
                                                activeSubmenu === item.label
                                                    ? "bg-primary text-white"
                                                    : "text-gray-300 hover:bg-neutral-800"
                                            )}
                                        >
                                            <div className="flex items-center">
                                                <span className="flex-shrink-0">
                                                    {item.icon}
                                                </span>
                                                <span className="ml-3 whitespace-nowrap">
                                                    {item.label}
                                                </span>
                                            </div>
                                            <svg
                                                className={cn(
                                                    "w-4 h-4 transform transition-transform",
                                                    activeSubmenu === item.label
                                                        ? "rotate-180"
                                                        : ""
                                                )}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M19 9l-7 7-7-7"
                                                />
                                            </svg>
                                        </button>
                                        {activeSubmenu === item.label && (
                                            <ul className="mt-1 pl-8 space-y-1">
                                                {item.children.map((child) => (
                                                    <li key={child.href}>
                                                        <Link
                                                            href={child.href}
                                                            className="block p-2 text-sm rounded-lg text-gray-300 hover:bg-neutral-800 hover:text-white"
                                                        >
                                                            {child.label}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-neutral-800 hover:text-white transition-colors"
                                    >
                                        <span className="flex-shrink-0">
                                            {item.icon}
                                        </span>
                                        <span className="ml-3 whitespace-nowrap">
                                            {item.label}
                                        </span>
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            {/* Bottom Navigation (Mobile Only) */}
            <div className="fixed border-t-2 border-gray-300 bottom-0 left-0 right-0 z-20 bg-white shadow-lg md:hidden">
                <div className="flex justify-between items-center px-4">
                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleSidebar}
                        className="p-4 hover:bg-gray-200 flex flex-col items-center justify-center"
                    >
                        <MenuIcon className="w-6 h-6" />
                        <span className="text-xs mt-1">
                            {m.blue_odd_mole_prosper()}
                        </span>
                    </button>

                    {/* Show only primary navigation items in bottom bar */}
                    {navItems
                        .filter((_, index) => index !== 1) // Filter out "Requests" which has submenu
                        .slice(0, 3) // Limit to 4 items (including menu button)
                        .map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="p-4 hover:bg-gray-200 flex flex-col items-center justify-center"
                            >
                                <span className="">{item.icon}</span>
                                <span className="text-xs mt-1 truncate max-w-14">
                                    {item.label}
                                </span>
                            </Link>
                        ))}
                </div>
            </div>

            {/* Mobile Sidebar Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={toggleSidebar}
                />
            )}

            {/* Page Content Container */}
            <main
                className={cn(
                    "transition-all duration-300 ease-in-out w-full block",
                    "pl-0 md:pl-64",
                    "mb-16 md:mb-0" // Add bottom margin on mobile for the bottom nav
                )}
            >
                {children}
            </main>
        </div>
    );
}
