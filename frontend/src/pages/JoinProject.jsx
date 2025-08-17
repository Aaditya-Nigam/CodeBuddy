import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { useAuthStore } from "../store/useAuthStore"
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export const JoinProject=()=>{

    const {authUser,joinProject,isJoiningProject}=useAuthStore()
    const navigate=useNavigate()
    const [project,setProject]=useState({
        projectId: ""
    })


    const chechFormData=()=>{
        if(project.projectId.trim().length==0){
            toast.error("Invalid project id!!")
            return false;
        }
        return true;
    }

    const handleFormSubmit=(e)=>{
        e.preventDefault()
        const check=chechFormData();
        if(check){
            joinProject(project)
            setProject({
                projectId: ""
            })
        }
    }
    // console.log(authUser)

    return (
        <div className={` text-white bg-[#0d1117] w-screen min-h-[81.7vh] flex flex-col gap-4 justify-center items-center`}>
            <p className="bg-sky-500 px-4 rounded-xl text-lg flex gap-2 items-center cursor-pointer" onClick={()=> navigate("/projects")}><FaArrowLeft/> Back</p>
            <div className="flex flex-col items-center gap-4 border-1 border-zinc-500 p-8 rounded-lg bg-zinc-900">
                <h1 className="text-2xl">Join Project</h1>
                <div>
                    <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="projectId" className="text-sm">Project Id</label>
                            <input type="text" name="projectId" id="projectId" placeholder="Project id..." value={project.projectId} onChange={(e)=> setProject({...project, [e.target.name]: e.target.value})} className="bg-zinc-800 w-[300px] border-1 border-zinc-500 rounded px-2 py-1 text-sm" required/>
                        </div>
                        <input type="submit" value="Join" disabled={isJoiningProject} className="bg-sky-600 hover:bg-sky-700 ease-in duration-200 w-[300px] border-1 border-zinc-500 rounded px-2 py-1 text-lg cursor-pointer"/>
                    </form>
                </div>
            </div>
            <Toaster/>
        </div>
    )
}