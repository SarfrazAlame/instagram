import React from "react";
import SubmitButton from "./SubmitButton";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { followUser } from "@/lib/action";

const FollowButton = ({
  profileId,
  isfollowing,
  className,
  buttonClassName,
}: {
  profileId: string;
  isfollowing?: boolean;
  className?: string;
  buttonClassName?: string;
}) => {
  return (
    <form action={followUser} className={className}>
      <input type="hidden" value={profileId} name="id" />
      <SubmitButton
        className={buttonVariants({
          variant: isfollowing ? "secondary" : "ghost",
          className: cn("!font-bold w-full", buttonClassName),
          size: "sm",
        })}
      >
        {isfollowing ? "Unfollow" : "Follow"}
      </SubmitButton>
    </form>
  );
};

export default FollowButton;
