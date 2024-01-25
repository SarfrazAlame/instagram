"use client";
import PostView from "@/components/PostView";
import { fetchPostById } from "@/lib/data";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

async function PostModal({ params: { id } }: Props) {
  const post = await fetchPostById(id);

  if (!post) {
    throw new Error("not foundsd");
  }
  console.log(post)

  return <PostView id={id} post={post} />;
}

export default PostModal;
