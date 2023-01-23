import {FC} from 'react'
import {CommentsType} from "./Post"

interface CommentProp {
  data: CommentsType
}

const Comment: FC<CommentProp> = ({data}) => {
  const {id, body, postId, user} = data

  return (
    <section className="comment">
      <p>{body}</p>
    </section>
  )
}


export default Comment