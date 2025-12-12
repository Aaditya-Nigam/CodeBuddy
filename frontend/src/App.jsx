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
import { NewProject } from "./pages/NewProject"
import { JoinProject } from "./pages/JoinProject"
import { CloneFile } from "./pages/CloneFile"
import {PushRequest} from "./pages/PushRequest"
import { GetPushRequests } from "./pages/GetPushRequests"

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
            path: "",
            element: <Home/>
          },
          {
            path: "projects",
            element: <Projects/>
          },
          {
            path: "profile",
            element: <Profile/>
          },
          {
            path: "projects/:id/:parentFolder/:folderID",
            element: <Repo/>
          },
          {
            path: "projects/file/:projectId/:fileId/",
            element: <File/>
          }, 
          {
            path: "projects/cloneFile/:projectId/:fileId/:cloneId",
            element: <CloneFile/>
          }, 
          {
            path: "new/:projectId/:grandParentFolder/:parentFolder",
            element: <NewFileFolder/>
          },
          {
            path: "message/:projectId",
            element: <Message/>
          },
          {
            path: "projects/newProject",
            element: <NewProject/>
          },
          {
            path: "projects/joinProject",
            element: <JoinProject/>
          },
          {
            path: "push/:projectId/:fileId/:cloneId",
            element: <PushRequest/>
          },
          {
            path: "pushRequests/file/:fileId",
            element: <GetPushRequests/>
          }
        ]
      }
    ]
  )

  return <RouterProvider router={router}></RouterProvider>
}