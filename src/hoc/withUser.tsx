import {FC} from 'react'
import {PostProps} from "../components/postsComponents/Post"
import {Avatar} from "antd"

const withUser = (Component: FC<PostProps>) => {

  return function (props: PostProps) {
    return (
      <div className="post_with_user">
        {/*<Avatar className="post_with_user__avatar"*/}
        {/*        src="https://robohash.org/autquiaut.png"*/}
        {/*/>*/}
        <Component {...props}/>
      </div>
    )
  }
}


export default withUser