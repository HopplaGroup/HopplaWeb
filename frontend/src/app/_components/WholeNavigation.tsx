"use client";
import { useState } from "react";
import Navbar from "./Navbar";
import BottomNavigation from "./BottomNavigation";
import { Prisma } from "@prisma/client";
import Sidebar from "./Sidebar";
import { CreatePostBanner } from "../(not-new-user)/(with-navbar-and-footer)/_components/CreatePostBanner";
export default function WholeNavigation({
    user,
}: {
    user: Prisma.UserGetPayload<{
        include: { driverVerificationRequest: { select: { status: true } } };
    }> | null;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const openSidebar = () => {
        setIsSidebarOpen((t) => !t);
    };

    return (
        <>
        
            <div className="hidden md:block">
                <Navbar
                    isSidebarOpened={isSidebarOpen}
                    openSidebar={openSidebar}
                    user={user}
                />
            </div>
            <CreatePostBanner />
            <BottomNavigation openSidebar={openSidebar} user={user} />
            <Sidebar
                user={user}
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />
            
        </>
    );
}
