import {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit"
import {IFetchData} from "../../pages/mainPages/LoginPage"
import axios from "axios"
import {redirect} from "react-router"

export interface User extends IFetchData {
  isAuth?: boolean,
  birthDate?: string,
  phone?: string,
  university?: string,
  company?: CompanyUser,
  isLoading?: boolean
}

interface CompanyUser {
  address?: object,
  department?: string,
  name?: string,
  title?: string
}


export type IFetch = {
  id: number | null | undefined,
  token: string | null | undefined
}

export const fetchUserById = createAsyncThunk(
  "user/fetchUser",
  async ({id, token}: IFetch, {rejectWithValue}) => {

    const response = await axios.get<User>(`https://dummyjson.com/auth/users/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
    console.log(response.status)
    console.log(response)
    if (response.data.message) {
      localStorage.clear()
      
      return rejectWithValue(401)

    } else {
      return response.data as User
    }

  }
)
const initialState: User = {isAuth: false, isLoading: false}
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logInUser: (state, action: PayloadAction<User>) => {
      return {...action.payload, isAuth: true}
    },
    logOutUser: () => {
      return {isAuth: false}
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchUserById.fulfilled, (state, action: PayloadAction<User>) => {
      return {...action.payload, isAuth: true, isLoading: false}
    })
    builder.addCase(fetchUserById.rejected, (state, action) => {
      console.log(action.error.message)

      return {...state, isAuth: false, isLoading: false}
    })
    builder.addCase(fetchUserById.pending, (state, action) => {
      return {...state, isAuth: false, isLoading: true}
    })

  }
})
export const {logInUser, logOutUser} = userSlice.actions
export default userSlice.reducer