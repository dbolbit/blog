import React, {FC, useState} from 'react'
import {ITodo} from "../../pages/mainPages/TodoPage"
import {CloseOutlined, DeleteOutlined} from '@ant-design/icons'
import {Checkbox} from 'antd'
import type {CheckboxChangeEvent} from 'antd/es/checkbox'
import {motion, PanInfo, useMotionValue, useTransform, Reorder} from "framer-motion"
import {removeTodo} from "../../store/slices/todosSlice"
import {useAppDispatch} from "../../hooks/useCustomRTKSelectors"

const {Item} = Reorder
const todoVariants = {
  start: {
    opacity: 0,
  },
  anim: {
    opacity: 1,
  },
  end: {
    opacity: 0,
  },
}

interface ITodoProps {
  data: ITodo,
  eth?: any
}

const TodoComponent: FC<ITodoProps> = ({data, eth}) => {
  const {todo, id, completed} = data
  const [isComplete, setIsComplete] = useState<boolean>(completed)
  const dispatch = useAppDispatch()
  const x = useMotionValue(0)
  const background = useTransform(x, [-70, 0], ["rgba(30,252,13,0.5)", "#F5F5F5"])//"#fc3c3c"
  const opacity = useTransform(x, [0, 100], [1, 0.35])

  const onChange = (e: CheckboxChangeEvent) => setIsComplete(e.target.checked)

  const handlerDragEnd = () => {
    x.on("change", value => {
      if (value < -55) {
        setIsComplete(!isComplete)
      }
      if (value > 200) {
        dispatch(removeTodo(id))
      }
    })
  }

  return (
    <Item
      value={String(id)}
      id={String(id)}
      style={{x, background, opacity}}
      key={eth}
      initial="start"
      animate="anim"
      exit="end"
      variants={todoVariants}
      transition={{duration: 0.3}}
      drag
      dragConstraints={{left: 0}}
      onDragEnd={handlerDragEnd}
      dragSnapToOrigin
      layout={"position"}
      className={`todo ${isComplete ? 'completed' : null}`}
    >

      <label
        htmlFor={`check-${id}`}
        className={`todo_checkbox_label ${isComplete && 'completed'}`}
      >
        {todo}
      </label>
      <Checkbox defaultChecked={isComplete} checked={isComplete} onChange={onChange} id={`check-${id}`}/>
      <DeleteOutlined className="todo_delete" onClick={() => dispatch(removeTodo(id))}/>
    </Item>
  )
}

export default TodoComponent

