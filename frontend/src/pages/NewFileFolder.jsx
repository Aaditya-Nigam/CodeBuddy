import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { useProjectStore } from "../store/useProjectStore"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { FaArrowLeftLong } from "react-icons/fa6";
import {useFolderStore} from "../store/useFolderStore";
import { useFileStore } from "../store/useFileStore";

export const NewFileFolder=()=>{
    console.log("khkjhkj")
    
    const {projectId,parentFolder,grandParentFolder}=useParams()
    const {createFile,isCreatingFile}=useFileStore()
    const {isCreatingFolder,createFolder}=useFolderStore()
    const navigate=useNavigate()
    
    const [file,setFile]=useState({
        fileName: "",
        language: "cpp", 
        content: "//Write your code",
        parentFolder: parentFolder,
        projectId: projectId
    })
    const [folder,setFolder]=useState({
        folderName: "",
        parentFolder: parentFolder,
        projectId: projectId
    })

    const chechFileFormData=()=>{
        if(file.fileName.trim().length==0){
            toast.error("Invalid file name!!")
            return false;
        }
        return true;
    }

    const handleFileFormSubmit=(e)=>{
        e.preventDefault()
        const check=chechFileFormData();
        if(check){
            createFile(file);
            setFile({
                fileName: "",
                language: "cpp",
                content: "//Write your code",
                parentFolder: parentFolder,
                projectId: projectId
            })
            navigate(`/projects/${projectId}/${grandParentFolder}/${parentFolder}`)
        }
    }

    const chechFolderFormData=()=>{
        if(folder.folderName.trim().length==0){
            toast.error("Invalid folder name!!")
            return false;
        }
        if(folder.folderName.trim()=='root'){
            toast.error("Folder name cannot be root!!")
            return false;
        }
        return true;
    }

    const handleFolderFormSubmit=(e)=>{
        e.preventDefault()
        const check=chechFolderFormData();
        if(check){
            createFolder(folder);
            setFolder({
                folderName: "",
                parentFolder: parentFolder,
                projectId: projectId
            })
            navigate(`/projects/${projectId}/${grandParentFolder}/${parentFolder}`)
        }
    }

    return (
        <div className={`fixed top-0 text-white bg-zinc-900 w-screen h-screen flex justify-center items-center `}>
            <div className=" w-[95%] h-[90%] gap-4 border-1 border-zinc-500 rounded-lg bg-zinc-900 py-4" onClick={(e)=> e.stopPropagation()}>
                <div className="pl-8">
                    <NavLink to={`/projects/${projectId}/${grandParentFolder}/${parentFolder}`} className="bg-sky-500 flex gap-2 items-center w-fit px-3 py-0.5 rounded-lg text-md hover:bg-sky-600"><FaArrowLeftLong/>Back</NavLink>
                </div>
                <div className="grid grid-cols-2 ">
                    <div className="border-r border-zinc-700 flex flex-col items-center p-8">
                        <h1 className="text-2xl pb-4">New File</h1>
                        <div className="w-full">
                            <form className="flex flex-col gap-8" onSubmit={handleFileFormSubmit}>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="fileName" className="text-sm">File Name</label>
                                    <input type="text" name="fileName" id="fileName" placeholder="File name..." value={file.fileName} onChange={(e)=> setFile({...file, [e.target.name]: e.target.value})} className="bg-zinc-800 w[300px] border-1 border-zinc-500 rounded px-2 py-1 text-sm" required/>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="language" className="text-sm">Language</label>
                                    <select name="language" id="language" className="bg-zinc-800 border-1 border-zinc-500 rounded px-2 py-1 text-sm" value={file.language} onChange={(e)=> setFile({...file, [e.target.name]: e.target.value})}>
                                        <option value="cpp">Cpp</option>
                                        <option value="javascript">JavaScript</option>
                                        <option value="python">Python</option>
                                        <option value="java">Java</option>
                                        <option value="html">HTML</option>
                                        <option value="css">CSS</option>
                                    </select>
                                </div>
                                <input type="submit" value="Create" className="bg-sky-600 hover:bg-sky-700 ease-in duration-200 border-1 border-zinc-500 rounded px-2 py-1 text-lg cursor-pointer" disabled={isCreatingFile}/>
                            </form>
                        </div>
                    </div>
                    <div className="border-r border-zinc-700 flex flex-col items-center p-8">
                        <h1 className="text-2xl pb-4">New Folder</h1>
                        <div className="w-full">
                            <form className="flex flex-col gap-8" onSubmit={handleFolderFormSubmit}>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="folderName" className="text-sm">Folder Name</label> 
                                    <input type="text" name="folderName" id="folderName" placeholder="Folder name..." value={folder.folderName} onChange={(e)=> setFolder({...folder, [e.target.name]: e.target.value})} className="bg-zinc-800 w[300px] border-1 border-zinc-500 rounded px-2 py-1 text-sm" required/>
                                </div>
                                <input type="submit" value="Create" className="bg-sky-600 hover:bg-sky-700 ease-in duration-200 border-1 border-zinc-500 rounded px-2 py-1 text-lg cursor-pointer" disabled={isCreatingFolder}/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster/>
        </div>
    )
}