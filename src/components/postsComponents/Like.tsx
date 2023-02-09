import React, {FC, useState} from 'react'
import {HeartFilled} from "@ant-design/icons"


interface LikeProps {
  reactions: number
}

const Like: FC<LikeProps> = ({reactions}) => {
  const [likes, setLikes] = useState<number>(reactions)
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const handlerLikeClick = () => {
    setLikes(prev => isLiked ? prev - 1 : prev + 1)
    setIsLiked(!isLiked)
  }
  return (
    <span
      className={`post_likes ${isLiked && 'post_likes__active'}`}>{likes} <HeartFilled
      onClick={handlerLikeClick}/>
    </span>
  )
}


export default Like