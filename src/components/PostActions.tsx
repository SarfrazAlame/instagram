import { PostWithExtras } from "@/lib/definitions";
import { cn } from "@/lib/utils";
import React from "react";
import LikeButton from "./LikeButton";
import Link from "next/link";
import { Book, MessageCircle } from "lucide-react";
import ActionIcon from "./ActionIcon";
import ShareButton from "./ShareButton";
import BookmarkButton from "./BookmarkButton";

const PostActions = ({
  post,
  userId,
  className,
}: {
  post: PostWithExtras;
  userId?: string;
  className?: string;
}) => {
  return (
    <div className={cn("relative flex items-start w-full gap-x-2", className)}>
      <LikeButton post={post} userId={userId} />
      <Link href={`/dashboard/p/${post.id}`} className="flex gap-4">
        <ActionIcon>
          <MessageCircle className={"h-6 w-6"} />
        </ActionIcon>
        <ShareButton postId={post.id} />
      </Link>
      <BookmarkButton post={post} userId={userId} />
    </div>
  );
};

export default PostActions;
