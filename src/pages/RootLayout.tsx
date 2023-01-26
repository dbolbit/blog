import React, {useState, useEffect, useLayoutEffect} from 'react'
import {Outlet} from 'react-router-dom'
import {Avatar, Badge, Layout, Menu, Spin} from 'antd'
import {Link} from "react-router-dom"
import {
  UserOutlined,
  RightOutlined,
  LeftOutlined,
  UnorderedListOutlined,
  IdcardOutlined,
  LogoutOutlined,
  LoginOutlined,
  RocketOutlined
} from '@ant-design/icons'
import {useLocation, useNavigate} from "react-router"
import useAuth from "../hooks/useAuth"
import {useAppDispatch, useAppSelector} from "../hooks/useCustomRTKSelectors"
import {fetchUserById, User, logOutUser} from "../store/slices/userSlice"
import {fetchToStoreTodos} from "../store/slices/todosSlice"

import {AnimatePresence} from "framer-motion"


const {Header, Sider, Content, Footer} = Layout


const RootLayout: React.FC = (props) => {
  const itemsList = [
    {
      key: '/news',
      icon: <RocketOutlined/>,
      label: <Link to="news">Новости</Link>,
    },
    {
      key: '/cabinet',
      icon: <IdcardOutlined/>,
      label: <Link to="cabinet">Мой кабинет</Link>,
    },
    {
      key: '/todos',
      icon: <UnorderedListOutlined/>,
      label: <Link to="todos"> Заметки</Link>,
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
  const {isLoading, isError} = useAppSelector(state => state.user)
  useEffect(() => {
    if (saveID) {
      const id: number = +saveID
      dispatch(fetchUserById({id, token}))
      dispatch(fetchToStoreTodos({id, token}))
    }

  }, [saveID])
  useEffect(() => {
    if (isError) {
      navigator('/login')
    }

  }, [isError])

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
                <>
                  <Avatar src={user.image}/> Выйти <LogoutOutlined/>
                </>
              ) : (
                <>Войти <LoginOutlined/></>
              )}
            </span>

          </Header>

          {isLoading ? <Spin size="large" className="spin-center"/> : (
            <Layout>
              {isAuth && (
                <Sider
                  className="sider"
                  collapsed={isOpen}
                  collapsible
                  theme="dark"
                  trigger={null}

                >
                  <Menu
                    style={{position: 'sticky', top: 0}}
                    theme="dark"
                    mode="vertical"
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
              <Content className={`main_content_wrapper`}>
                <AnimatePresence initial={false}>
                  <Outlet/>
                </AnimatePresence>
              </Content>
            </Layout>
          )}


        </Layout>

      </Layout>
      <Layout>
        <Footer
          style={{backgroundColor: '#001529'}}
        >
          <span style={{color: 'white'}}>Footer</span>
        </Footer>
      </Layout>

    </>

  )
}


export default RootLayout