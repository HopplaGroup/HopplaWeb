"use client";
import { cn } from "@/lib/utils/cn";
import { languageTag } from "@/paraglide/runtime";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type SidebarNavigationLinkProps = {
  icon: ReactNode;
  label: string;
  description: string;
  href: string;
};

export function SidebarNavigationLink({
  description,
  href,
  icon,
  label,
}: SidebarNavigationLinkProps) {
  const pathname = usePathname();
  const isActive =
    (pathname.includes(href) && href !== "/profile") ||
    (href === "/profile" && pathname === `/${languageTag()}/profile`);
  
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center gap-3 p-3 rounded-xl transition-all duration-200",
        isActive
          ? "bg-primary/10 text-primary"
          : "hover:bg-gray-50 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center size-10 rounded-lg transition-colors",
          isActive
            ? "bg-primary text-white"
            : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 group-hover:bg-gray-200 dark:group-hover:bg-gray-700"
        )}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h2 className={cn(
          "text-sm font-semibold truncate",
          isActive ? "text-primary" : "text-gray-900 dark:text-gray-100"
        )}>
          {label}
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
          {description}
        </p>
      </div>
      <ChevronRight 
        className={cn(
          "size-4 transition-transform",
          isActive 
            ? "text-primary" 
            : "text-gray-300 dark:text-gray-600 group-hover:text-gray-400 group-hover:translate-x-0.5"
        )} 
      />
    </Link>
  );
}

type MobileNavLinkProps = {
  icon: ReactNode;
  label: string;
  href: string;
};

export function MobileNavLink({ href, icon, label }: MobileNavLinkProps) {
  const pathname = usePathname();
  const isActive =
    (pathname.includes(href) && href !== "/profile") ||
    (href === "/profile" && pathname === `/${languageTag()}/profile`);

  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col items-center justify-center py-2 px-1 transition-colors relative",
        isActive
          ? "text-primary"
          : "text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
      )}
    >
      {isActive && (
        <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-full" />
      )}
      <span className={cn(
        "transition-transform",
        isActive && "scale-110"
      )}>
        {icon}
      </span>
      <span className="text-[10px] mt-1 font-medium truncate max-w-full">
        {label}
      </span>
    </Link>
  );
}
