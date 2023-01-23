import {FC, useEffect} from 'react'
import {useAsyncValue} from "react-router-dom"
import {TypePostsFetch} from "./PostTab"
import {Layout} from "antd"
import Post from "../../../postsComponents/Post"

export interface IPost {
  body: string
  id: number
  reactions: number
  tags?: string[]
  title: string
  userId?: number
}


const PostsList: FC = (props) => {
  const {posts} = useAsyncValue() as TypePostsFetch

  console.log(posts)
  return (
    <Layout className="posts_list_container">
      {posts.map(el => <Post
        key={el.id} post={el}/>)}
    </Layout>
  )
}


export default PostsList