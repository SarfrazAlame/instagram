import React from "react";
import { Avatar } from "./ui/avatar";
import { AvatarProps } from "@radix-ui/react-avatar";
import { User } from "next-auth";
import Image from "next/image";

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
