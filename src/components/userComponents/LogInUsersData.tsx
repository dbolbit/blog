import {FC, useState} from 'react'
import {Button} from "antd"

const usersData = [
  {
    "username": "atuny0",
    "password": "9uQFF1Lh"
  },
  {
    "username": "hbingley1",
    "password": "CQutx25i8r"
  },
  {
    "username": "rshawe2",
    "password": "OWsTbMUgFc"
  },
  {
    "username": "yraigatt3",
    "password": "sRQxjPfdS"
  },
  {
    "username": "kmeus4",
    "password": "aUTdmmmbH"
  },
  {
    "username": "jtreleven5",
    "password": "zY1nE46Zm"
  },
  {
    "username": "dpettegre6",
    "password": "YVmhktgYVS"
  },
  {
    "username": "ggude7",
    "password": "MWwlaeWcOoF6"
  },
  {
    "username": "nloiterton8",
    "password": "HTQxxXV9Bq4"
  },
  {
    "username": "umcgourty9",
    "password": "i0xzpX"
  },
]


const LogInUsersData: FC = (props) => {
  const [showUserData, setShowUserData] = useState<boolean>(false)
  const [countUser, setCountUser] = useState<number>(0)
  const handlerClick = () => {
    setShowUserData(!showUserData)
  }
  const handlerNext = () => countUser < 9 ? setCountUser(prev => prev + 1) : false
  const handlerPrev = () => countUser > 0 ? setCountUser(prev => prev - 1) : false

  return (
    <>
      <Button style={{width: '100%'}} type="dashed" onClick={handlerClick}>Выберите пользователя</Button>
      {showUserData && (
        <section className="login_user_data">
          <div className="login_user_data_arrow arrow_prev" onClick={handlerPrev}>&lt;</div>
          <span>username: {usersData[countUser].username}</span>
          <span>password: {usersData[countUser].password}</span>
          <div className="login_user_data_arrow arrow_next" onClick={handlerNext}> &gt;</div>
        </section>
      )}
    </>
  )
}


export default LogInUsersData