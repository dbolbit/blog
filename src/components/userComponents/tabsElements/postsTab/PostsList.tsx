import {FC, useEffect} from 'react'
import {useAsyncValue} from "react-router-dom"
import {TypePostsFetch} from "./PostTab"
import {Layout} from "antd"
import Post from "../../../postsComponents/Post"
import withUserPost from "../../../../HOC/withUserPost"

export interface IPost {
  body: string
  id: number
  reactions: number
  tags?: string[]
  title: string
  userId?: number
}


interface PostListProps {
  type?: 'post' | 'news'
}

const PostsList: FC<PostListProps> = ({type = 'post'}) => {
  const {posts} = useAsyncValue() as TypePostsFetch
  const NewsPost = withUserPost(Post)
  const Posts = posts.map(el => type === 'post' ? <Post key={el.id} post={el}/>
    : type === 'news' ? <NewsPost post={el} key={el.id}/> : null)

  console.log(posts)
  return (
    <Layout className="posts_list_container">
      {Posts}
    </Layout>
  )
}


export default PostsList