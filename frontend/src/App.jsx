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
import { Loader } from "./components/UI/Loader"
import { NewFileFolder } from "./pages/NewFileFolder"

export const App=()=>{

  const {check,authUser,isCheckingAuth}=useAuthStore();
  useEffect(()=>{
    check();
  },[check])

  if(isCheckingAuth && !authUser){
    return <Loader/>
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
            path: "/projects/:id/:parentFolder",
            element: <Repo/>
          },
          {
            path: "/projects/:projectId/:fileId/:index",
            element: <File/>
          }, {
            path: "/new/:projectId/:parentFolder",
            element: <NewFileFolder/>
          }
        ]
      }
    ]
  )

  return <RouterProvider router={router}></RouterProvider>
}