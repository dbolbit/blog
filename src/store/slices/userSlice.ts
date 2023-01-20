import {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit"
import {IFetchData} from "../../pages/mainPages/LoginPage"
import axios, {AxiosError, AxiosResponse} from "axios"

export interface User extends IFetchData {
  isAuth?: boolean,
  birthDate?: string,
  phone?: string,
  university?: string,
  company?: CompanyUser,
  isLoading?: boolean,
  age?: number,
  isError?: number | null
}

interface CompanyUser {
  address?: object,
  department?: string,
  name?: string,
  title?: string
}


export type IFetch = {
  id: number | undefined,
  token: string | undefined
}

export const fetchUserById = createAsyncThunk(
  "user/fetchUser",
  async ({id, token}: IFetch, {rejectWithValue}) => {
    try {
      const response = await axios.get<User>(`https://dummyjson.com/auth/users/${id}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
      return response.data as User
    } catch (e: any) {
      // console.log(e.response.status)
      return rejectWithValue(e.response.status)
    }
  }
)
const initialState: User = {isAuth: false, isLoading: false, isError: null}
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logInUser: (state, action: PayloadAction<User>) => {
      return {...action.payload, isAuth: true}
    },
    logOutUser: () => {
      return {isAuth: false}
    },
    updateUser: (state, action: PayloadAction<User>) => {
      return {...state, ...action.payload}
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchUserById.fulfilled, (state, action: PayloadAction<User>) => {
      return {...action.payload, isAuth: true, isLoading: false}
    })
    builder.addCase(fetchUserById.rejected, (state, action: PayloadAction<any>) => {

      return {...state, isAuth: false, isLoading: false, isError: action.payload}
    })
    builder.addCase(fetchUserById.pending, (state, action) => {
      return {...state, isAuth: false, isLoading: true}
    })

  }
})
export const {logInUser, logOutUser, updateUser} = userSlice.actions
export default userSlice.reducer