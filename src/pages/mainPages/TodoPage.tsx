import React, {useState, useEffect, Suspense, lazy} from "react"
import {Button, Input, Space, Spin} from 'antd'
import {Await, useLoaderData, useAsyncValue, defer} from 'react-router-dom'
import TodoList from "../../components/todoComponents/TodoList"
import {Layout} from "antd"

export type ITodo = {
  id: number,
  todo: string,
  completed: boolean,
  userId?: number
}

const TodoPage: React.FC = (props) => {
  const [inputValue, setInputValue] = useState<string>('')
  const [todos, setTodos] = useState<ITodo[]>([])
  const {list}: any = useLoaderData()
  const addTodos = (todos: ITodo[]) => {
    setTodos(prev => [...prev, ...todos])
  }
  const removeTodo = (id: number) => {
    setTodos(prev => prev.filter(el => el.id !== id))
  }
  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }
  const handlerClick = (e: React.MouseEvent) => {
    const todo: ITodo = {
      id: Date.now(),
      todo: inputValue,
      completed: false
    }
    setTodos(prev => [todo, ...prev])
    setInputValue('')
  }
  const handlerKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const todo: ITodo = {
        id: Date.now(),
        todo: inputValue,
        completed: false
      }
      setTodos(prev => [todo, ...prev])
      setInputValue('')
    }
  }
  return (
    <div style={{width: '100%'}}>
      <Layout>
        <Space className="todo_input_wrapper"
        >
          <Input
            onKeyDown={handlerKey}
            onChange={handlerChange}
            value={inputValue}
            style={{width: 400}}
            size="large"
            placeholder="Добавить заметку"/>
          <Button type="primary" onClick={handlerClick}>Добавить</Button>
        </Space>
      </Layout>
      <Layout style={{position: "relative", minHeight: '50vh'}}>
        <Suspense fallback={<Spin className="spin-center" size="large"/>}>
          <Await resolve={list}>
            <TodoList todos={todos} addTodos={addTodos} removeTodo={removeTodo}/>
          </Await>
        </Suspense>
      </Layout>
    </div>
  )
}


export default TodoPage

export const fetchTodos = async () => {
  const saveId = localStorage.getItem('id')
  const token = localStorage.getItem('token')
  if (saveId) {
    const id = +saveId
    return defer({list: testFetch(id, token)})
  }

}
const testFetch = async (id: number, token: string | null) => {
  const result = await fetch(`https://dummyjson.com/auth/users/${id}/todos`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
  const res = await result.json()
  return res.todos
}
