import { NavLink, useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore"
import moment, {} from "moment"
import { NewProject } from "./NewProject"
import { useEffect, useState } from "react"
import { MdDelete } from "react-icons/md";
import { Toaster } from "react-hot-toast"

export const Projects=()=>{

    const {authUser,deleteProject}=useAuthStore()
    const [projects,setProjects]=useState([]);
    const navigate=useNavigate();
    useEffect(()=>{
        if(!authUser){
            navigate("/login")
        }
    },[authUser])

    useEffect(()=>{
        if(authUser){
            setProjects(authUser.projects)
        }
    },[authUser])


    const handleProjectSearch=(e)=>{
        console.log(e.target.value)
        const updatedList=authUser.projects.filter((project)=>{
            return project.projectName.toLowerCase().includes(e.target.value.toLowerCase());
        })
        setProjects(updatedList)
        console.log(updatedList)
    }
    
    return (
        <>
            <main className="bg-[#0d1117] h-[91.4vh] max-[850px]:h-fit max-[850px]:min-h-[91.4vh]">
                <div className="w-[80%] mx-auto min-[850px]:h-[90vh] grid grid-cols-[1fr_3fr] max-[850px]:flex max-[850px]:flex-col">
                    <div className="flex flex-col justify-center items-center gap-4 border-r-1 border-[#1e232785] my-8 px-2 max-[850px]:border-0">
                        <img src={authUser?.profilePic || "./avatar.png"} alt="" className="w-[200px] h-[200px] object-cover border-3 border-sky-600 rounded-[50%] max-[850px]:w-[100px]"/>
                        <div className="flex flex-col items-center">
                            <p className="text-zinc-400 text-xl max-[850px]:text-lg">{authUser?.fullName}</p>
                            <p className="text-zinc-600 text-sm max-[850px]:text-xs">{authUser.userName}</p>
                        </div>
                        <p className="text-zinc-400 text-lg max-[850px]:text-base">Projects: <span className="bg-zinc-800 px-4 rounded-xl">{authUser?.projects.length}</span></p>
                    </div>
                    <div className="project-container p-4 overflow-y-auto">
                        <div className="grid grid-cols-[10fr_2fr] gap-4 justify-center px-2 max-[500px]:flex max-[500px]:flex-col max-[500px]:gap-2">
                            <form>
                                <input type="text" name="project" id="project" placeholder="Find a project.." onChange={handleProjectSearch} className="bg-[#1e2327] placeholder-zinc-600 text-zinc-600 px-2 py-0.5 text-sm outline-none w-full border-1 border-zinc-800 rounded"/>
                            </form>
                            <div className="flex gap-2">
                                <NavLink to={"/projects/newProject"} className="bg-sky-600 px-4 rounded-xl text-white">New</NavLink>
                                <NavLink to={"/projects/joinProject"} className="bg-sky-600 px-4 rounded-xl text-white">Join</NavLink>
                            </div>
                        </div>
                        <div className="py-8 px-16 flex flex-col gap-2 items-center">
                            {
                                projects.map((project,index)=>{
                                    return (
                                        <div key={index} className="bg-[#1e232765] px-4 py-2 border-2 rounded-lg border-[#1e2327] flex justify-between items-center w-full max-[430px]:w-[200px]">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <NavLink to={`${project._id}/${null}/${project.rootFolder}`} className="text-xl text-sky-700 font-semibold hover:underline max-[850px]:text-lg max-[430px]:text-sm">{project.projectName}</NavLink>
                                                    {
                                                        authUser._id==project.author?<div className="text-xs text-zinc-700 border-1 border-zinc-700 px-1.5 rounded-xl bg-[#0e1219] max-[500px]:hidden">Author</div>:''
                                                    }
                                                    
                                                </div>
                                                <span className="mr-8 text-zinc-700 text-sm max-[850px]:text-xs max-[430px]:text-[10px]">Collaborators: {project.collaborators?.length}</span>
                                                <span className="text-zinc-700 text-sm max-[850px]:text-xs max-[600px]:hidden">Created {moment(project.createdAt).fromNow()}</span>
                                            </div>
                                            <MdDelete className="text-2xl invert max-[850px]:text-xl max-[430px]:text-base cursor-pointer" onClick={(e)=> {deleteProject(project._id)}}/>
                                        </div>
                                    )
                                })
                            }
                            {
                                projects.length==0?<p className="text-zinc-700 w-full">No projects found!</p>:""
                            }
                            
                        </div>
                    </div>
                </div>
            </main>
            {/* <NewProject showProject={showProject} setShowProject={setShowProject}/> */}
            {/* <JoinProject showJoin={showJoin} setShowJoin={setShowJoin}/> */}
            <Toaster/>
        </>
    )
}