import React, {FC, forwardRef, Ref} from 'react'
import {Checkbox, List} from "antd"
import {ITodo} from "../../pages/mainPages/TodoPage"
import {CheckboxChangeEvent} from "antd/es/checkbox"
import {DeleteOutlined} from '@ant-design/icons'
import {motion, Reorder} from "framer-motion"
import {removeTodo, toggleDone} from "../../store/slices/todosSlice"
import {useAppDispatch, useAppSelector} from "../../hooks/useCustomRTKSelectors"

const {Item} = List

interface ListTodoItemProps {
  item: ITodo,
}

const ListTodoItem: FC<ListTodoItemProps> = forwardRef(({item}, ref: Ref<any>) => {

  const allTodos = useAppSelector(state => state.todos)
  let [todo]: ITodo[] = allTodos.filter((el => el.id === item.id))
  const dispatch = useAppDispatch()

  return (
    // <Reorder.Item value={item.id} key={item.id}>

    <Item className="todo_item" ref={ref}>
      <Checkbox
        checked={todo.completed}
        id={`check-${item.id}`}
        onChange={() => dispatch(toggleDone(item.id))}
      />
      <label
        htmlFor={`check-${item.id}`}
        className={`todo_checkbox_label ${todo.completed && 'completed'}`}
      >
        {item.todo}

      </label>
      <DeleteOutlined
        onClick={() => dispatch(removeTodo(item.id))}
      />
    </Item>
    // </Reorder.Item>
  )
})

// export default ListTodoItem
export const MListTodoItem = motion(ListTodoItem)