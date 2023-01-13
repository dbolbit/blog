import React, {FC, useEffect} from 'react'
import {useAsyncValue} from "react-router-dom"

const UserData: FC = (props) => {
  const user = useAsyncValue()
  useEffect(() => {
    console.log(user)

  })

  return (
    <div>
      <h1>Hello user</h1>
    </div>
  )
}


export default UserData