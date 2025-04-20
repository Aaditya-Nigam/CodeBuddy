import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { useProjectStore } from "../../store/useProjectStore"

export const NewTask=({showNewTasks,setShowNewTasks,collaborators,id})=>{

    const {createTask,isCreatingTask}=useProjectStore()
    const [task,setTask]=useState({
        title: "",
        author: "",
        deadline: ""
    })


    const chechFormData=()=>{
        if(task.title.trim().length==0){
            toast.error("Invalid title!!")
            return false;
        }
        if(task.deadline==''){
            toast.error("Invalid deadline!!")
            return false;
        }
        return true;
    }

    const handleFormSubmit=(e)=>{
        e.preventDefault()
        const check=chechFormData();
        console.log(check)
        console.log(task)
        if(check){
            createTask(task,id)
            setTask({
                title: "",
                author: "",
                deadline: ""
            })
            setShowNewTasks(false)
        }
    }

    return (
        <div className={`fixed top-0 text-white bg-[#00000099] w-screen h-screen flex justify-center items-center ${showNewTasks?'':'hidden'}`} onClick={()=> setShowNewTasks(false)}>
            <div className="flex flex-col items-center gap-4 border-1 border-zinc-500 p-8 rounded-lg bg-zinc-900" onClick={(e)=> e.stopPropagation()}>
                <h1 className="text-2xl">New Task</h1>
                <div>
                    <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="title" className="text-sm">Title</label>
                            <input type="text" name="title" id="title" placeholder="Title..." value={task.title} onChange={(e)=> setTask({...task, [e.target.name]: e.target.value})} className="bg-zinc-800 w-[300px] border-1 border-zinc-500 rounded px-2 py-1 text-sm" required/>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="author" className="text-sm">Author</label>
                            <select name="author" id="author" className="bg-zinc-800 w-[300px] border-1 border-zinc-500 rounded px-2 py-1 text-sm" value={task.author} onChange={(e)=> setTask({...task, [e.target.name]: e.target.value})}>
                                <option value="Select">Select</option>
                                {
                                    collaborators.map((contr,idx)=>{
                                        return <option value={`${contr.fullName}`} key={idx}>{contr.fullName}</option>
                                    })
                                }
                                
                            </select>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="deadline" className="text-sm">Deadline</label>
                            <input type="date" name="deadline" id="deadline" value={task.deadline} onChange={(e)=> setTask({...task, [e.target.name]: e.target.value})} className="bg-zinc-800 w-[300px] border-1 border-zinc-500 rounded px-2 py-1 text-sm" required/>
                        </div>
                        <input type="submit" value="Create" className="bg-sky-600 hover:bg-sky-700 ease-in duration-200 w-[300px] border-1 border-zinc-500 rounded px-2 py-1 text-lg cursor-pointer" disabled={isCreatingTask}/>
                    </form>
                </div>
            </div>
            <Toaster/>
        </div>
    )
}