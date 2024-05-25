"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { buttonVariants } from "./ui/button";
import UserAvatar from "./UserAvatar";

type User = {
  id: string;
  username?: string | null;
  name: string | null | undefined;
  bio: string | null;
  website: string | null;
  gender: string | null;
  email: string | null | undefined;
  emailVerified: Date | null;
  image: string | null | undefined;
  createdAt: Date;
  updatedAt: Date;
};

const ProfileLink = ({ user }: { user: User }) => {
  const pathname = usePathname();

  const href = `/dashboard/${user.username}`;

  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={buttonVariants({
        variant: isActive ? "secondary" : "ghost",
        className: "navLink",
        size: "lg",
      })}
    >
      <UserAvatar user={user} />

      <p className={`${cn("hidden lg:block", { "font-extrabold": isActive })}`}>
        Profile
      </p>
    </Link>
  );
};

export default ProfileLink;
