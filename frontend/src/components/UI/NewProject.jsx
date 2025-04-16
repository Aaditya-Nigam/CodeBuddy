import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { useAuthStore } from "../../store/useAuthStore"

export const NewProject=({showProject,setShowProject})=>{

    const {authUser,createProject,isCreatingProject}=useAuthStore()
    const [project,setProject]=useState({
        projectName: ""
    })


    const chechFormData=()=>{
        if(project.projectName.trim().length==0){
            toast.error("Invalid project name!!")
            return false;
        }
        return true;
    }

    const handleFormSubmit=(e)=>{
        e.preventDefault()
        const check=chechFormData();
        if(check){
            createProject(project)
            setProject({
                projectName: ""
            })
            setShowProject(false)
        }
    }

    return (
        <div className={`fixed top-0 text-white bg-[#00000099] w-screen h-screen flex justify-center items-center ${showProject?"":"hidden"}`} onClick={()=> setShowProject(false)}>
            <div className="flex flex-col items-center gap-4 border-1 border-zinc-500 p-8 rounded-lg bg-zinc-900" onClick={(e)=> e.stopPropagation()}>
                <h1 className="text-2xl">New Project</h1>
                <div>
                    <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="projectName" className="text-sm">Project Name</label>
                            <input type="text" name="projectName" id="projectName" placeholder="Project name..." value={project.projectName} onChange={(e)=> setProject({...project, [e.target.name]: e.target.value})} className="bg-zinc-800 w-[300px] border-1 border-zinc-500 rounded px-2 py-1 text-sm" required/>
                        </div>
                        <input type="submit" value="Create" disabled={isCreatingProject} className="bg-sky-600 hover:bg-sky-700 ease-in duration-200 w-[300px] border-1 border-zinc-500 rounded px-2 py-1 text-lg cursor-pointer"/>
                    </form>
                </div>
            </div>
            <Toaster/>
        </div>
    )
}