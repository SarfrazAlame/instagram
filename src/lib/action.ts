'use server'
import { revalidatePath } from "next/cache"
import prisma from "./prisma"
import { BookmarkSchema, CreatePost, DeletePost, LikeSchema } from "./schemas"
import { getUserId } from "./utils"
import { z } from 'zod'
import { redirect } from "next/navigation"

export default async function createPost(values: z.infer<typeof CreatePost>) {
    const userId = await getUserId()

    const validatedFields = CreatePost.safeParse(values)

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. failed to create post'
        }
    }

    const { fileUrl, caption } = validatedFields.data

    // Create post logic
    try {
        await prisma.post.create({
            data: {
                caption,
                fileUrl,
                user: {
                    connect: {
                        id: userId
                    }
                }
            }
        })
    } catch (error) {
        return {
            message: "Database Error: failed to create post"
        }
    }

    revalidatePath('/dashboard')
    redirect('/dashboard')
}



export async function deletePost(formData: FormData) {
    const userId = await getUserId()
    const { id } = DeletePost.parse({
        id: formData.get('id')
    })

    const post = await prisma.post.findUnique({
        where: {
            id,
            userId
        }
    })

    if (!post) {
        throw new Error("Post not found")
    }

    try {
        await prisma.post.delete({
            where: {
                id
            }
        })
        revalidatePath('/dashboard')
        return { message: "Delete Post." }
    } catch (error) {
        return { messsage: 'datebase Error: failed to delete post' }
    }
}


export async function likePost(value: FormDataEntryValue | null) {
    const userId = await getUserId()

    const validatedFields = LikeSchema.safeParse({ postId: value })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to Like Post"
        }
    }

    const { postId } = validatedFields.data

    const post = await prisma.post.findUnique({
        where: {
            id: postId
        }
    })

    if (!post) {
        throw new Error("Post not found")
    }

    const like = await prisma.like.findUnique({
        where: {
            postId_userId: {
                postId,
                userId
            }
        }
    })

    if (like) {
        try {
            await prisma.like.delete({
                where: {
                    postId_userId: {
                        postId,
                        userId
                    }
                }
            })
            revalidatePath('/dashboard')
            return { message: "Unliked Post" }
        } catch (error) {
            return { message: "database Error: failed to unlike Post" }
        }
    }

    try {
        await prisma.like.create({
            data: {
                postId,
                userId
            }
        })
        revalidatePath('/dashboard')
        return { message: "Liked post." }
    } catch (error) {
        return { message: "Database Error: Failed to Like Post" }
    }

}


export async function bookmarkPost(value: FormDataEntryValue | null) {
    const userId = await getUserId()
    const validatedFields = BookmarkSchema.safeParse({ postId: value })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to bookmark Post"
        }
    }

    const { postId } = validatedFields.data

    const post = await prisma.post.findUnique({
        where: {
            id: postId
        }
    })

    if (!post) {
        throw new Error("Post not founded")
    }

    const bookmark = await prisma.savedPost.findUnique({
        where: {
            postId_userId: {
                postId,
                userId
            }
        }
    })

    if (bookmark) {
        try {
            await prisma.savedPost.delete({
                where: {
                    postId_userId: {
                        postId,
                        userId
                    }
                }
            })
            revalidatePath('/dashboard')
            return { message: "Unbookmarked Post" }
        } catch (error) {
            return {
                message: "Database Error: Failed to Unbookmark Post"
            }
        }
    }

    try {
        await prisma.savedPost.create({
            data:{
                postId,
                userId
            }
        })
        revalidatePath("/dashboard")
        return {message:"Bookmarked Post."}
    } catch (error) {
        return {
            message:"Database Error: Failed to bookmark Post"
        }
    }
}