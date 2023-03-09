import React, {FC, ReactElement, useEffect, useState} from 'react'
import {Layout, Menu} from "antd"
import {
  IdcardOutlined,
  RocketOutlined,
  UnorderedListOutlined,
  UserOutlined,
  RightOutlined,
  LeftOutlined
} from "@ant-design/icons"
import {useLocation} from "react-router"
import {Link} from "react-router-dom"


const {Sider} = Layout


const menuList = [
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
const MySider: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true)
  const [isMobile, setIsMobile] = useState<boolean>(true)
  const location: object = useLocation()
  const {pathname}: any = location

  const breakpointHandler = (point: boolean) => setIsMobile(point)

  const handlerSelect = (event: any) => {
    if (isMobile) {
      setIsOpen(true)
    }
  }
  return (
    <Sider
      // className="sider"
      breakpoint="sm"
      onBreakpoint={breakpointHandler}
      collapsible
      // collapsed={isOpen}
      // trigger
      theme="dark"
      width={isMobile && '100%' || 200}
      zeroWidthTriggerStyle={{top: 0}}
      collapsedWidth={isMobile ? 0 : 80}

    >
      <Link to="/">LOGO</Link>
      <Menu
        style={{position: 'sticky', top: 0}}
        theme="dark"
        mode="vertical"
        defaultSelectedKeys={[`${pathname}`]}
        items={menuList}
        onSelect={handlerSelect}
      />
      {/* <SiderTrigger isOpen={isOpen} changeOpen={setIsOpen}/> */}
    </Sider>
  )
}

export default MySider


interface TriggerProps {
  isOpen: boolean
  changeOpen: (value: boolean) => void
}

function SiderTrigger({isOpen, changeOpen}: TriggerProps): ReactElement {

  return (
    <div
      onClick={() => changeOpen(!isOpen)}
    >{isOpen ? <RightOutlined/> : <LeftOutlined/>}
    </div>
  )
}