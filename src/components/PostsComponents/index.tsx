import React from 'react'
import { PostType } from '../../Types/PostType'
import EmptyList from '../EmptyList'
import PostItem from '../PostItem'

interface PostsComponentsProps{
  posts:PostType[] | []
}

const PostsComponents: React.FC<PostsComponentsProps> = ({ posts }) => {
  return (
    <>
      {
        posts.length > 0
          ?
          posts.map((item: PostType) =>
            <PostItem key={`${item._id}`} item={item} />
          )
          :
          <EmptyList />
      }
    </> 
  )
}

export default PostsComponents