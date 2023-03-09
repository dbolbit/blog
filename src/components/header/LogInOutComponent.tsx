import {FC} from 'react'
import {Avatar} from "antd"
import {LoginOutlined, LogoutOutlined} from "@ant-design/icons"
import {logOutUser} from "../../store/slices/userSlice"
import {useAppDispatch} from "../../hooks/useCustomRTKSelectors"
import {useNavigate} from "react-router"

interface LogInOutProps {
  isAuth?: boolean
  img?: string
}

const LogInOutComponent: FC<LogInOutProps> = ({isAuth, img}) => {
  const dispatch = useAppDispatch()
  const navigator = useNavigate()
  const handlerLogInOut = (e: React.MouseEvent) => {
    if (isAuth) {
      dispatch(logOutUser())
      localStorage.clear()
    }
    navigator('/login')
  }
  return (
    <span className="logInOut" onClick={handlerLogInOut}>
              {isAuth ? <><Avatar src={img}/> Выйти <LogoutOutlined/></> : <>Войти <LoginOutlined/></>}
    </span>
  )
}


export default LogInOutComponent