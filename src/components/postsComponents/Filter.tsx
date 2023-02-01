import {Dispatch, FC, SetStateAction} from 'react'
import {Select} from "antd"

const {Option} = Select

interface FilterProps {
  tags: string[]
  setFilterTags: Dispatch<SetStateAction<string[]>>
}

const Filter: FC<FilterProps> = ({tags, setFilterTags}) => {
  const handleChange = (value: string[]) => {
    console.log(value)
    setFilterTags(value)
  }
  return (
    <Select
      mode="multiple"
      style={{width: '100%'}}
      placeholder="select filter tag"
      onChange={handleChange}
      optionLabelProp="label"
    >
      {
        tags.map(el => (
          <Option key={el} value={el} label={el}>
            <span>{el}</span>
          </Option>
        ))
      }
    </Select>
  )
}


export default Filter