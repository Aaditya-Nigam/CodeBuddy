import { useEffect, useRef, useState } from "react"
import { useMessgageStore } from "../../store/useMessageStore"
import { useAuthStore } from "../../store/useAuthStore"
import toast, { Toaster } from "react-hot-toast"

export const Message=({showMessage,setShowMessage,id})=>{

    const {messages,isLoadingMessage,loadMessages,isSendingMessage,sendMessage,subscribeToMessages}=useMessgageStore()
    const {authUser,socket}=useAuthStore()
    const [msg,setMsg]=useState("");
    const [reload,setReload]=useState(false)
    const messageContainer=useRef(null);


    useEffect(()=>{
        const container=messageContainer.current;
        if(container){
            container.scrollTop=container.scrollHeight;
        }
    },[messages])

    useEffect(()=>{
        loadMessages(id)
        socket.emit('join-room',id);
        subscribeToMessages();
    },[reload,id])

    if(isLoadingMessage){
        return <h1>Loading..</h1>
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
                sendMessage(id,msg);
                setMsg("");
                setReload(!reload);
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    return (
        <main className={`bg-[#000000ee] fixed top-0 w-screen h-screen flex items-center justify-center ${showMessage?'':'hidden'}`} onClick={()=> setShowMessage(false)}>
            <div className="w-[1000px] border-4 rounded-lg h-[600px] border-green-900 text-white grid grid-rows-[15fr_1fr] bg-black" onClick={(e)=> e.stopPropagation()}>
                <div className="overflow-auto messageContainer p-2 flex flex-col gap-2" ref={messageContainer}>
                    {
                        messages.map((msg,idx)=>{
                            return (
                                <div className={`${msg.senderId==authUser._id?'self-end':''} flex gap-1`}>
                                    <img src="/avatar.png" alt="avatar" className={`${authUser._id==msg.senderId?'hidden':''} h-[25px]`}/>
                                    <pre className={`${msg.senderId==authUser._id?'bg-green-500':'bg-zinc-500'} px-2 py-0.5 max-w-[400px] rounded-lg `}>{msg.text}</pre>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="p-1">
                    <div className="h-full w-full rounded-2xl">
                        <form className="h-full w-full rounded-2xl grid grid-cols-[10fr_1fr] items-center gap-2" onSubmit={handleMessageSend}>
                            <textarea rows={2} name="message" id="message" placeholder="Enter a message..." value={msg} onChange={(e)=> setMsg(e.target.value)} className="outline-none px-2 py-1 text-sm rounded-2xl bg-zinc-700 border-1 border-zinc-900"/>
                            <input type="submit" value="Send" className="rounded-2xl bg-green-700 boder-1 py-1 h-fit cursor-pointer hover:bg-green-800"/>
                        </form>
                    </div>
                </div>
            </div>
            <Toaster/>
        </main>
    )
}