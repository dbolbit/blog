import React, {FC, useEffect} from 'react'
import {Avatar, Layout, Tabs, Typography} from 'antd'
import {UserOutlined} from '@ant-design/icons'
import {useAppSelector} from "../../hooks/useCustomRTKSelectors"
import {IFetchData} from "./LoginPage"
import {User} from "../../store/slices/userSlice"
import {useNavigate} from "react-router"
import useAuth from "../../hooks/useAuth"
import MainTabs from '../../components/userComponents/tabsElements/MainTabs'

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
  })


  return (
    <Layout style={{height: '100%'}}>
      <Layout style={{display: "flex", flexDirection: 'row'}}>
        <Avatar size={250} src={user.image} shape={"square"} style={{border: '1px solid grey'}}/>
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
    </Layout>
  )
}


export default CabinetPage

// <div className={`cabinet`}>
//   <div className={`user`}>
//     <div className="user__avatar">
//       <Avatar src={user.image} shape="circle" size={200} style={{border: '1px solid grey'}} icon={<UserOutlined/>}/>
//     </div>
//     <div className="user__info">
//       <h1>{user.firstName}</h1>
//       <h3>{user.lastName}</h3>
//     </div>
//   </div>
// </div>