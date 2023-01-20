import React, {FC, useEffect, useState} from 'react'
import UserCard, {UserCardProps} from "./UserCard"
import {useAsyncValue} from "react-router-dom"
import {User} from "../../store/slices/userSlice"
import {UsersListVariables} from "../../pages/mainPages/UsersPage"
import UsersTable from "./UsersTable"

export type UsersListType = {
  users: User[],
  total: number,
  skip: number,
  limit: number
}

interface UserListProps {

  setMaxUsers: (num: number) => void,
  usersState: User[]
  setUsersState: React.Dispatch<React.SetStateAction<User[]>>,
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
          <UsersTable setUsersState={setUsersState} users={usersState}/>
        </>
      ) : (
        <>
          {usersState.map(el => <UserCard key={el.id} data={el}/>)}
        </>
      )}
    </>
  )
}


export default UsersList