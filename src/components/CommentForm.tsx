import { CreateComment } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "./ui/form";
import { createComment } from "@/lib/action";
import { cn } from "@/lib/utils";

const CommentForm = ({
  postId,
  className,
  inputRef,
}: {
  postId: string;
  className?: string;
  inputRef?: React.Ref<HTMLInputElement>;
}) => {
  const form = useForm<z.infer<typeof CreateComment>>({
    resolver: zodResolver(CreateComment),
    defaultValues: {
      body: "",
      postId,
    },
  });
  const body = form.watch('body')
  const isSubmitting = form.formState.isSubmitting


  return <Form {...form}>
    <form onSubmit={form.handleSubmit(async(values)=>{
        await createComment(values)
        form.reset()
    })}
    className={cn('border-b relative border-gray-200 dark:border-neutral-800 py-3 flex items-center space-x-2 w-full px-3 ', className)}
    ></form>
  </Form>
};

export default CommentForm;
