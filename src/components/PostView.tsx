"use client";
import { PostWithExtras } from "@/lib/definitions";
import React, { useRef } from "react";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import UserAvatar from "./UserAvatar";
import { useSession } from "next-auth/react";
import { useMount } from "@/hooks/useMount";
import { ScrollArea } from "./ui/scroll-area";

const PostView = ({ id, post }: { id: string; post: PostWithExtras }) => {
  const pathname = usePathname();
  const router = useRouter();
  const isPostModal = pathname === `/dashboard/p/${id}`;
  const { data: session, status } = useSession();
  const user = session?.user;
  const inputRef = useRef<HTMLInputElement>(null);
  const username = post.user.username;
  const href = `/dashboard/${username}`;
  const mount = useMount();

  if (!mount) return null;

  console.log(post);

  return (
    <Dialog open={isPostModal} onOpenChange={(open) => !open && router.back()}>
      <DialogContent className="flex gap-0 flex-col md:flex-row items-start ">
        <div className="flex flex-col justify-between md:h-full md:order-2 w-full max-w-md ">
          <DialogHeader className="flex border-b space-y-0 space-x-2.5 flex-row items-center py-4 pl-3.5 pr-6">
            <Link href={href}>
              <UserAvatar user={post.user} />
            </Link>
            <Link href={href} className="font-semibold text-sm">
              {username}
            </Link>
          </DialogHeader>

          <ScrollArea></ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostView;
