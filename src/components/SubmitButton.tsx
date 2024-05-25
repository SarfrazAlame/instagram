"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { ButtonProps } from "./ui/button";

type Props = ButtonProps & {
  children: React.ReactNode;
};

export default function SubmitButton({ children, ...props }: Props) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} {...props}>
      {children}
    </button>
  );
}
