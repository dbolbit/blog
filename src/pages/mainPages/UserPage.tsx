import React, {FC, useEffect, Suspense} from 'react'
import {Layout, Spin} from "antd"
import {Await, defer, useAsyncValue, useLoaderData} from "react-router-dom"
import SingleUserData from "../../components/userComponents/SingleUserData"
import {User} from "../../store/slices/userSlice"

const UserPage: FC = (props) => {
  const {user}: any = useLoaderData()

  return (
    <Layout>
      <Suspense fallback={<Spin size="large" className="spin-center"/>}>
        <Await resolve={user}>
          <SingleUserData/>
        </Await>
      </Suspense>
    </Layout>
  )
}


export default UserPage
const getUser = async (id: number) => {
  const data = await fetch(`https://dummyjson.com/users/${id}`)
  const result: User = await data.json()
  return result

}
export const userLoader = async ({params}: any) => {
  let {id} = params
  id = +id
  return defer({user: getUser(id)})
}