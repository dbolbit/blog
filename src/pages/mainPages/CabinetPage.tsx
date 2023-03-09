import {FC, useEffect} from 'react'
import {Avatar, Layout, Tabs, Typography} from 'antd'
import {useAppSelector} from "../../hooks/useCustomRTKSelectors"
import {IFetchData} from "./LoginPage"
import {User} from "../../store/slices/userSlice"
import {useNavigate} from "react-router"
import useAuth from "../../hooks/useAuth"
import {motion} from 'framer-motion'
import {pagesAnimationVariants} from "../animation/PagesAnimation"
import {MainTabs, PostTab} from "../../components/userComponents/tabsElements"
import {Link, Outlet} from "react-router-dom"
import useScreenSize from "../../hooks/useScreenSize"

const {Title} = Typography

const itemsTabs = [
  {
    id: 1,
    label: `Основное`,
    key: 'info'
    // children: <Outlet/>,
  },
  {
    id: 2,
    label: `Карьера`,
    key: 'career'
    // children: <Outlet/>
  },
  {
    id: 3,
    label: 'Мои посты',
    key: 'posts'
    // children: <Outlet/>
  },
]

const CabinetPage: FC = (props) => {
  const user: User = useAppSelector(state => state.user)
  const {image, firstName, lastName, username} = user
  const {isAuth} = useAuth()
  const navigator = useNavigate()


  useEffect(() => !isAuth ? navigator('/login') : navigator('/cabinet/info'), [isAuth])
  const handlerTabClick = (key: string) => {
    navigator(`/cabinet/${key}`)
  }
  
  return (
    <motion.div
      variants={pagesAnimationVariants}
      initial={'start'}
      animate={'animate'}
      exit={'end'}
      transition={{duration: 0.5}}
      style={{height: '100%'}}>
      <Layout style={{display: "flex", flexDirection: 'row'}}>
        <Avatar size={250} src={user.image} shape="square" style={{minWidth: 250}}/>
        <Layout style={{marginLeft: 20}}>
          <Title style={{margin: 0}}>{firstName} {lastName}</Title>
          <Title level={4} style={{margin: 0, color: 'grey', fontStyle: 'italic'}}>@{username}</Title>
          <Layout style={{marginTop: 20}}>
            <Tabs
              onTabClick={handlerTabClick}
              animated
              defaultActiveKey="1"
              type="card"
              size="middle"
              items={itemsTabs.map((tab) => ({
                  label: tab.label,
                  key: tab.key,
                  children: <Outlet/>
                })
              )}
            />
          </Layout>
        </Layout>
      </Layout>
    </motion.div>
  )
}


export default CabinetPage
