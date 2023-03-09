import {useState, useEffect, FC} from 'react'
import {Outlet} from 'react-router-dom'
import {Layout, Menu, Spin} from 'antd'
import {Link} from "react-router-dom"
import {
  UserOutlined,
  UnorderedListOutlined,
  IdcardOutlined,
  RocketOutlined
} from '@ant-design/icons'
import {useNavigate} from "react-router"
import useAuth from "../hooks/useAuth"
import {useAppDispatch, useAppSelector} from "../hooks/useCustomRTKSelectors"
import {fetchUserById, User, logOutUser} from "../store/slices/userSlice"
import {fetchToStoreTodos} from "../store/slices/todosSlice"

import {AnimatePresence} from "framer-motion"
import useScreenSize from "../hooks/useScreenSize"
import LogInOutComponent from "../components/header/LogInOutComponent"
import MySider from "../components/header/MySider"


const {Header, Content, Footer} = Layout


const RootLayout: FC = (props) => {

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

  return (
    <>
      <Layout>
        
      {isAuth && <MySider/>}
      <Layout style={{minHeight: '100vh'}}>
        <Header>
          <Link to="/">LOGO</Link>
          <LogInOutComponent isAuth={isAuth} img={user.image}/>
        </Header>
        <Layout>
          {isLoading ? <Spin size="large" className="spin-center"/> : (
            <>
              <Content className="main_content_wrapper">
                <AnimatePresence initial={false}>
                  <Outlet/>
                </AnimatePresence>
              </Content>
            </>
          )}
        </Layout>
        <Footer className="footer" style={{backgroundColor: '#001529'}}>
          <span>Footer</span>
        </Footer>
      </Layout>
      </Layout>
    </>

  )
}


export default RootLayout