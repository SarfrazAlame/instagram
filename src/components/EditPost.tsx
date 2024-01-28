'use client'
import { useMount } from "@/hooks/useMount";
import { UpdatePost } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Post } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

const EditPost = ({ id, post }: { id: string; post: Post }) => {
  const mount = useMount();
  const pathname = usePathname();
  const isEditPage = pathname === `/dashboard/p/${id}/edit`;
  const router = useRouter();
  const form = useForm<z.infer<typeof UpdatePost>>({
    resolver: zodResolver(UpdatePost),
    defaultValues: {
      id: post.id,
      caption: post.caption || "",
      fileUrl: post.fileUrl,
    },
  }); 
  const fileUrl = form.watch("fileUrl");

  if (!mount) return null;

  return (
    <Dialog open={isEditPage} onOpenChange={(open) => !open && router.back()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Info</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditPost;
