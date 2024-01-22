import { PostWithExtras } from "@/lib/definitions";
import React from "react";
import { auth } from "../../auth";
import UserAvatar from "./UserAvatar";
import Timestamp from "./Timestamp";
import PostOptions from "./PostOptions";

const Post = async ({ post }: { post: PostWithExtras }) => {
  const session = await auth();
  const userId = session?.user?.id;

  const { username } = post.user;

  if (!session?.user) return null;

  return (
    <div className="flex flex-col space-y-2.5">
      <div className="flex items-center justify-between px-3 sm:px-0">
        <div className="flex space-x-3 items-center">
          <UserAvatar user={post.user} />
          <div className="text-sm">
            <p className="space-x-1">
              <span className="font-semibold">{username}</span>
              <span className="font-medium text-neutral-500 dark:text-neutral-400 text-sm">
                .
              </span>
              <Timestamp createdAt={post.createdAt} />
            </p>

            <p>India, Bihar Gopalganj</p>
          </div>
        </div>

        <PostOptions post={post} userId={userId} />
      </div>
    </div>
  );
};

export default Post;
