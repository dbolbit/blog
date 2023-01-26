import {FC, Suspense} from 'react'
import {Layout, Spin} from "antd"
import {Await, defer, useLoaderData} from "react-router-dom"
import PostsList from "../../components/userComponents/tabsElements/postsTab/PostsList"

const NewsPage: FC = (props) => {
  const {posts}: any = useLoaderData()

  return (
    <Layout>
      <Suspense fallback={<Spin className="spin-center"/>}>
        <Await resolve={posts}>
          <PostsList type="news"/>
        </Await>
      </Suspense>
    </Layout>
  )
}


export default NewsPage

const getNews = async () => {
  const data = await fetch('https://dummyjson.com/posts')
  const result = await data.json()
  return result
}
export const newsLoader = async () => {
  return defer({posts: getNews()})
}