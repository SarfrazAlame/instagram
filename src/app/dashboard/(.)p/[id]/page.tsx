import PostView from "@/components/PostView";
import { fetchPostById } from "@/lib/data";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

async function PostModal({ params: { id } }: Props) {

  const post = await fetchPostById(id);

  if (!post) {
    return notFound()
  }

  return <PostView id={id} post={post} />;
}

export default PostModal;
