"use client";
import { fetchPostById } from "@/lib/data";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const PostModal = ({ params: { id } }: Props) => {
  const post =  fetchPostById(id);

  if (!post) {
    throw new Error('not found')
  }

  return (
    <></>
    // <PostView id={id} post={post} />;
  );
};

export default PostModal;
