import PostGrid from "@/components/PostGrid";
import { fetchPostsByUsername } from "@/lib/data";
import React from "react";

const ProfilePage = async ({
  params: { username },
}: {
  params: { username: string };
}) => {
  const posts = await fetchPostsByUsername(username);
  return <PostGrid posts={posts} />;
};

export default ProfilePage;