import React, {FC, useState} from 'react'
import {Button, Layout, Typography, Tooltip} from "antd"
import UserTableForm from "./UserTableForm"


const MainTabs: FC = (props) => {
  return (
    <Layout className="tab_container">
      <UserTableForm/>
    </Layout>
  )
}


export default MainTabs