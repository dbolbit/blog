import {FC} from 'react'
import {useNavigate} from "react-router"

const ErrorPage: FC = (props) => {
  const navigation = useNavigate()
  const handlerClick = () => {
    navigation('/')
  }
  return (
    <div className="error error_container">
      <button onClick={handlerClick}>На главную</button>
    </div>
  )
}


export default ErrorPage