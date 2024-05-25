"use client";

import { PostWithExtras } from "@/lib/definitions";
import { SavedPost } from "@prisma/client";
import React, { useOptimistic } from "react";
import ActionIcon from "./ActionIcon";
import { cn } from "@/lib/utils";
import { Bookmark } from "lucide-react";
import { bookmarkPost } from "@/lib/action";

type Props = {
  post: PostWithExtras;
  userId?: string;
};

const BookmarkButton = ({ post, userId }: Props) => {
  const predicate = (bookmark: SavedPost) =>
    bookmark.userId === userId && bookmark.postId === post.id;
  const [optimisticBookmarks, addOptimisticsBookmarks] = useOptimistic<
    SavedPost[]
  >(
    post.savedBy,
    // @ts-ignore
    (state: SavedPost[], newBookmark: SavedPost) =>
      state.find(predicate)
        ? // here we ckeck if the bookmark already exists, if it does, we remove it, if it doesn't, we add it
          state.filter((bookmark) => bookmark.userId !== userId)
        : [...state, newBookmark]
  );
  return (
    <form
      action={async (formData: FormData) => {
        const postId = formData.get("postId");
        addOptimisticsBookmarks({ postId, userId });
        await bookmarkPost(postId);
      }}
      className="ml-auto"
    >
      <input type="hidden" name="postId" value={post.id} />

      <ActionIcon>
        <Bookmark
          className={cn("h-6 w-6 ", {
            "dark:fill-white fill-black": optimisticBookmarks.some(predicate),
          })}
        />
      </ActionIcon>
    </form>
  );
};

export default BookmarkButton;
