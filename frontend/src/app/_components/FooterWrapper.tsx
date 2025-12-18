"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function FooterWrapper() {
    const pathname = usePathname();

    // // Only show footer on home page, and hide on mobile
    // const isHomePage = pathname === "/" || pathname === "/en" || pathname === "/ka";

    if (pathname.includes("/users/messages")) {
        return null;
    }

    return (
        <div className="hidden md:block">
            <Footer />
        </div>
    );
}

