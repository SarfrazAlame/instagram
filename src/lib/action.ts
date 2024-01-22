'use server'
import { revalidatePath } from "next/cache"
import prisma from "./prisma"
import { CreatePost, DeletePost } from "./schemas"
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

export default async function deletePost(formData:FormData){
    const userId = await getUserId()
    const {id} = DeletePost.parse({
        id:formData.get('id')
    })

    
}