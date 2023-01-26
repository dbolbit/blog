import React, {FC, useState, useRef, useEffect, forwardRef, Ref, ReactElement} from 'react'
import {IPost} from "../userComponents/tabsElements/postsTab/PostsList"
import {Card} from "antd"
import {CaretDownFilled, HeartFilled, CaretUpFilled} from '@ant-design/icons'
import Comment from "./Comment"

export interface PostProps {
  post: IPost,
  children?: ReactElement
}

export type CommentsType = {
  id: number
  body: string
  postId: number
  user: {
    id: number
    username: string
  }
}
export type FetchType = {
  total: number
  limit: number
  skip: number
}

interface CommentFetchType extends FetchType {
  comments: CommentsType[]
}

const Post: FC<PostProps> = ({post, children}) => {

  const pRef = useRef<HTMLParagraphElement | null>(null)
  const {title, body, reactions, id, tags} = post
  const [comments, setComments] = useState<CommentsType[]>([])
  const [likes, setLikes] = useState<number>(reactions)
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const [isShow, setIsShow] = useState<boolean>(false)
  const [isHidden, setIsHidden] = useState<boolean>(false)
  const [isCommentShow, setIsCommentShow] = useState<boolean>(false)

  const handlerLikeClick = () => {
    setLikes(prev => isLiked ? prev - 1 : prev + 1)
    setIsLiked(!isLiked)
  }
  useEffect(() => {
    const e: HTMLParagraphElement | null = pRef.current
    if (e?.offsetHeight && e?.scrollHeight && e?.offsetHeight < e?.scrollHeight) {
      setIsHidden(true)
    }
  },)

  useEffect(() => {
    (async function () {
      try {
        const data = await fetch(`https://dummyjson.com/comments/post/${id}`)
        const result: CommentFetchType = await data.json()
        setComments(result.comments)
        // console.log(result.comments)
      } catch (e) {
        console.log(e)
      }
    })()
  }, [id])

  const postTitle = (
    <div>
      <span>{title}</span>
      <section className="post_tag_container">{tags?.map(el => <span key={el}>#{el}</span>)}</section>
    </div>
  )
  return (
    <Card className="post" title={postTitle}
          extra={isHidden && <a onClick={() => setIsShow(!isShow)}>{!isShow ? 'more..' : 'less..'}</a>}>
      <p style={{display: isShow ? '' : '-webkit-box'}} className="post_info" ref={pRef}>{body}</p>
      <span className={`post_likes ${isLiked && 'post_likes__active'}`}>{likes} <HeartFilled
        onClick={handlerLikeClick}/></span>
      {comments.length && (
        <div className="comment_container">
          {
            isCommentShow &&
            <>
              {comments.map(el => <Comment key={el.id} data={el}/>)}
              {children}
            </> || <span>({comments.length} коментариев)</span>
          }
          <CaretDownFilled className="post_comment_btn" onClick={() => setIsCommentShow(!isCommentShow)}/>

        </div>
      )}

    </Card>
  )
}


export default Post
// export const MPost = motion(Post)

