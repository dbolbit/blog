import {FC, Suspense} from 'react'
import {Await, defer, LoaderFunction, useLoaderData, json} from "react-router-dom"
import PostsList, {IPost} from "./PostsList"

export type TypePostsFetch = {
  limit: number
  posts: IPost[]
  skip: number
  total: number
}


const PostTab: FC = (props) => {
  const {posts} = useLoaderData() as TypePostsFetch
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Await resolve={posts}>
        <PostsList/>
      </Await>
    </Suspense>
  )
}


export default PostTab

export const getPosts = async (id: number) => {
  const data = await fetch(`https://dummyjson.com/users/${id}/posts`)
  const result: TypePostsFetch = await data.json()
  return result
}
export const postsLoader: LoaderFunction = async () => {
  const id: number = Number(localStorage.getItem('id'))
  return defer({posts: getPosts(id)})
}

