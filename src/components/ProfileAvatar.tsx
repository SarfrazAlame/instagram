"use client";
import { useMount } from "@/hooks/useMount";
import { UserWithExtras } from "@/lib/definitions";
import { UpdateUser } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import UserAvatar from "./UserAvatar";
import { Dialog, DialogTrigger } from "./ui/dialog";

const ProfileAvatar = ({
  user,
  children,
}: {
  user: UserWithExtras;
  children: React.ReactNode;
}) => {
  const { data: session } = useSession();
  const isCurrentUser = session?.user.id === user.id;
  const form = useForm<z.infer<typeof UpdateUser>>({
    resolver: zodResolver(UpdateUser),
    defaultValues: {
      id: user.id,
      image: user.image || "",
      name: user.name || "",
      username: user.username || "",
    },
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const mount = useMount();

  if (!mount || !session) return null;

  if (!isCurrentUser) {
    return <UserAvatar user={user} className="w-20 h-20 md:w-36 md:h36" />;
  }
  return  (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
    </Dialog>
  )
};

export default ProfileAvatar;
