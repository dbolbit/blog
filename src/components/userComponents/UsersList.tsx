import React, {FC, useEffect, useState} from 'react'
import UserCard, {UserCardProps} from "./UserCard"
import {useAsyncValue} from "react-router-dom"
import {User} from "../../store/slices/userSlice"
import {Button} from "antd"
import {UsersListVariables} from "../../pages/mainPages/UsersPage"

export type UsersListType = {
  users: User[],
  total: number,
  skip: number,
  limit: number
}

interface UserListProps {

  setMaxUsers: (num: number) => void,
  usersState: User[]
  setUsersState: ([]: User[]) => void,
  viewType: UsersListVariables
}

const UsersList: FC<UserListProps> = ({viewType, setMaxUsers, usersState, setUsersState}) => {
  const users = useAsyncValue() as UsersListType

  useEffect(() => {
    if (users) {
      setMaxUsers(users.total)
      setUsersState(users.users)
    }

  }, [users])
  return (
    <>
      {viewType === "table" ? (
        <>
          <h1>Hello</h1>
        </>
      ) : (
        <>
          {usersState.map(el => {
              const {id, firstName, lastName, image, company} = el
              return <UserCard key={id} id={id} firstName={firstName} lastName={lastName} image={image}
                               company={company}/>
            }
          )}
        </>
      )}
    </>
  )
}


export default UsersList