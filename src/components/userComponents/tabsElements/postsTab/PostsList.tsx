import React, {FC, Ref, useEffect, useRef, useState} from 'react'
import {useAsyncValue} from "react-router-dom"
import {TypePostsFetch} from "./PostTab"
import {Layout} from "antd"
import Post, {PostProps} from "../../../postsComponents/Post"
import withUser from "../../../../hoc/withUser"

export interface IPost {
  body: string
  id: number
  reactions: number
  tags?: string[]
  title: string
  userId?: number
}

type PostListProps = {
  tags?: string[]
  type?: 'news' | 'post'
}

const PostsList: FC<PostListProps> = ({tags, type}) => {
  const {posts, total} = useAsyncValue() as TypePostsFetch
  const [postsList, setPostsList] = useState<IPost[]>(posts)
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const handlerScroll = (e: Event) => {
    e.preventDefault()
    if (window.innerHeight + window.scrollY + (window.innerHeight) > document.body.scrollHeight && postsList.length < total) {
      setIsFetching(true)
    }

  }
  useEffect(() => {
    document.addEventListener('scroll', handlerScroll)
    return () => document.removeEventListener('scroll', handlerScroll)
  },)
  useEffect(() => {
    (async function () {
      if (isFetching) {
        const response = await fetch(`https://dummyjson.com/posts?limit=30&skip=${postsList.length}`)
        const result: TypePostsFetch = await response.json()
        setPostsList(prev => [...prev, ...result.posts])
        setIsFetching(false)
      }
    })()

  }, [isFetching])


  return (
    <Layout className="posts_list_container">
      {postsList.map(el => <Post post={el} key={el.id} type={type}/>)}
    </Layout>
  )
}


export default PostsList