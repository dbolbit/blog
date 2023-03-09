import React, {FC, Suspense, useEffect, useState} from 'react'
import {AnimatePresence, motion, Reorder} from "framer-motion"
import {useAppDispatch, useAppSelector} from "../../hooks/useCustomRTKSelectors"
import {FileOutlined} from '@ant-design/icons'
import {Todo} from "../../pages/mainPages/TodoPage"
import {updateTodos} from "../../store/slices/todosSlice"
import TodoComponent from "./TodoComponent"

const {Group} = Reorder
const TodoList: FC = () => {
  const todos = useAppSelector(state => state.todos)
  const dispatch = useAppDispatch()
  const keys: string[] = todos.map(el => String(el.id))

  const handlerReorder = (value: any[]) => dispatch(updateTodos(value))


  return (
    <AnimatePresence initial={false} mode={"sync"}>

      <motion.div className="todo_wrapper"
                  layout={"size"}
                  transition={{duration: 0.3}}>
        <motion.ul
          layout
          className={`${!todos.length && 'todo_list__empty'}`}>
          {
            todos.length ? (
              <>
                <Group axis="y"
                       onReorder={handlerReorder}
                       values={keys}>
                  {todos.map(todo => <TodoComponent key={todo.id} data={todo}/>)}
                </Group>
              </>
            ) : (
              <>
                <FileOutlined/>
                <span>Список пуст</span>
              </>
            )
          }

        </motion.ul>
      </motion.div>
    </AnimatePresence>
  )
}

export default TodoList
