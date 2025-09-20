import { Button } from '@/components/ui/button';
import { getUser } from '@/lib/utils/auth';
import { cn } from '@/lib/utils/cn';
import {
  AlertTriangle,
  Home,
  Milestone,
  Settings,
  ShieldQuestion,
  Ticket,
} from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import { SidebarNavigationLink } from './side-navigation-link';
import db from '@/lib/utils/db';

import * as m from '@/paraglide/messages.js';
import NotDriverAlert from './not-driver-alert';

type LayoutProps = {
  children: React.ReactNode;
};

export default async function ProfileLayout({ children }: LayoutProps) {
  const user = await getUser();

  if (!user) redirect('/');

  const driverRequest = await db.driverVerificationRequest.findUnique({
    where: {
      driverId: user.id,
    },
  });

  const firstCar = await db.car.findFirst({
    where: {
      ownerId: user.id,
    },
  });

  const firstRide = await db.ride.findFirst({
    where: {
      driverId: user.id,
    },
  });

  const isUserDriver = driverRequest && driverRequest.status === 'APPROVED';

  const showDriverAlert = (firstCar || firstRide) && !isUserDriver;

  const NAV_LINKS: SidebarNavigationLink[] = [
    {
      icon: <Home size={22} />,
      label: m.caring_topical_jackal_slurp(),
      description: m.big_patient_hawk_dance(),
      href: '/profile',
    },
    {
      icon: <Milestone size={22} />,
      label: m.candid_silly_stingray_tear(),
      description: m.ago_happy_kitten_snip(),
      href: '/profile/rides',
    },
    {
      icon: <Ticket size={22} />,
      label: m.long_upper_seal_revive(),
      description: m.flat_fresh_duck_bake(),
      href: '/profile/trips',
    },
  ];

  const MANAGE_LINKS: SidebarNavigationLink[] = [
    {
      icon: <Settings size={22} />,
      label: m.elegant_whole_crocodile_foster(),
      description: m.lazy_front_bird_feast(),
      href: '/profile/settings',
    },
  ];

  return (
    <div className="container">
      <MobileNavigation navLinks={NAV_LINKS} manageLinks={MANAGE_LINKS} />
      <div className="grid md:grid-cols-[300px,1fr]  gap-6 mt-5">
        <SidebarNavigation navLinks={NAV_LINKS} manageLinks={MANAGE_LINKS} />
        <div>
          <div>{children}</div>
          <NotDriverAlert />
        </div>
      </div>
    </div>
  );
}

type NavigationParams = {
  navLinks: SidebarNavigationLink[];
  manageLinks: SidebarNavigationLink[];
};

type SidebarNavigationLink = {
  icon: React.ReactNode;
  label: string;
  description: string;
  href: string;
};

function MobileNavigation({ navLinks, manageLinks }: NavigationParams) {
  return (
    <div className="block md:hidden fixed bottom-0 z-50 w-full left-0 bg-white border-t border-gray-200">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto">
        {[...navLinks, ...manageLinks].map(
          ({ description, href, icon, label }, index) => (
            <Link
              key={index}
              href={href}
              data-tooltip-target="tooltip-home"
              type="button"
              className="inline-flex flex-col items-center justify-center p-4 py-5 hover:bg-gray-50 group"
            >
              {icon}
              <span className="sr-only">{label}</span>
            </Link>
          )
        )}
      </div>
    </div>
  );
}

function SidebarNavigation({ navLinks, manageLinks }: NavigationParams) {
  return (
    <aside className="bg-white border-2  rounded-md p-5 hidden md:block h-fit">
      <div>
        <h3 className="text-sm font-semibold">{m.alive_civil_skate_quiz()}</h3>
        {navLinks.map((props, index) => (
          <SidebarNavigationLink key={index} {...props} />
        ))}
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-semibold">{m.drab_front_snake_ascend()}</h3>
        {manageLinks.map((props, index) => (
          <SidebarNavigationLink key={index} {...props} />
        ))}
      </div>
    </aside>
  );
}
