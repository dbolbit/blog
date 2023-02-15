import React, {FC, useState} from 'react'
import {Input} from 'antd'
import {useAppSelector} from "../../../hooks/useCustomRTKSelectors"
import {CommentsType} from "../Post"

const {Search} = Input

interface IAddComment {
  type: string
  postId: number
  addComment: (comment: CommentsType) => void
}

const AddComment: FC<IAddComment> = ({type, postId, addComment}) => {
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [userComment, setUserComment] = useState<string>('')
  const currentUserId = useAppSelector(state => state.user.id)
  const handlerAddComment = async (value: string, event: React.KeyboardEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement, MouseEvent> | undefined) => {
    if (value) {
      try {
        setIsFetching(true)
        const response = await fetch('https://dummyjson.com/comments/add', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            body: value,
            postId: postId,
            userId: currentUserId,
          })
        })
        const result = await response.json()
        addComment(result)
        setIsFetching(false)
        setUserComment('')
      } catch (e) {
        console.log(e)
        setIsFetching(false)
        setUserComment('')
      }
    }
  }
  return (
    <>
      {type === 'news' && (
        <div style={{marginTop: 20}}>
          <Search bordered placeholder="Ваш коментарий"
                  enterButton="Опубликовать"
                  onSearch={handlerAddComment}
                  loading={isFetching}
                  value={userComment}
                  onChange={(e) => setUserComment(e.target.value)}
          />

        </div>
      )}
    </>
  )
}


export default AddComment