import { fetchPosts } from "@/lib/data";
import React from "react";
import Post from "./Post";
import { PostWithExtras } from "@/lib/definitions";

const Posts = async () => {
  const posts = await fetchPosts();
  return (
    <>
      {posts.map((post: PostWithExtras) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
};

export default Posts;
