import React, {FC, useState} from 'react'
import {Card, Avatar} from "antd"
import Meta from "antd/es/card/Meta"
import {User} from "../../store/slices/userSlice"
import {Link} from "react-router-dom"

export interface UserCardProps {
  data: User
}


const UserCard: FC<UserCardProps> = ({data}) => {
  const {age, id, firstName, lastName, image, company} = data
  return (
    <div>
      <>
        <Card style={{width: 300, marginTop: 16, height: 170}}>
          <Meta
            avatar={<Avatar size={100} src={`${image}`} style={{border: '1px solid gray'}}/>}
            title={<Link to={`/users/${id}`}>{firstName} {lastName}</Link>}
            description={<section>
              <p>{age} years</p>
              <p>{company?.title}</p>
            </section>}
          />
        </Card>
      </>

    </div>
  )
}


export default UserCard