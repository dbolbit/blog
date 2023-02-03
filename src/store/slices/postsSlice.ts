import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {IPost} from "../../components/userComponents/tabsElements/postsTab/PostsList"

const initialState: IPost[] = []

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    fetchPosts: (state, action: PayloadAction<IPost[]>) => [...action.payload],
    addPostsToList: (state, action: PayloadAction<IPost[]>) => [...state, ...action.payload],
    addPost: (state, action: PayloadAction<IPost>) => {
      return state
    }
  }
})

export const {fetchPosts, addPostsToList} = postsSlice.actions
export default postsSlice.reducer