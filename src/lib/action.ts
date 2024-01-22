'use server'
import prisma from "./prisma"
import { CreatePost } from "./schemas"
import { getUserId } from "./utils"
import { z } from 'zod'

export default async function createPost(values: z.infer<typeof CreatePost>) {
    const userId = await getUserId()

    const validatedFields = CreatePost.safeParse(values)

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. failed to create post'
        }
    }

    const {fileUrl, caption} =  validatedFields.data

    // Create post logic
}