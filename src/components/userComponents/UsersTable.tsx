import React, {FC, useEffect} from 'react'
import {User} from "../../store/slices/userSlice"
import {Space, Table, Avatar} from 'antd'
import type {ColumnsType} from 'antd/es/table'
import {Link} from "react-router-dom"

interface UsersTableProps {
  users: User[]
}

interface DataType {
  id?: number,
  mainData: string[];
  age: number,
  position: string,
  company: string
}


const columns: ColumnsType<DataType> = [
  {
    title: 'Имя',
    dataIndex: 'mainData',
    render: (data) => {
      const [firstName, lastName, img, id] = data
      return (
        <>
          <Avatar src={img}/>
          <Link to={`/users/${id}`}>{firstName} {lastName}</Link>
        </>
      )
    }
    ,
  },
  {
    title: 'Возраст',
    dataIndex: 'age',
  },
  {
    title: 'Должность',
    dataIndex: 'position',
  },
  {
    title: 'Компания',
    dataIndex: 'company',
  },


]

const UsersTable: FC<UsersTableProps> = ({users}) => {
  const usersTableData = rebuildData(users)
  return <Table
    columns={columns}
    dataSource={usersTableData}
    pagination={{
      total: 100,
    }}
  />
}

export default UsersTable

function rebuildData(data: User[]) {
  const result: any = []
  data.forEach(el => {
    const obj: object = {
      id: el.id,
      mainData: [el.firstName, el.lastName, el.image, el.id],
      age: el.age,
      position: el.company?.title,
      company: el.company?.name,
    }
    result.push(obj)
  })
  return result as DataType[]
}