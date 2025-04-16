import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Home } from "./pages/Home"
import { Projects } from "./pages/Projects"
import { Profile } from "./pages/Profile"
import { AppLayout } from "./components/layout/AppLayout"
import { SignUp } from "./pages/SignUp"
import { Login } from "./pages/Login"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"
import { Repo } from "./pages/Repo"
import { File } from "./pages/File"

export const App=()=>{

  const {check,authUser,isCheckingAuth}=useAuthStore();
  useEffect(()=>{
    check();
  },[check])

  if(isCheckingAuth && !authUser){
    return <h1>Loading...</h1>
  }

  const router=createBrowserRouter(
    [
      {
        path: "/signUp",
        element: <SignUp/>
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/",
        element: <AppLayout/>,
        children: [
          {
            path: "/",
            element: <Home/>
          },
          {
            path: "/projects",
            element: <Projects/>
          },
          {
            path: "/profile",
            element: <Profile/>
          },
          {
            path: "/projects/:id",
            element: <Repo/>
          },
          {
            path: "/projects/:projectId/:fileId/:index",
            element: <File/>
          }
        ]
      }
    ]
  )

  return <RouterProvider router={router}></RouterProvider>
}