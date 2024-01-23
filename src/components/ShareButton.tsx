"use client";
import React from "react";
import ActionIcon from "./ActionIcon";
import { toast } from "sonner";
import { Link, Send } from "lucide-react";

const ShareButton = ({ postId }: { postId: string }) => {
  return (
    <ActionIcon
      onClick={() => {
        navigator.clipboard.writeText(
          `${window.location.origin}/dashboard/p/${postId}`
        );
        toast("Link copied to clipboard", {
          icon: <Link className={"h-5 w-5"} />,
        });
      }}
    >
      <Send />
    </ActionIcon>
  );
};

export default ShareButton;
