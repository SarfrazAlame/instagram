import { PostWithExtras } from "@/lib/definitions";
import { cn } from "@/lib/utils";
import React from "react";
import LikeButton from "./LikeButton";
import Link from "next/link";
import { Book, MessageCircle } from "lucide-react";

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
    <div className={cn("relative flex items-center w-full gap-x-2", className)}>
      <LikeButton post={post} userId={userId} />
      <Link href={`/dashboard/p/${post.id}`}>
      {/* <ActionIcon>
          <MessageCircle className="h-6 w-6"/>
      </ActionIcon>
      <ShareButton postId={post.id}/>
      <BookmarkButton post={post} userId={userId}/> */}
      </Link>
    </div>
  );
};

export default PostActions;
