import React, {FC, Suspense, useEffect, useState} from 'react'
import {Layout, Spin, Input, Button} from "antd"
import {defer, Await, useLoaderData} from "react-router-dom"
import {User} from "../../store/slices/userSlice"
import UsersList, {UsersListType} from "../../components/userComponents/UsersList"

const {Search} = Input
const UsersPage: FC = (props) => {
  const {users} = useLoaderData() as UsersListType
  const [maxUsers, setMaxUsers] = useState<number>(0)
  const [usersState, setUsersState] = useState<User[]>([])
  const [countOfUsers, setCountOfUsers] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>('')

  const handlerClick = async (e: React.MouseEvent) => {
    setIsLoading(true)
    const newUsers = await getUsers(countOfUsers) as UsersListType
    setUsersState(prevState => [...prevState, ...newUsers.users])
    setIsLoading(false)
  }

  const handlerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }
  useEffect(() => {
    let tId: any
    if (inputValue) {
      tId = setTimeout(async () => {
        const result = await searchUser(inputValue) as UsersListType
        setUsersState(result.users)
      }, 1000)
    } else {
      (async function () {
        const data = await getUsers() as UsersListType
        setUsersState(data.users)
      })()

    }
    return () => clearTimeout(tId)
  }, [inputValue])

  useEffect(() => {
    setCountOfUsers(usersState.length)
    console.log(usersState)
  }, [usersState])
  return (
    <Layout>
      <Layout style={{padding: '20px 0px'}}>
        <div>
          <Search style={{width: 300, float: 'right'}}
                  placeholder="Введите имя пользователя"
                  enterButton
                  value={inputValue}
                  onChange={handlerInput}
          />
        </div>
      </Layout>
      <Suspense fallback={<Spin size="large" className="spin-center"/>}>
        <Layout className="user_page_container">
          <Await resolve={users}>
            <UsersList
              maxUsers={maxUsers}
              setMaxUsers={setMaxUsers}
              usersState={usersState}
              setUsersState={setUsersState}
            />
          </Await>
        </Layout>
        <Layout style={{margin: '20px 0px'}}>
          {
            !inputValue.length && (
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

    </Layout>
  )
}

export default UsersPage
const getUsers = async (skip = 0) => {
  const data = await fetch(`https://dummyjson.com/users?limit=10&select=company,firstName,lastName,image&skip=${skip}`)
  const result: User = await data.json()
  return result
}
export const usersLoader = async () => {
  return defer({users: getUsers()})
}
const searchUser = async (value: string) => {
  const data = await fetch(`https://dummyjson.com/users/search?q=${value}&select=firstName,lastName,image,company`)
  const result: User = await data.json()
  return result
}

