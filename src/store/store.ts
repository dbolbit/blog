import {configureStore} from "@reduxjs/toolkit"
import userSlice from "./slices/userSlice"
import todosSlice from "./slices/todosSlice"
import postsSlice from "./slices/postsSlice"

export const store = configureStore({
  reducer: {
    user: userSlice,
    todos: todosSlice,
    posts: postsSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})

})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch