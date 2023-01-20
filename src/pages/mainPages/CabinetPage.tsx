import React, {FC, useEffect} from 'react'
import {Avatar, Layout, Tabs, Typography} from 'antd'
import {UserOutlined} from '@ant-design/icons'
import {useAppSelector} from "../../hooks/useCustomRTKSelectors"
import {IFetchData} from "./LoginPage"
import {User} from "../../store/slices/userSlice"
import {useNavigate} from "react-router"
import useAuth from "../../hooks/useAuth"
import MainTabs from '../../components/userComponents/tabsElements/MainTabs'
import {motion} from 'framer-motion'
import {pagesAnimationVariants} from "../animation/PagesAnimation"

const {Title} = Typography

export enum Gender {
  man = 'male',
  women = 'female'
}

const itemsTabs = [
  {
    id: 1,
    label: `Основное`,
    children: <MainTabs/>,
  },
  {
    id: 2,
    label: `Карьера`,
    children: <Title>Карьера</Title>,
  },
  {
    id: 3,
    label: 'Мои посты',
    children: <Title>Мои посты</Title>
  },
]

const CabinetPage: FC = (props) => {
  const user: User = useAppSelector(state => state.user)
  const {isAuth} = useAuth()
  const navigator = useNavigate()
  useEffect(() => {
    if (!isAuth) {
      navigator('/login')
    }
    // console.log(user)
  }, [isAuth])


  return (
    <motion.div
      variants={pagesAnimationVariants}
      initial={'start'}
      animate={'animate'}
      exit={'end'}
      transition={{duration: 0.5}}
      style={{height: '100%'}}>
      <Layout style={{display: "flex", flexDirection: 'row'}}>
        <Avatar size={250} src={user.image} shape={"square"} style={{border: '1px solid grey', minWidth: 250}}/>
        <Layout style={{marginLeft: 20}}>
          <Title style={{margin: 0}}>{user.firstName} {user.lastName}</Title>
          <Title level={4} style={{margin: 0, color: 'grey', fontStyle: 'italic'}}>@{user.username}</Title>
          <Layout style={{marginTop: 20}}>
            <Tabs
              animated
              defaultActiveKey="1"
              type="card"
              size="middle"
              items={itemsTabs.map((tab) => ({
                  label: tab.label,
                  key: String(tab.id),
                  children: tab.children
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
