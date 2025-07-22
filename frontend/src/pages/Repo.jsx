import { NavLink, useNavigate, useParams } from "react-router-dom"
import { useProjectStore } from "../store/useProjectStore"
import { useEffect, useState } from "react"
import { useAuthStore } from "../store/useAuthStore"
import { FaRegUser } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import moment from "moment"
import { NewFile } from "../components/UI/NewFile";
import toast, { Toaster } from "react-hot-toast";
import { FaRegCopy } from "react-icons/fa6";
import { LuCopyCheck } from "react-icons/lu";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { SiTicktick } from "react-icons/si";
import { MdDeleteOutline } from "react-icons/md";
import { FaPlusSquare } from "react-icons/fa";
import { NewTask } from "../components/UI/NewTask";
import { Message } from "../components/UI/Message";
import { TbMessage2Filled } from "react-icons/tb";
import { FaStar } from "react-icons/fa6";
import { Loader } from "../components/UI/Loader";

export const Repo=()=>{

    const {id}=useParams()
    const {isLoading,project,loadProject,deleteFile,isCreatingProject,deleteTask,completeTask}=useProjectStore()
    const {authUser,socket}=useAuthStore()
    const [showCreate,setShowCreate]=useState(false);
    const [copy,setCopy]=useState(false)
    const [showTasks,setShowTasks]=useState(true)
    const [showNewTasks,setShowNewTasks]=useState(false)
    const [showMessage,setShowMessage]=useState(false)
    const [files,setFiles]=useState([]);
    const navigate=useNavigate();
    useEffect(()=>{
        if(!authUser){
            navigate("/login")
        }
    },[authUser])
    
    useEffect(()=>{
        loadProject(id);
    },[id])

    useEffect(()=>{
        if(project){
            setFiles(project.files)
        }
    },[project])

    if(isLoading && !project){
        return <Loader/>
    }

    const handleCopyId=async(projectId)=>{
        try {
            await navigator.clipboard.writeText(projectId)
            setCopy(true)
            toast.success("Id copied!!")
            setTimeout(()=>{
                setCopy(false)
            },1000)
        } catch (error) {
            console.log("Fail in copy: ",error.message)
        }
    }

    const handleFileSearch=(e)=>{
        const updatedList=project.files.filter((file)=>{
            return file.fileName.toLowerCase().includes(e.target.value.toLowerCase());
        })
        setFiles(updatedList)
    }

    return (
        <>
            <main className="bg-[#0d1117] h-[91.7vh]">
                <div className="w-[80%] mx-auto h-full grid grid-cols-[1fr_3fr] p-2 max-[900px]:block">
                    {/* left */}
                    <div className="flex flex-col gap-4 border-r-2 border-[#1e232795] p-2 w-full overflow-hidden max-[900px]:hidden">
                        <div className="text-white flex flex-col gap-2  py-2 w-full">
                            <h1 className="text-xl border-b-2 py-2 border-[#1e232795] mx-4">Collaborators</h1>
                            <div className="flex flex-col gap-3 mx-2">
                                {
                                    project.collaborators.map((colab,index)=>{
                                        return (
                                            <div key={index} className="flex gap-2 items-center">
                                                <RxAvatar className="text-2xl"/>
                                                <p className="text-sm">{colab.fullName}</p>
                                                {
                                                    colab._id==project.author?<FaStar className="text-xs"/>:''
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="text-white flex flex-col gap-2 py-2 w-full">
                            <div className="text-xl border-b-2 py-2 border-[#1e232795] flex justify-between items-center">
                                <h1 >Tasks</h1>
                                <div className="flex items-center gap-2">
                                    <FaPlusSquare className="text-sm" onClick={()=>setShowNewTasks(true)}/>
                                    {
                                        showTasks?<IoIosArrowDown className="text-sm cursor-pointer" onClick={()=> setShowTasks(false)}/>:<IoIosArrowUp className="text-sm cursor-pointer" onClick={()=> setShowTasks(true)}/>
                                    }  
                                </div>
                            </div>
                            <div className={`flex flex-col gap-2 max-h-[300px] overflow-auto taskContainer ${showTasks? '':'hidden'}`}>
                                {
                                    project.tasks.map((task,idx)=>{
                                        return (
                                            <div key={idx} className="grid grid-cols-[4fr_1fr] gap-1 py-1 px-4 bg-[#1e2327] rounded">
                                                <div className="w-full overflow-auto taskContainer">
                                                    {
                                                        task.completed?<h1 className="text-sm line-through text-green-500 ">{task.title}</h1>:<h1 className="text-sm w-full">{task.title}</h1>
                                                    }
                                                    <p className="text-xs text-zinc-700 w-full">{task.author}</p>
                                                </div>
                                                <div className="flex gap-2 items-center">
                                                    {
                                                        task.completed?<SiTicktick className="text-sm text-green-500 cursor-pointer" onClick={()=> completeTask(task._id)}/>:<SiTicktick className="text-sm cursor-pointer" onClick={()=> completeTask(task._id)}/>
                                                    }
                                                    <MdDeleteOutline className="cursor-pointer" onClick={()=> deleteTask(project._id,task._id)}/>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>


                    {/* right */}
                    <div className="fileContainer py-4 px-8 w-full text-white overflow-auto">
                        <div className="flex gap-4 items-center max-[520px]:flex-col">
                            <h1 className="text-2xl underline max-[700px]:text-xl">{project.projectName}</h1>
                            <div className="flex gap-8 items-center bg-[#1e2327] px-2 py-1 border-1 border-zinc-700 rounded max-[700px]:gap-4">
                                <p className="text-sm max-[700px]:text-xs">{project._id}</p>
                                {
                                    copy?<LuCopyCheck className="text-sm cursor-pointer text-green-600 max-[700px]:text-xs"/>:<FaRegCopy className="text-sm cursor-pointer max-[700px]:text-xs" onClick={()=>handleCopyId(project._id)}/>
                                }
                            </div>
                            <TbMessage2Filled className="text-xl cursor-pointer max-[700px]:text-base max-[600px]:hidden" onClick={()=> setShowMessage(true)}/>
                        </div>
                        <div className="grid grid-cols-[10fr_1fr] gap-4 justifycenter py-4">
                            <form>
                                <input type="text" name="file" id="file" placeholder="Find files.." onChange={handleFileSearch} className="w-[600px] rounded-lg border-1 border-zinc-700 bg-[#1e2327] outline-none placeholder-zinc-600 text-zinc-400 px-2 py-1 text-sm w-full"/>    
                            </form>
                            <button className="bg-sky-600 px-4 rounded-xl text-white flex items-center cursor-pointer" onClick={()=> setShowCreate(true)}>New</button>    
                        </div> 
                        <div className="py-4 flex flex-col gap-2">
                            {
                                files.map((file,index)=>{
                                    return ( 
                                        <div key={index} className="bg-[#1e2327] px-4 py-2 rounded-lg flex justify-between items-center">
                                            <div>
                                                <NavLink to={`/projects/${project._id}/${file._id}/${index}`} className="text-md">{file.fileName?.split('.')[0]}&nbsp;&nbsp;<span className="text-xs text-zinc-700">{moment(file.createdAt).fromNow()}</span></NavLink>
                                                <p className="text-sm text-zinc-400">Language: <span className="text-zinc-600">{file.language}</span></p>
                                            </div>
                                            <div>
                                                <MdDelete className="text-2xl" onClick={(e)=> {deleteFile(file._id)}}/>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            {
                                files.length==0?<p className="text-zinc-700">No file found!</p>:""
                            }
                        </div>
                    </div>
                </div>
            </main>
            <NewFile showCreate={showCreate} setShowCreate={setShowCreate}/>
            <NewTask showNewTasks={showNewTasks} setShowNewTasks={setShowNewTasks} collaborators={project.collaborators} id={id}/>
            <Message showMessage={showMessage} setShowMessage={setShowMessage} id={id}/>
            <Toaster/>
        </>
    )
}