import { fetchPostById, fetchPostsByUsername } from '@/lib/data'
import React from 'react'

const MorePosts = async({postId}:{postId:string}) => {

    const post = await fetchPostById(postId)
    const postUsername = post?.user.username
    const posts = await fetchPostsByUsername(postUsername!,postId)

  return (
    <div>MorePosts</div>
  )
}

export default MorePosts