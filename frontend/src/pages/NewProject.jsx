import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { useAuthStore } from "../store/useAuthStore"
import { useNavigate } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa6";

export const NewProject=()=>{

    const {authUser,createProject,isCreatingProject}=useAuthStore()
    const navigate=useNavigate()
    const [project,setProject]=useState({
        projectName: ""
    })

    const checkFormData=()=>{
        if(project.projectName.trim().length==0){
            toast.error("Invalid project name!!")
            return false;
        }
        return true;
    }

    const handleFormSubmit =async (e) => {
        e.preventDefault();
        const check = checkFormData();
        if (check) {
            try{
                await createProject(project);
                setProject({ projectName: "" });
                toast.success("Project created!!")
            }catch{   
                toast.error(error.response?.data.message)
            }
        }
        
    };

    return (
        <div className={`text-white bg-[#0d1117] w-screen min-h-[81.7vh] flex flex-col justify-center items-center gap-4`}>
            <p className="bg-sky-500 px-4 rounded-xl text-lg flex gap-2 items-center cursor-pointer" onClick={()=> navigate("/projects")}><FaArrowLeft/> Back</p>
            <div className="flex flex-col items-center gap-4 border-1 border-zinc-500 p-8 rounded-lg bg-zinc-900">
                <h1 className="text-2xl">New Project</h1>
                <div>
                    <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="projectName" className="text-sm">Project Name</label>
                            <input type="text" name="projectName" id="projectName" placeholder="Project name..." value={project.projectName} onChange={(e)=> setProject({...project, [e.target.name]: e.target.value})} className="bg-zinc-800 w-[300px] border-1 border-zinc-500 rounded px-2 py-1 text-sm"/>
                        </div>
                        <input type="submit" value="Create" disabled={isCreatingProject} className="bg-sky-600 hover:bg-sky-700 ease-in duration-200 w-[300px] border-1 border-zinc-500 rounded px-2 py-1 text-lg cursor-pointer"/>
                    </form>
                </div>
            </div>
            <Toaster/>
        </div>
    )
}