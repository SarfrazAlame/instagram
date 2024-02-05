'use server'
import { revalidatePath } from "next/cache"
import { db } from "./prisma"
import { BookmarkSchema, CreateComment, CreatePost, DeleteComment, DeletePost, FollowUser, LikeSchema, UpdatePost, UpdateUser } from "./schemas"
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
        await db.post.create({
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

    const post = await db.post.findUnique({
        where: {
            id,
            userId
        }
    })

    if (!post) {
        throw new Error("Post not found")
    }

    try {
        await db.post.delete({
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

    const post = await db.post.findUnique({
        where: {
            id: postId
        }
    })

    if (!post) {
        throw new Error("Post not found")
    }

    const like = await db.like.findUnique({
        where: {
            postId_userId: {
                postId,
                userId
            }
        }
    })

    if (like) {
        try {
            await db.like.delete({
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
        await db.like.create({
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

    const post = await db.post.findUnique({
        where: {
            id: postId
        }
    })

    if (!post) {
        throw new Error("Post not founded")
    }

    const bookmark = await db.savedPost.findUnique({
        where: {
            postId_userId: {
                postId,
                userId
            }
        }
    })

    if (bookmark) {
        try {
            await db.savedPost.delete({
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
        await db.savedPost.create({
            data: {
                postId,
                userId
            }
        })
        revalidatePath("/dashboard")
        return { message: "Bookmarked Post." }
    } catch (error) {
        return {
            message: "Database Error: Failed to bookmark Post"
        }
    }
}


export async function createComment(values: z.infer<typeof CreateComment>) {
    const userId = await getUserId()

    const validatedFields = CreateComment.safeParse(values)

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to Create Comment."
        }
    }

    const { postId, body } = validatedFields.data

    const post = await db.post.findUnique({
        where: {
            id: postId
        }
    })

    if (!post) {
        throw new Error("Post not found");
    }

    try {
        await db.comment.create({
            data: {
                body,
                postId,
                userId,
            }
        })
        revalidatePath('/dashboard');
        return { messsage: "Created Comment" }
    } catch (error) {
        return {
            message: "Database Error: Failed to Create Comment"
        }
    }
}

export async function deleteComment(formData: FormData) {
    const userId = await getUserId()

    const { id } = DeleteComment.parse({
        id: formData.get('id')
    })

    const comment = await db.comment.findUnique({
        where: {
            id,
            userId
        }
    })

    if (!comment) {
        throw new Error("Comment not found")
    }
    try {
        await db.comment.delete({
            where: {
                id
            }
        })
        revalidatePath('/dashboard')
        return { message: "Comment deleted" }
    } catch (error) {
        return { message: "database Error: failed to delete comment" }
    }
}

export async function updatePost(values: z.infer<typeof UpdatePost>) {
    const userId = await getUserId()

    const validatedFields = UpdatePost.safeParse(values)

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing fields. failed to update post"
        }
    }

    const { id, fileUrl, caption } = validatedFields.data

    const post = await db.post.findUnique({
        where: {
            id,
            userId
        }
    })

    if (!post) {
        throw new Error("Post not found")
    }

    try {
        await db.post.update({
            where: {
                id
            },
            data: {
                fileUrl,
                caption
            }
        })

    } catch (error) {
        return { message: "database error: Failed to Update Post" }
    }

    revalidatePath("/dashboard")
    redirect("/dashboard")
}

export async function updateProfile(values: z.infer<typeof UpdateUser>) {
    const userId = await getUserId()

    const validatedFields = UpdateUser.safeParse(values)

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing fields. Failed to Update Profile"
        }
    }
    const { bio, gender, image, name, username, website } = validatedFields.data

    try {
        await db.user.update({
            where: {
                id: userId
            },
            data: {
                username,
                name,
                bio,
                gender,
                image,
                website
            }
        })
        revalidatePath('/dashboard')
        return { message: "Updated Profile" }
    } catch (error) {
        return { message: "database error: Failed to Update Profile" }
    }

}


export async function followUser(formData: FormData) {
    const userId = await getUserId()

    const { id } = FollowUser.parse({ id: formData.get("id") })

    const user = await db.user.findUnique({
        where: {
            id
        }
    });

    if (!user) {
        throw new Error('User not found')
    }

    const follows = await db.follows.findUnique({
        where: {
            followerId_followingId: {
                // followerId is of the person who wants to follow
                followerId: userId,
                // followingId is of the person who is being followed
                followingId: id
            }
        }
    })

    if (follows) {
        try {
            await db.follows.delete({
                where: {
                    followerId_followingId: {
                        followerId: userId,
                        followingId: id
                    }
                }
            })
            revalidatePath('/dashboard')
            return { message: "Unfollowed User" }
        } catch (error) {
            return {
                message: "Database Error: Failed to Unfollow User"
            }
        }
    }

    try {
        await db.follows.create({
            data: {
                followerId: userId,
                followingId: id
            }
        })
        revalidatePath('/dashboard')
    } catch (error) {
        return {
            message: "Database Error: failed to Follow User"
        }
    }
}