import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {ITodo} from "../../pages/mainPages/TodoPage"
import {IFetch} from "./userSlice"
import axios from "axios"

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async ({id, token}: IFetch) => {
    const dataFetch = await axios.get(`https://dummyjson.com/auth/users/${id}/todos`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    console.log(dataFetch)
    return dataFetch.data.todos
  }
)
const initialState: ITodo[] = []
const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodos: (state, action: PayloadAction<ITodo[]>) => {
      return [...state, ...action.payload]
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchTodos.fulfilled, (state, action: PayloadAction<ITodo[]>) => {
      return [...state, ...action.payload]
    })
  }

})

export const {addTodos} = todosSlice.actions
export default todosSlice.reducer