import {FC, Suspense, useEffect, useRef, useState} from 'react'
import {Layout, Spin} from "antd"
import {Await, defer, useLoaderData} from "react-router-dom"
import PostsList, {IPost} from "../../components/userComponents/tabsElements/postsTab/PostsList"
import {TypePostsFetch} from "../../components/userComponents/tabsElements/postsTab/PostTab"
import Filter from "../../components/postsComponents/Filter"


const NewsPage: FC = (props) => {
  const ref = useRef(null)
  const {posts}: any = useLoaderData()
  const [tags, setTags] = useState<string[]>([])
  const [filterTags, setFilterTags] = useState<string[]>([])
  useEffect(() => {
    (async function () {
      const response = await fetch('https://dummyjson.com/posts?select=tags&limit=150')
      const result: TypePostsFetch = await response.json()
      setTags(tagsFunc(result.posts))
    })()
  }, [])

  return (
    <Layout className="news" ref={ref}>
      <Suspense fallback={<Spin size="large" className="spin-center"/>}>
        <Await resolve={posts}>
          <div className="news_container">
            <section className="news_filter">
              <Filter tags={tags} setFilterTags={setFilterTags}/>
            </section>
            <PostsList tags={filterTags} type="news"/>
          </div>
        </Await>
      </Suspense>
    </Layout>
  )
}


export default NewsPage

export const getNews = async () => {
  const data = await fetch('https://dummyjson.com/posts')
  const result = await data.json()
  return result
}
export const newsLoader = async () => {
  return defer({posts: getNews()})
}

function tagsFunc(data: IPost[]) {
  const tags = new Set()
  data.forEach(el => el.tags?.forEach(tag => tags.add(tag)))
  return Array.from(tags) as string[]
}