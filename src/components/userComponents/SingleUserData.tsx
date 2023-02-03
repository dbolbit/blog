import React, {FC, useEffect} from 'react'
import {useAsyncValue} from "react-router-dom"
import {Avatar, Layout} from "antd"
import {User} from "../../store/slices/userSlice"
import Title from "antd/lib/typography/Title"

const SingleUserData: FC = (props) => {
  const user = useAsyncValue() as User
  const {image, id, firstName, lastName, username, age, company, gender, birthDate, email, phone, university} = user

  console.log(user)


  return (
    <Layout>
      <div className="user_main_info">
        <Avatar src={image} size={250} style={{minWidth: 250}}/>
        <div style={{width: '100%'}}>
          <div>
            <Title style={{margin: 0}}>{firstName} {lastName}</Title>
            <span className="user_main_info_username">@{username}</span>
          </div>
          <table>
            <tbody>
            <tr>
              <td>Возраст</td>
              <td>{age}</td>
            </tr>
            <tr>
              <td>Дата рождения</td>
              <td>{birthDate}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{email}</td>
            </tr>
            <tr>
              <td>Телефон</td>
              <td>{phone}</td>
            </tr>
            <tr>
              <td>Образование</td>
              <td>{university}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

    </Layout>
  )
}


export default SingleUserData