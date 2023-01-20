import React, {FC, Suspense, useEffect, useState, useRef, Ref, RefObject, MutableRefObject, HTMLAttributes} from 'react'
import {Layout, Spin, Input, Button, Radio, Select, InputRef} from "antd"
import {defer, Await, useLoaderData} from "react-router-dom"
import {User} from "../../store/slices/userSlice"
import UsersList, {UsersListType} from "../../components/userComponents/UsersList"
import type {RadioChangeEvent} from 'antd'
import {AppstoreOutlined, BarsOutlined} from '@ant-design/icons'
import {SearchProps} from "antd/es/input"
import {pagesAnimationVariants} from "../animation/PagesAnimation"
import {motion} from 'framer-motion'

export type UsersListVariables = 'cards' | 'table'


export enum PROJECT_URL {
  getUsers = 'https://dummyjson.com/users?limit=10&select=company,age,firstName,lastName,image&skip=',
  searchUsers = 'https://dummyjson.com/users/search?select=age,firstName,lastName,image,company&q='


}

const {Search} = Input
const UsersPage: FC = (props) => {
  const searchRef = useRef<InputRef | null>(null)
  const {users} = useLoaderData() as UsersListType
  const [maxUsers, setMaxUsers] = useState<number>(0)
  const [usersState, setUsersState] = useState<User[]>([])
  const [countOfUsers, setCountOfUsers] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>('')
  const [listVariables, setListVariables] = useState<UsersListVariables>('cards')
  const placementChange = (e: RadioChangeEvent) => {
    setListVariables(e.target.value)
  }
  const handlerClick = async (e: React.MouseEvent) => {
    setIsLoading(true)
    const newUsers = await getUsers(PROJECT_URL.getUsers, countOfUsers) as UsersListType
    setUsersState(prevState => [...prevState, ...newUsers.users])
    setIsLoading(false)
  }

  const handlerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }
  // const testFocus = (e: FocusEvent) => {
  //   if (inputValue) {
  //     setTimeout(async () => {
  //       const result = await getUsers(PROJECT_URL.searchUsers, inputValue) as UsersListType
  //       setUsersState(result.users)
  //     }, 1000)
  //     // } else if (inputValue === '') {
  //     //   (async function () {
  //     //     const data = await getUsers(PROJECT_URL.getUsers, 0) as UsersListType
  //     //     setUsersState(data.users)
  //     //   })()
  //
  //   }
  // }

  useEffect(() => {
    const testFocus = (e: FocusEvent) => {
      // if (inputValue) {
      //   setTimeout(async () => {
      //     const result = await getUsers(PROJECT_URL.searchUsers, inputValue) as UsersListType
      //     setUsersState(result.users)
      //   }, 1000)
      //   // } else if (inputValue === '') {
      //   //   (async function () {
      //   //     const data = await getUsers(PROJECT_URL.getUsers, 0) as UsersListType
      //   //     setUsersState(data.users)
      //   //   })()
      //
      // }
    }
    let tId: any
    // const evMap = new Map()
    // evMap.set('focus', testFocus)
    // evMap.set('blur', testBlur)
    // searchRef?.current?.input?.addEventListener('focus', testFocus)
    // searchRef?.current?.input?.addEventListener('blur', testBlur)


    if (inputValue) {

      tId = setTimeout(async () => {
        const result = await getUsers(PROJECT_URL.searchUsers, inputValue) as UsersListType
        setUsersState(result.users)
      }, 1000)
      // } else {
      //   (async function () {
      //     const data = await getUsers(PROJECT_URL.getUsers, 0) as UsersListType
      //     setUsersState(data.users)
      //   })()
      //
    }
    // return () => evMap.forEach((value, key) => searchRef?.current?.input?.removeEventListener(key, value))
    // return searchRef?.current?.input?.removeEventListener('focus', testFocus)


    return () => clearTimeout(tId)
  }, [inputValue])

  useEffect(() => {
    setCountOfUsers(usersState.length)
    console.log(usersState)
  }, [usersState])
  return (
    <motion.div
      variants={pagesAnimationVariants}
      initial={'start'}
      animate={'animate'}
      exit={'end'}
      transition={{duration: 0.5}}
    >
      <Layout style={{padding: '20px 0px'}}>

        <div>
          <Radio.Group defaultValue="cards" value={listVariables} onChange={placementChange}>
            <Radio.Button value="cards" defaultChecked><AppstoreOutlined/></Radio.Button>
            <Radio.Button value="table"><BarsOutlined/></Radio.Button>
          </Radio.Group>
          <Search style={{width: 300, float: 'right'}}
                  placeholder="Введите имя пользователя"
                  enterButton
                  value={inputValue}
                  onChange={handlerInput}
                  ref={searchRef}


          />
        </div>
      </Layout>
      <Suspense fallback={<Spin size="large" className="spin-center"/>}>
        <Layout className="user_page_container" style={{display: listVariables === 'table' ? "block" : "grid"}}>
          <Await resolve={users}>
            <UsersList
              setMaxUsers={setMaxUsers}
              usersState={usersState}
              setUsersState={setUsersState}
              viewType={listVariables}
            />
          </Await>
        </Layout>
        <Layout style={{margin: '20px 0px'}}>
          {
            !inputValue.length && listVariables === 'cards' && (
              <Button type="primary"
                      style={{margin: '0 auto'}}
                      onClick={handlerClick}
                      loading={isLoading}
                      disabled={countOfUsers === maxUsers}
              >Еще..</Button>
            )
          }
        </Layout>
      </Suspense>

    </motion.div>
  )
}

export default UsersPage
export const getUsers = async (type = PROJECT_URL.getUsers, value: number | string = 0) => {
  const data = await fetch(`${type}${value}`)
  const result: UsersListType = await data.json()
  return result
}
export const usersLoader = async () => {
  return defer({users: getUsers()})
}
