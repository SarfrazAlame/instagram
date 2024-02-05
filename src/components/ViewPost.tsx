import { cn } from "@/lib/utils";
import React from "react";

const ViewPost = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex p-3", className)}>
      <button onClick={() => window.location.reload()}>View Post</button>
    </div>
  );
};

export default ViewPost;
