import { getUser } from "@/lib/utils/auth";
import {
  Home,
  Milestone,
  Settings,
  Ticket,
  Bell,
} from "lucide-react";
import { redirect } from "next/navigation";
import { SidebarNavigationLink, MobileNavLink } from "./side-navigation-link";
// import db from "@/lib/utils/db"; // Uncomment when driver alert feature is needed

import * as m from "@/paraglide/messages.js";

type LayoutProps = {
  children: React.ReactNode;
};

export default async function ProfileLayout({ children }: LayoutProps) {
  const user = await getUser();

  if (!user) redirect("/");

  // TODO: Implement driver alert feature
  // const driverRequest = await db.driverVerificationRequest.findUnique({
  //   where: { driverId: user.id },
  // });
  // const firstCar = await db.car.findFirst({
  //   where: { ownerId: user.id },
  // });
  // const firstRide = await db.ride.findFirst({
  //   where: { driverId: user.id },
  // });
  // const isUserDriver = driverRequest && driverRequest.status === "APPROVED";
  // const showDriverAlert = (firstCar || firstRide) && !isUserDriver;

  const NAV_LINKS: NavLinkItem[] = [
    {
      icon: <Home size={22} />,
      label: m.caring_topical_jackal_slurp(),
      description: m.big_patient_hawk_dance(),
      href: "/profile",
    },
    {
      icon: <Milestone size={22} />,
      label: m.candid_silly_stingray_tear(),
      description: m.ago_happy_kitten_snip(),
      href: "/profile/rides",
    },
    {
      icon: <Ticket size={22} />,
      label: m.long_upper_seal_revive(),
      description: m.flat_fresh_duck_bake(),
      href: "/profile/trips",
    },
    {
      icon: <Bell size={22} />,
      label: m.round_nimble_tern_zap(),
      description: m.fuzzy_front_canary_strive(),
      href: "/profile/my-posts",
    },
  ];

  const MANAGE_LINKS: NavLinkItem[] = [
    {
      icon: <Settings size={22} />,
      label: m.elegant_whole_crocodile_foster(),
      description: m.lazy_front_bird_feast(),
      href: "/profile/settings",
    },
  ];

  return (
    <div className="container">
      <MobileNavigation navLinks={NAV_LINKS} manageLinks={MANAGE_LINKS} />
      <div className="grid md:grid-cols-[300px,1fr]  gap-6 mt-5">
        <SidebarNavigation navLinks={NAV_LINKS} manageLinks={MANAGE_LINKS} />
        <div>
          <div>{children}</div>
          {/* <NotDriverAlert /> */}
        </div>
      </div>
    </div>
  );
}

type NavLinkItem = {
  icon: React.ReactNode;
  label: string;
  description: string;
  href: string;
};

type NavigationParams = {
  navLinks: NavLinkItem[];
  manageLinks: NavLinkItem[];
};

function MobileNavigation({ navLinks, manageLinks }: NavigationParams) {
  return (
    <div className="block md:hidden fixed bottom-0 z-50 w-full left-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 safe-area-inset-bottom">
      <div className="grid h-full grid-cols-5 max-w-md mx-auto">
        {[...navLinks, ...manageLinks].map(({ href, icon, label }) => (
          <MobileNavLink key={href} href={href} icon={icon} label={label} />
        ))}
      </div>
    </div>
  );
}

function SidebarNavigation({ navLinks, manageLinks }: NavigationParams) {
  return (
    <aside className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 hidden md:block h-fit shadow-sm">
      {/* Navigation Section */}
      <div>
        <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-3 mb-2">
          {m.alive_civil_skate_quiz()}
        </h3>
        <nav className="space-y-1">
          {navLinks.map((props) => (
            <SidebarNavigationLink key={props.href} {...props} />
          ))}
        </nav>
      </div>
      
      {/* Divider */}
      <div className="my-4 border-t border-gray-100 dark:border-gray-800" />
      
      {/* Manage Section */}
      <div>
        <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-3 mb-2">
          {m.drab_front_snake_ascend()}
        </h3>
        <nav className="space-y-1">
          {manageLinks.map((props) => (
            <SidebarNavigationLink key={props.href} {...props} />
          ))}
        </nav>
      </div>
    </aside>
  );
}
