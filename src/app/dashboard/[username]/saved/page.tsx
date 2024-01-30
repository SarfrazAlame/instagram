import PostGrid from '@/components/PostGrid'
import { fetchSavedPostsByUsername } from '@/lib/data'
import React from 'react'

const page = async({params:{username}}:{params:{username:string}}) => {
    const savedPosts = await fetchSavedPostsByUsername(username)
    const posts = savedPosts?.map((savedPost)=>savedPost.post)
  return <PostGrid posts={posts}/>
}

export default page