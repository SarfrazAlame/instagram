import EditPost from "@/components/EditPost";
import { fetchPostById } from "@/lib/data";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const EditPage = async ({ params: { id } }: Props) => {
  const post = await fetchPostById(id);

  if (!post) {
    notFound();
  }

  return <EditPost id={id} post={post} />;
};

export default EditPage;
