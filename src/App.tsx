// import React from 'react'
import RootLayout from "./pages/RootLayout"
import {createRoutesFromElements, RouterProvider, Route} from "react-router"
import {createBrowserRouter} from 'react-router-dom'
import {LoginPage, CabinetPage, TodoPage, UsersPage, UserPage, NewsPage} from "./pages/mainPages"
import {Provider} from "react-redux"
import {store} from "./store/store"
import {usersLoader} from "./pages/mainPages/UsersPage"
import {userLoader} from "./pages/mainPages/UserPage"
import {PostTab} from "./components/userComponents/tabsElements"
import {postsLoader} from "./components/userComponents/tabsElements/postsTab/PostTab"
import {FC} from "react"
import {newsLoader} from "./pages/mainPages/NewsPage"

const routes = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<RootLayout/>}>
    <Route path="/login" element={<LoginPage/>}/>
    <Route path="/news" element={<NewsPage/>} loader={newsLoader}/>
    <Route path="/cabinet" element={<CabinetPage/>}>
      <Route path="/cabinet/posts" element={<PostTab/>} loader={postsLoader}/>
    </Route>
    <Route path="/todos" element={<TodoPage/>}/>
    <Route path="/users" element={<UsersPage/>} loader={usersLoader}/>
    <Route path="users/:id" element={<UserPage/>} loader={userLoader}/>
  </Route>
))
const App: FC = () => {

  return (
    <Provider store={store}>
      <RouterProvider router={routes}/>
    </Provider>
  )
}

export default App
