import React, {FC, useEffect, useState, useLayoutEffect} from 'react'
import {Avatar} from 'antd'
import {UserOutlined} from '@ant-design/icons'
import {useAppSelector} from "../../hooks/useCustomRTKSelectors"
import {IFetchData} from "./LoginPage"
import {User} from "../../store/slices/userSlice"
import {useNavigate} from "react-router"
import useAuth from "../../hooks/useAuth"

export enum Gender {
  man = 'male',
  women = 'female'
}

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
    <div className={`cabinet`}>
      <div className={`user`}>
        <div className="user__avatar">
          <Avatar src={user.image} shape="circle" size={200} style={{border: '1px solid grey'}} icon={<UserOutlined/>}/>
        </div>
        <div className="user__info">
          <h1>{user.firstName}</h1>
          <h3>{user.lastName}</h3>
        </div>
      </div>
    </div>
  )
}


export default CabinetPage