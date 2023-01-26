import {FC} from "react"
import {PostProps} from "../components/postsComponents/Post"
import {Input} from 'antd'

const {Search} = Input
export const withUserPost = (Component: FC<PostProps>) => {
  return function (props: PostProps) {

    const handlerAddComment = async (value: string) => {
      try {
        const response = await fetch('https://dummyjson.com/comments/add', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            body: 'This makes all sense to me!',
            postId: 3,
            userId: 5,
          })
        })
        const result = await response.json()
        console.log(result)
      } catch (e) {
        console.log(e)
      }
    }
    return (
      <div className="newsPost_container">
        <Component {...props}>
          <Search bordered placeholder="Ваш коментарий"
                  enterButton="Опубликовать"
                  onSearch={handlerAddComment}/>
        </Component>
      </div>
    )
  }
}


export default withUserPost