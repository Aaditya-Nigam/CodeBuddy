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
import { Message } from "./pages/Message"
import { Welcome } from "./components/loaders/Welcome"

export const App=()=>{

  const {check,authUser,isCheckingAuth}=useAuthStore();
  useEffect(()=>{
    check();
  },[check])

  if(isCheckingAuth && !authUser){
    return <Welcome/>
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
            path: "/projects/:id/:parentFolder/:folderID",
            element: <Repo/>
          },
          {
            path: "/projects/file/:projectId/:parentFolder/:fileId/",
            element: <File/>
          }, 
          {
            path: "/new/:projectId/:grandParentFolder/:parentFolder",
            element: <NewFileFolder/>
          },
          {
            path: "/message/:projectId",
            element: <Message/>
          }
        ]
      }
    ]
  )

  return <RouterProvider router={router}></RouterProvider>
}