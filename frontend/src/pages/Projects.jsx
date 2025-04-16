import { NavLink } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore"
import moment, {} from "moment"
import { NewProject } from "../components/UI/NewProject"
import { useState } from "react"
import { MdDelete } from "react-icons/md";
import { Toaster } from "react-hot-toast"
import { JoinProject } from "../components/UI/JoinProject"

export const Projects=()=>{

    const {authUser,deleteProject}=useAuthStore()
    const [showProject,setShowProject]=useState(false);
    const [showJoin,setShowJoin]=useState(false);
    console.log(authUser)

    return (
        <>
            <main className="bg-[#0d1117] h-[91.7vh] ">
                <div className="w-[80%] mx-auto h-[90vh] grid grid-cols-[1fr_3fr]">
                    <div className="flex flex-col justify-center items-center gap-4 border-r-1 border-[#1e232785] my-8 ">
                        <img src={authUser?.profilePic || "./avatar.png"} alt="" className="w-[200px] border-3 border-sky-600 rounded-[50%]"/>
                        <div className="flex flex-col items-center">
                            <p className="text-zinc-400 text-xl">{authUser?.fullName}</p>
                            <p className="text-zinc-600 text-sm">{authUser.userName}</p>
                        </div>
                        <p className="text-zinc-400 text-lg">Projects: <span className="bg-zinc-800 px-4 rounded-xl">{authUser?.projects.length}</span></p>
                    </div>
                    <div className="project-container p-4 overflow-y-auto">
                        <div className="flex gap-4 justify-center">
                            <form>
                                <input type="text" name="project" id="project" placeholder="Find a project.." className="bg-[#1e2327] placeholder-zinc-600 text-zinc-600 px-2 py-0.5 text-sm outline-none w-[500px] border-1 border-zinc-800 rounded"/>
                            </form>
                            <button className="bg-sky-600 px-4 rounded-xl text-white" onClick={()=> setShowProject(true)}>New</button>
                            <button className="bg-sky-600 px-4 rounded-xl text-white" onClick={()=> setShowJoin(true)}>Join</button>
                        </div>
                        <div className="py-8 px-16 flex flex-col gap-2">
                            {
                                authUser?.projects.map((project,index)=>{
                                    return (
                                        <div key={index} className="bg-[#1e232765] px-4 py-2 border-2 rounded-lg border-[#1e2327] flex justify-between items-center">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <NavLink to={`${project._id}`} className="text-xl text-sky-700 font-semibold hover:underline">{project.projectName}</NavLink>
                                                    {
                                                        authUser._id==project.author?<div className="text-xs text-zinc-700 border-1 border-zinc-700 px-1.5 rounded-xl bg-[#0e1219]">Author</div>:''
                                                    }
                                                    
                                                </div>
                                                <span className="mr-8 text-zinc-700 text-sm">Collaborators: {project.collaborators?.length}</span>
                                                <span className="text-zinc-700 text-sm">Created {moment(project.createdAt).fromNow()}</span>
                                            </div>
                                            <MdDelete className="text-2xl invert" onClick={(e)=> {deleteProject(project._id)}}/>
                                        </div>
                                    )
                                })
                            }
                            
                        </div>
                    </div>
                </div>
            </main>
            <NewProject showProject={showProject} setShowProject={setShowProject}/>
            <JoinProject showJoin={showJoin} setShowJoin={setShowJoin}/>
            <Toaster/>
        </>
    )
}