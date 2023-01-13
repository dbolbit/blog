import React, {FC, Suspense, useEffect, useState} from 'react'
import {Await, useAsyncValue, useLoaderData} from "react-router-dom"
import {AnimatePresence, motion} from "framer-motion"
import Todo from "./Todo"
import {useAppSelector} from "../../hooks/useCustomRTKSelectors"
import {ITodo} from "../../pages/mainPages/TodoPage"

interface TodoListProps {
  todos: ITodo[] | [],
  addTodos: (todos: ITodo[]) => void,
  removeTodo: (id: number) => void
}

const TodoList: FC<TodoListProps> = ({todos, addTodos, removeTodo}) => {
  const list: any = useAsyncValue()

  useEffect(() => {
    // console.log(list)
    addTodos(list)
  }, [])

  return (

    <div className="todo_wrapper">

      <ul>
        <AnimatePresence>
          {todos.map(todo => <Todo removeTodo={removeTodo} key={todo.id} data={todo}/>)}
        </AnimatePresence>
      </ul>


    </div>

  )
}

export default TodoList