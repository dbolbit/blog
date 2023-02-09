import React, {FC, useState, useRef, useEffect, forwardRef, Ref, ReactElement, ChangeEvent, memo, useMemo} from 'react'
import {IPost} from "../userComponents/tabsElements/postsTab/PostsList"
import {Avatar, Card, Space} from "antd"
import {CaretDownFilled, HeartFilled, CaretUpFilled} from '@ant-design/icons'
import Comment, {getUserImage} from "./Comment"
import {Input} from 'antd'
import {useAppSelector} from "../../hooks/useCustomRTKSelectors"
import AddComment from "./AddComment"
import Like from "./Like"

const {Search} = Input

export interface PostProps {
  post: IPost,
  type?: 'news' | 'post'
  // type: string
  // children?: ReactElement
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

const Post: FC<PostProps> = ({post, type}) => {

  const pRef = useRef<HTMLParagraphElement | null>(null)
  const {title, body, reactions = 0, id, tags, userId} = post
  const [comments, setComments] = useState<CommentsType[]>([])
  const [isShow, setIsShow] = useState<boolean>(false)
  const [isHidden, setIsHidden] = useState<boolean>(false)
  const [isCommentShow, setIsCommentShow] = useState<boolean>(false)
  const [userImg, setUserImg] = useState<string>('')

  //
  const addComment = (comment: CommentsType) => setComments(prev => [...prev, comment])

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
        const {image} = await getUserImage(userId)
        setUserImg(image)
      } catch (e) {
        console.log(e)
      }
    })()
  }, [])


  const postTitle = (
    <div>
      {type === "news" && <Avatar src={userImg}/>}
      <span>{title}</span>
      <section className="post_tag_container">{tags?.map(el => <span key={el}>#{el}</span>)}</section>
    </div>
  )
  return (
    <Card className="post" title={postTitle}
          extra={isHidden && <a onClick={() => setIsShow(!isShow)}>{!isShow ? 'more..' : 'less..'}</a>}>
      <p style={{display: isShow ? '' : '-webkit-box'}} className="post_info" ref={pRef}>{body}</p>
      <Like reactions={reactions}/>
      {comments?.length ? (
        <div className="comment_container">
          {
            isCommentShow &&
            <>
              <div>
                {comments.map(el => <Comment key={el.body + Math.random()} data={el}/>)}
                <AddComment type={'news'} postId={id} addComment={addComment}/>
              </div>
            </> || <span>({comments.length} комментария)</span>
          }
          <CaretDownFilled className="post_comment_btn" onClick={() => setIsCommentShow(!isCommentShow)}/>

        </div>
      ) : null}

    </Card>
  )
}


export default Post

// export const MPost = motion(Post)

// function commentsNameCount(num: number) {
//
//   return num + 'коментариев'
// }