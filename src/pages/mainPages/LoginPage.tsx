import React, {useState, useEffect} from 'react'
import {LockOutlined, UserOutlined} from '@ant-design/icons'
import {Button, Checkbox, Form, Input, Layout} from 'antd'
import axios from "axios"
import {useAppDispatch} from "../../hooks/useCustomRTKSelectors"
import {logInUser} from "../../store/slices/userSlice"
import {useNavigate} from "react-router"
import useAuth from "../../hooks/useAuth"
import {motion} from "framer-motion"
import {pagesAnimationVariants} from "../animation/PagesAnimation"
import LogInUsersData from "../../components/userComponents/LogInUsersData"

const {Item} = Form

type UserLogin = {
  username: string,
  password: string,
  remember?: boolean
}

export type IFetchData = {
  email?: string,
  firstName?: string,
  gender?: string,
  id?: number,
  image?: string,
  lastName?: string,
  token?: string,
  username?: string,
  message?: string,
  address?: Address
}

type Address = {
  address: string,
  city: string,
  postalCode: string,
  state: string
}
const fetchLogin = async (data: UserLogin) => {

  try {
    const res = await axios.post<IFetchData>('https://dummyjson.com/auth/login', JSON.stringify(data), {
      headers: {'Content-Type': 'application/json'}
    })
    if (res.request.status === 400) {
      throw new Error()
    } else {
      return res.data
    }
  } catch (e) {
    return {
      message: 'Такого пользователя не существует'
    }
  }
}

const LoginPage: React.FC = (props) => {
  const dispatch = useAppDispatch()
  const {isAuth} = useAuth()
  const navigator = useNavigate()
  const onFinish = async (values: any) => {
    const {username, password, remember}: UserLogin = values
    const res: IFetchData = await fetchLogin({username, password})
    if (res.message) {
      alert(res.message)
    } else {
      if (remember) {
        localStorage.setItem('token', `${res.token}`)
        localStorage.setItem('id', `${res.id}`)
      }
      dispatch(logInUser(res))
      navigator('/cabinet')
    }
  }
  useEffect(() => {
    if (isAuth) {
      navigator('/cabinet')
    }
  })

  return (
    <motion.div
      variants={pagesAnimationVariants}
      initial={'start'}
      animate={'animate'}
      exit={'end'}
      transition={{duration: 0.5}}
      style={{height: 'auto'}}>
      <div style={{height: 400}}>
        <div style={{width: 350, margin: '50px auto'}}>
          <Form
            name="login_form"
            className="login-form"
            initialValues={{remember: true}}
            onFinish={onFinish}
            layout="vertical"
          >
            <Item
              name="username"
              rules={[{required: true, message: 'Введите username'}]}
              label={'Username'}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
            </Item>
            <Item
              name="password"
              rules={[{required: true, message: 'Введите пароль'}]}
              label={'Password'}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon"/>}
                type="password"
                placeholder="Password"
              />
            </Item>
            <Item>
              <Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Item>

              <a className="login-form-forgot" href="src/pages/mainPages/LoginPage" style={{float: "right"}}>
                Forgot password
              </a>
            </Item>

            <Item noStyle>
              <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                Log in
              </Button>
              <br/>
              <a href="src/pages/mainPages/LoginPage"
                 style={{width: 'auto', margin: '10px auto', textAlign: "center", display: 'block'}}>Or
                register now!</a>
            </Item>
          </Form>
          <LogInUsersData/>
        </div>
        {/*0lelplR*/}
      </div>

    </motion.div>
  )
}


export default LoginPage