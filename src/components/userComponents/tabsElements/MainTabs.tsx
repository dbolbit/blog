import React, {FC} from 'react'
import {Layout, Typography} from "antd"

const {Title} = Typography
const MainTabs: FC = (props) => {

  return (
    <Layout className="tab_container">
      <Title>Hello its general information about me</Title>
    </Layout>
  )
}


export default MainTabs