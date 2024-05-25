import React from "react";
import { Button, ButtonProps } from "./ui/button";

type Props = Partial<ButtonProps> & {
  children: React.ReactNode;
};

function ActionIcon({ children, ...butttonProps }: Props) {
  return (
    <Button
      type="submit"
      variant={"ghost"}
      size={"icon"}
      className="h-9 w-9"
      {...butttonProps}
    >
      {children}
    </Button>
  );
}

export default ActionIcon;
