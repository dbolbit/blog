import React, {useState, useEffect, useLayoutEffect} from 'react'
import {Outlet} from 'react-router-dom'
import {Layout, Menu, Spin} from 'antd'
import {Link} from "react-router-dom"
import {
  UserOutlined,
  RightOutlined,
  LeftOutlined,
  UnorderedListOutlined,
  IdcardOutlined,
  LogoutOutlined,
  LoginOutlined
} from '@ant-design/icons'
import {useLocation, useNavigate} from "react-router"
import useAuth from "../hooks/useAuth"
import {useAppDispatch, useAppSelector} from "../hooks/useCustomRTKSelectors"
import {fetchUserById, User, logOutUser} from "../store/slices/userSlice"


const {Header, Sider, Content, Footer} = Layout


const RootLayout: React.FC = (props) => {
  const itemsList = [
    {
      key: '/cabinet',
      icon: <IdcardOutlined/>,
      label: <Link to="cabinet">Мой кабинет</Link>,
    },
    {
      key: '/todos',
      icon: <UnorderedListOutlined/>,
      label: <Link to="todos">Заметки</Link>,
    },
    {
      key: '/users',
      icon: <UserOutlined/>,
      label: <Link to="users">Пользователи</Link>,
    },
  ]
  const [isOpen, setIsOpen] = useState<boolean>(true)
  const location: object = useLocation()
  const {pathname}: any = location
  const {isAuth} = useAuth()
  const navigator = useNavigate()
  const saveID = localStorage.getItem('id') as string | undefined
  const token = localStorage.getItem('token') as string | undefined
  const dispatch = useAppDispatch()
  const user: User = useAppSelector(state => state.user)
  const gender: string | undefined = user.gender
  const isLoading: boolean | undefined = useAppSelector(state => state.user.isLoading)
  useEffect(() => {
    if (saveID) {
      const id: number = +saveID
      dispatch(fetchUserById({id, token}))
    }
  }, [saveID])

  const handlerLogInOut = (e: React.MouseEvent) => {
    if (isAuth) {
      dispatch(logOutUser())
      localStorage.clear()
    }
    navigator('/login')
  }

  return (
    <>
      <Layout style={{minHeight: '100vh'}}>
        <Layout>
          <Header>

            <Link to="/">LOGO</Link>
            <span className="logInOut" onClick={handlerLogInOut}>
              {isAuth ? (
                <>Выйти <LogoutOutlined/></>
              ) : (
                <>Войти <LoginOutlined/></>
              )}
            </span>

          </Header>

          {isLoading ? <Spin size="large" className="spin-center"/> : (
            <Layout>
              {isAuth && (
                <Sider
                  collapsed={isOpen}
                  collapsible
                  theme="dark"
                  trigger={null}
                >
                  <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[`${pathname}`]}
                    items={itemsList}
                  >
                  </Menu>
                  <div
                    className="sidebar_trigger"
                    onClick={() => setIsOpen(!isOpen)}

                  >{isOpen ? <RightOutlined/> : <LeftOutlined/>}
                  </div>
                </Sider>
              )}
              <Content className={`main_content_wrapper bg-${gender}`}>
                <Outlet/>
              </Content>
            </Layout>
          )}


        </Layout>

      </Layout>
      <Layout>
        <Footer style={{backgroundColor: 'red'}}>
          <span style={{color: 'white'}}>Footer</span>
        </Footer>
      </Layout>

    </>

  )
}


export default RootLayout