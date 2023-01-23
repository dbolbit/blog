import React, {FC, useMemo, useCallback, memo, useEffect, useState, useRef, Ref} from 'react'
import {Form, Formik, Field, FormikValues} from "formik"
import {useAppDispatch, useAppSelector} from "../../../../hooks/useCustomRTKSelectors"
import {Button, Tooltip} from "antd"
import MyTable from "./MyTable"
import {updateUser, User} from "../../../../store/slices/userSlice"


export type TableTypeData = {
  title: string;
  value: any;
  type: string
}


type UserTableI = {
  firstName: string | undefined,
  age: number | undefined,
  city: string | undefined,
  phone: string | undefined,
  email: string | undefined,
  birthDate: string | undefined
}

function getData(obj: UserTableI) {
  const result: [] = []
  for (const key in obj) {
    // @ts-ignore
    result.push({title: key, value: obj[key], type: key === 'birthDate' ? 'date' : 'text'})
  }
  return result
}

const UserTableForm: FC = () => {
  const user = useAppSelector(state => state.user)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const formRef = useRef<HTMLFormElement | null>(null)
  const {firstName, email, age, birthDate, phone, address, id} = user
  const info: UserTableI = {firstName, email, age, phone, birthDate, city: address?.city}
  const dataArr = useMemo(() => getData(info), [user])
  const dispatch = useAppDispatch()
  const handlerFormSubmit = async (value: FormikValues) => {
    const {city, ...ethValue} = value
    const data = {address: {city}, ...ethValue}
    const response = await fetch(`https://dummyjson.com/users/${id}`, {
      method: 'PUT', /* or PATCH */
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
    const result: User = await response.json()
    dispatch(updateUser(result))
    console.log(result)
  }
  return (
    <Formik initialValues={info} onSubmit={handlerFormSubmit}>
      <Form id="tableForm" ref={formRef}>

        <table>
          <tbody>
          <MyTable data={dataArr} render={(info) => (
            <>
              {
                info.map(el => (
                  <tr key={el.title}>
                    <td>{el.title}</td>
                    {isEditing ?
                      <td><Field type={el.type} id={el.value} name={el.title}/></td> :
                      <td>{el.value}</td>}
                  </tr>))
              }
            </>
          )
          }/>
          </tbody>
        </table>
        <div className="buttons_wrapper">
          {isEditing &&
            <>
              <Button htmlType="submit" form="tableForm">Save</Button>
              <Button
                type="primary"
                danger
                onClick={() => setIsEditing(false)}
              >Cancel</Button>
            </> ||
            <Button
              type="primary"
              onClick={() => setIsEditing(true)}
            >Редактировать</Button>
          }
        </div>

      </Form>
    </Formik>
  )
}


export default UserTableForm