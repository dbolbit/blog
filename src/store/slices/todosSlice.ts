import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {ITodo, Todo} from "../../pages/mainPages/TodoPage"
import {IFetch} from "./userSlice"
import axios from "axios"

export const fetchToStoreTodos = createAsyncThunk(
  'todos/fetchTodos',
  async ({id, token}: IFetch) => {
    const dataFetch = await axios.get(`https://dummyjson.com/auth/users/${id}/todos`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    // console.log(dataFetch)
    return dataFetch.data.todos as Todo[]
  }
)
const initialState: Todo[] | [] = []
const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state: Todo[], action: PayloadAction<Todo>) => [{...action.payload}, ...state],
    removeTodo: (state: Todo[], action: PayloadAction<number>) => state.filter(el => el.id !== action.payload),
    toggleDone: (state: Todo[], action: PayloadAction<number>) => {
      state.forEach(el => {
        if (el.id === action.payload) {
          el.completed = !el.completed
        }
      })
    },
    updateTodos: (state: Todo[], action: PayloadAction<string[]>) => {
      const arr = action.payload
      state.sort((a, b) => arr.indexOf(String(a.id)) - arr.indexOf(String(b.id)))
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchToStoreTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
      return [...state, ...action.payload]
    })
  },

})

export const {addTodo, removeTodo, toggleDone, updateTodos} = todosSlice.actions
export default todosSlice.reducer