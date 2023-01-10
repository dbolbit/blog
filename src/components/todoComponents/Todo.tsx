import React, {FC, useState, forwardRef, Ref, RefObject, MutableRefObject, ForwardedRef} from 'react'
import {ITodo} from "../pages/mainPages/TodoPage"
import {CloseOutlined} from '@ant-design/icons'
import {Checkbox} from 'antd'
import type {CheckboxChangeEvent} from 'antd/es/checkbox'
import {motion} from "framer-motion"


interface ITodoProps {
  data: ITodo,
  removeTodo: (id: number) => void
}

const Todo: FC<ITodoProps> = ({data, removeTodo}) => {
  const [isComplete, setIsComplete] = useState<boolean>(data.completed)
  const onChange = (e: CheckboxChangeEvent) => {
    setIsComplete(e.target.checked)
  }
  const {todo} = data
  return (
    <motion.li
      animate={{opacity: 1, x: 0}}
      exit={{opacity: 0, scale: 0}}
      transition={{duration: 0.5}}
      className={`todo ${isComplete ? 'completed' : null}`}>{todo}
      <Checkbox defaultChecked={isComplete} onChange={onChange} style={{position: "absolute", right: 100}}/>
      <span className="todo_close"
            onClick={() => removeTodo(data.id)}
      ><CloseOutlined/></span>
    </motion.li>
  )
}

export default Todo

