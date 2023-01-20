import React, {useState} from "react"
import {Button, Input, Space, Spin} from 'antd'
import TodoList from "../../components/todoComponents/TodoList"
import {Layout} from "antd"
import {useAppDispatch, useAppSelector} from "../../hooks/useCustomRTKSelectors"
import {addTodo} from "../../store/slices/todosSlice"
import {motion, Variants} from "framer-motion"
import {pagesAnimationVariants} from "../animation/PagesAnimation"

export type ITodo = {
  id: number,
  todo: string,
  completed: boolean,
  userId?: number,
  isLoading?: boolean
}

const TodoPage: React.FC = (props) => {
  const [inputValue, setInputValue] = useState<string>('')
  const saveId = Number(localStorage.getItem('id'))
  const dispatch = useAppDispatch()
  const handlerClick = (e: React.MouseEvent) => {
    if (inputValue) {
      const todo = new Todo(inputValue, saveId)
      dispatch(addTodo(todo))
      setInputValue('')
    }
  }
  const handlerKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue) {
      const todo = new Todo(inputValue, saveId)
      dispatch(addTodo(todo))
      setInputValue('')
    }
  }

  return (
    <motion.div
      variants={pagesAnimationVariants}
      initial={'start'}
      animate={'animate'}
      exit={'end'}
      transition={{duration: 0.5}}
      style={{width: '100%'}}>
      <Layout>
        <Space className="todo_input_wrapper"
        >
          <Input
            onKeyDown={handlerKey}
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            style={{width: 400}}
            size="large"
            placeholder="Добавить заметку"/>
          <Button type="primary" onClick={handlerClick}>Добавить</Button>
        </Space>
      </Layout>
      <Layout style={{position: "relative", minHeight: '50vh'}}>
        <TodoList/>
      </Layout>
    </motion.div>
  )
}


export default TodoPage

export class Todo implements ITodo {
  public todo: string
  public id: number
  public completed: boolean
  public userId: number

  constructor(value: string, userID: number) {
    this.todo = value
    this.id = Date.now()
    this.completed = false
    this.userId = userID
  }

  // id: number = Date.now()
  // completed: boolean = false
}