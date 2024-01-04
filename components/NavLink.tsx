"use client";
import {
  Clapperboard,
  Compass,
  Home,
  MessageCircle,
  PlusSquare,
  Search,
} from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "Home",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Search",
    href: "/dashboard/search",
    icon: Search,
    hideOnMobile: true,
  },
  {
    name: "Explore",
    href: "/dashboard/explore",
    icon: Compass,
  },
  {
    name: "Reels",
    href: "/dashboard/reels",
    icon: Clapperboard,
  },
  {
    name: "Message",
    href: "/dashboard/message",
    icon: MessageCircle,
  },
  {
    name: "Notifications",
    href: "/dashboard/notificaions",
    icon: Compass,
  },
  {
    name: "Create",
    href: "/dashboard/create",
    icon: PlusSquare,
  },
];

const NavLink = () => {
  const pathname = usePathname();
  return (
    <div>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={buttonVariants({
              variant: isActive ? "secondary" : "ghost",
              className: cn("navLink", { "hidden md:flex": link.hideOnMobile }),
              size: "lg",
            })}
          >
            <LinkIcon className="w-6" />
            <p
              className={`${cn("hidden lg:block", {
                "font-extrabold": isActive,
              })}`}
            >
              {link.name}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

export default NavLink;
