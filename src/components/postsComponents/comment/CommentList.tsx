import React, {FC, useEffect, useMemo, useState, Suspense} from 'react'
import Comment from "./Comment"
import AddComment from "./AddComment"
import {CommentFetchType, CommentsType} from "../Post"
import {AnimatePresence, motion} from 'framer-motion'
import {Await} from "react-router-dom"

interface CommentListProps {
  id: number,
  isShow: boolean
}

const variant = {
  start: {
    height: 0
  },
  anim: {
    height: 'auto'
  },
  exit: {
    height: 0,
  }
}

const CommentList: FC<CommentListProps> = ({id, isShow}) => {
  const [comments, setComments] = useState<CommentsType[]>([])
  const addComment = (comment: CommentsType) => setComments(prev => [...prev, comment])
  const commentCount = useMemo(() => commentsNameCount(comments.length), [comments.length])
  //
  useEffect(() => {

    (async function () {
      const data = await fetch(`https://dummyjson.com/comments/post/${id}`)
      const result: CommentFetchType = await data.json()
      setComments(result.comments)
    })()
  }, [])


  return (
    <>
      <AnimatePresence initial={false} mode={"wait"}>
        {
          isShow &&
          <motion.div
            key={id}
            variants={variant}
            initial="start"
            animate="anim"
            exit="exit"
            transition={{duration: 0.3,}}>
            <Suspense>
              <Await resolve={comments}>
                {comments.map(el => <Comment key={el.body + Math.random()} data={el}/>)}
              </Await>
            </Suspense>
            <AddComment type={'news'} postId={id} addComment={addComment}/>
          </motion.div>
          // || <span>({commentCount})</span>
        }
      </AnimatePresence>
    </>
  )
}


export default CommentList

function commentsNameCount(num: number) {
  const str: string[] = String(num).split('')
  const number: number = +str[str.length - 1]
  const data: string = number === 1 ? 'ий' : number > 1 && number < 5 ? 'ия' : 'иев'
  return num + ' коментар' + data
}
