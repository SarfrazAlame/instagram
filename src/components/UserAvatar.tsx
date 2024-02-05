import React from "react";
import { Avatar } from "./ui/avatar";
import { AvatarProps } from "@radix-ui/react-avatar";
import Image from "next/image";

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

type Props = Partial<AvatarProps> & {
  user: User | undefined;
};

function UserAvatar({ user, ...avatarProps }: Props) {
  return (
    <Avatar className="relative h-8 w-8" {...avatarProps}>
      <Image
        src={
          user?.image ||
          "https://tse3.mm.bing.net/th?id=OIP.COQ9NdH7efShcOKQ3YmdGgAAAA&pid=Api&P=0&h=220"
        }
        fill
        alt={`${user?.name}'s profile picture`}
        className="rounded-full object-cover"
      />
    </Avatar>
  );
}

export default UserAvatar;
