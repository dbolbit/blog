import React, {FC, ReactElement} from 'react'
import {TableTypeData} from "./UserTableForm"

interface MyTableProps {
  data: TableTypeData[]
  render: (data: TableTypeData[]) => ReactElement<any, string | React.JSXElementConstructor<any>> | null
}

const MyTable: FC<MyTableProps> = ({data, render}) => {

  return render(data)
}


export default MyTable