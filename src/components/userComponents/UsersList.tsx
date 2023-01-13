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
          <UsersTable users={usersState}/>
        </>
      ) : (
        <>
          {usersState.map(el => {
              const {id, firstName, lastName, image, company, age} = el
              return <UserCard key={id} id={id}
                               firstName={firstName}
                               lastName={lastName}
                               image={image}
                               company={company}
                               age={age}
              />
            }
          )}
        </>
      )}
    </>
  )
}


export default UsersList