import { useEffect, useRef, useState } from "react"
import { useMessgageStore } from "../store/useMessageStore"
import { useAuthStore } from "../store/useAuthStore"
import toast, { Toaster } from "react-hot-toast"
import { Loader } from "../components/UI/Loader"
import { NavLink, useParams } from "react-router-dom"
import { MdGroups2 } from "react-icons/md";
import chatBg from "/chatBg.avif"
import { IoArrowBackCircleOutline } from "react-icons/io5";

export const Message=()=>{

    const {projectId}=useParams()
    const {messages,isLoadingMessage,loadMessages,isSendingMessage,sendMessage,subscribeToMessages}=useMessgageStore()
    const {authUser,socket}=useAuthStore()
    const [msg,setMsg]=useState("");
    const [reload,setReload]=useState(false)
    console.log(messages)


    useEffect(()=>{
        loadMessages(projectId)
        socket.emit('join-room',projectId);
        subscribeToMessages();
    },[reload,projectId])

    if(isLoadingMessage){
        return <Loader/>
    }

    const checkFormData=()=>{
        if(msg.trim().length==0){
            toast.error("Enter a msg..")
            return false;
        }
        return true;
    }

    const handleMessageSend=(e)=>{
        e.preventDefault();
        try {
            console.log(msg)
            const check=checkFormData();
            if(check){
                sendMessage(projectId,msg);
                setMsg("");
                setReload(!reload);
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    return (
        <main className={`bg-[url(/chatBg.avif)] bg-contain fixed top-0 w-screen h-screen flex items-center justify-center max-[600px]:hidden`} >
            <div className="w-[80%] rounded-lg h-full text-white grid grid-rows-[1fr_16fr_1fr]" onClick={(e)=> e.stopPropagation()}>            
                <div className="bg-black flex items-center justify-between px-2 rounded-3xl gap-3">
                    <div className="flex gap-3">
                        <MdGroups2 className="text-3xl border-2 p-0.5 rounded-[50%]"/>
                        <h1 className="text-2xl text-white">testVersion2</h1>
                    </div>
                    <NavLink to={'/projects'}>
                        <IoArrowBackCircleOutline className="text-3xl cursor-pointer"/>
                    </NavLink>
                </div>
                <div className="overflow-auto messageContainer p-2 flex flex-col gap-2">
                    {
                        messages.map((msg,idx)=>{
                            return (
                                <div key={idx} className={`${msg.senderId._id==authUser._id?'self-end':''} flex gap-1 items-center`}>
                                    <img src="/avatar.png" alt="avatar" className={`${authUser._id==msg.senderId._id?'hidden':''} h-[25px] max-[700px]:h-[20px]`}/>
                                    <div className={`${msg.senderId._id==authUser._id?'bg-green-700':'bg-zinc-500'} px-2 py-0.5 max-w-[400px] rounded-lg max-[700px]:max-w-[200px] max-[700px]:text-sm`}>
                                        {
                                            msg.senderId._id!=authUser._id?<p className="text-[10px] text-zinc-300">- {msg.senderId.userName}</p>:""
                                        }
                                        <p>{msg.text}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="p-1">
                    <div className="h-full w-full rounded-2xl">
                        <form className="h-full w-full rounded-2xl grid grid-cols-[10fr_1fr] items-center gap-2" onSubmit={handleMessageSend}>
                            <textarea rows={1} name="message" id="message" placeholder="Enter a message..." value={msg} onChange={(e)=> setMsg(e.target.value)} className="outline-none px-2 py-2 text-sm rounded-2xl bg-zinc-700 border-1 border-zinc-900"/>
                            <input type="submit" value="Send" className="rounded-2xl bg-green-700 boder-1 py-1 h-fit cursor-pointer hover:bg-green-800 max-[800px]:text-sm"/>
                        </form>
                    </div>
                </div>
            </div>
            <Toaster/>
        </main>
    )
}