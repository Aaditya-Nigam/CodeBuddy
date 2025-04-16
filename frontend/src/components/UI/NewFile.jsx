import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { useProjectStore } from "../../store/useProjectStore"

export const NewFile=({showCreate,setShowCreate})=>{

    const {createFile}=useProjectStore()
    const [file,setFile]=useState({
        fileName: "",
        language: "cpp",
        content: "//Write your code"
    })


    const chechFormData=()=>{
        if(file.fileName.trim().length==0){
            toast.error("Invalid file name!!")
            return false;
        }
        return true;
    }

    const handleFormSubmit=(e)=>{
        e.preventDefault()
        const check=chechFormData();
        if(check){
            createFile(file);
            setFile({
                fileName: "",
                language: "cpp"
            })
            setShowCreate(false)
        }
    }

    return (
        <div className={`fixed top-0 text-white bg-[#00000099] w-screen h-screen flex justify-center items-center ${showCreate?"":"hidden"}`} onClick={()=> setShowCreate(false)}>
            <div className="flex flex-col items-center gap-4 border-1 border-zinc-500 p-8 rounded-lg bg-zinc-900" onClick={(e)=> e.stopPropagation()}>
                <h1 className="text-2xl">New File</h1>
                <div>
                    <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="fileName" className="text-sm">File Name</label>
                            <input type="text" name="fileName" id="fileName" placeholder="File name..." value={file.fileName} onChange={(e)=> setFile({...file, [e.target.name]: e.target.value})} className="bg-zinc-800 w-[300px] border-1 border-zinc-500 rounded px-2 py-1 text-sm" required/>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="language" className="text-sm">Language</label>
                            <select name="language" id="language" className="bg-zinc-800 w-[300px] border-1 border-zinc-500 rounded px-2 py-1 text-sm" value={file.language} onChange={(e)=> setFile({...file, [e.target.name]: e.target.value})}>
                                <option value="cpp">Cpp</option>
                                <option value="java">Java</option>
                                <option value="js">JavaScript</option>
                                <option value="py">Python</option>
                            </select>
                        </div>
                        <input type="submit" value="Create" className="bg-sky-600 hover:bg-sky-700 ease-in duration-200 w-[300px] border-1 border-zinc-500 rounded px-2 py-1 text-lg cursor-pointer"/>
                    </form>
                </div>
            </div>
            <Toaster/>
        </div>
    )
}