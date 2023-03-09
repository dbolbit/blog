import React, {FC, memo, useEffect, useState, useMemo, useCallback} from 'react'
import {CommentsType} from "../Post"
import {Avatar} from "antd"
import {Link} from "react-router-dom"

interface CommentProp {
  data: CommentsType
}

type UserImageDAta = {
  id: number,
  image: string
}

const Comment: FC<CommentProp> = ({data}) => {
  const {body, user} = data
  const [img, setImg] = useState<string>('')
  useEffect(() => {
    const fetchImg = async (id: number) => {
      const json = await getUserImage(id)
      setImg(json.image)
    }
    fetchImg(user.id)
  }, [data])


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


export default memo(Comment)

export async function getUserImage(id: number | undefined) {
  const data = await fetch(`https://dummyjson.com/users/${id}?select=image`)
  const result: UserImageDAta = await data.json()
  return result

}