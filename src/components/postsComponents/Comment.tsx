import {FC, useEffect, useState} from 'react'
import {CommentsType} from "./Post"
import {Avatar} from "antd"
import {Link} from "react-router-dom"

interface CommentProp {
  data: CommentsType
}

const Comment: FC<CommentProp> = ({data}) => {
  const {id, body, postId, user} = data
  const [img, setImg] = useState<string>('')
  useEffect(() => {
    (async function () {
      const data = await fetch(`https://dummyjson.com/users/${user.id}?select=image`)
      const result: { id: number, image: string } = await data.json()
      setImg(result.image)
    })()
  }, [])

  return (
    <section className="comment">
      <div>
        <Link to={`/users/${user.id}`}>@{user.username}</Link>
        <p style={{fontWeight: 'bold'}}>{body}</p>
      </div>
      <Avatar src={img}/>
    </section>
  )
}


export default Comment