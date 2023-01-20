import React, {FC, Suspense, useEffect, useState} from 'react'
import {AnimatePresence, motion} from "framer-motion"
import {useAppDispatch, useAppSelector} from "../../hooks/useCustomRTKSelectors"
import {ITodo} from "../../pages/mainPages/TodoPage"
import {List} from "antd"
import {MListTodoItem} from "./ListTodoItem"
import {Reorder} from "framer-motion"
import {dragTodos} from "../../store/slices/todosSlice"

const TodoList: FC = () => {
  const todos = useAppSelector(state => state.todos)
  const dispatch = useAppDispatch()
  return (

    <div className="todo_wrapper">
      <AnimatePresence>
        <Reorder.Group values={todos.map(el => el.id)} axis="y" onReorder={(value) => dispatch(dragTodos(value))}>
          <List
            size="large"
            bordered
            dataSource={todos}
            renderItem={(item: ITodo) => (
              // <Reorder.Item value={item.id} key={item.id}>
              <MListTodoItem
                key={item.todo}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 1}}
                item={item}/>
              // </Reorder.Item>
            )
            }/>
        </Reorder.Group>
      </AnimatePresence>
    </div>

  )
}

export default TodoList

