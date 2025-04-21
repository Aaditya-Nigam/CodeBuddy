import { Toaster } from "react-hot-toast"
import { NavLink, useNavigate } from "react-router-dom"
import { FcCollaboration } from "react-icons/fc";
import { PiChatsBold } from "react-icons/pi";
import { AiOutlineEnvironment } from "react-icons/ai";
import { GiThreeFriends } from "react-icons/gi";
import { RiSecurePaymentLine } from "react-icons/ri";
import { FaTasks } from "react-icons/fa";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore"

export const Home=()=>{
    const {authUser}=useAuthStore()
    const navigate=useNavigate();
    useEffect(()=>{
        if(!authUser){
            navigate("/login")
        }
    },[authUser])

    return (
        <main className="bg-[#0d1117] min-h-[91.7vh] text-white">
            <div className="h-full mx-auto">
                <div className="py-4 px-8 flex justify-center items-center gap-8 max-[800px]:flex-col">
                    <div className="flex flex-col gap-8 max-[800px]:order-2">
                        <div className="flex flex-col gap-2 text-7xl max-[1050px]:text-5xl max-[800px]:items-center">
                            <p>'Collaborate.</p>
                            <p>&nbsp;Code.</p>
                            <p>&nbsp;Create.'</p>
                        </div>
                        <p className="text-2xl max-[800px]:text-xl">Join coding sessions, and build together in real-time</p>
                        <div className="flex gap-4 justify-center text-xl max-[800px]:text-base">
                            <NavLink to={"/projects"} className="bg-sky-600 px-4 py-0.5 rounded hover:bg-sky-700">Create Project</NavLink>
                            <NavLink to={"/projects"} className="bg-sky-600 px-4 py-0.5 rounded hover:bg-sky-700">Join Project</NavLink>
                        </div>
                    </div>
                    <img src="/moon.png" alt="moon" className="h-[500px] max-[1050px]:h-[350px] max-[800px]:order-1"/>
                </div>

                <div className="w-[80%] mx-auto grid grid-cols-[3fr_1fr] gap-8 py-8  items-center max-[850px]:flex max-[850px]:flex-col max-[850px]:gap-0">
                    <div className="flex items-center justify-center px-4 my-12 border-r-1 border-zinc-800 h-[300px] max-[850px]:border-0 max-[850px]:mb-0">
                        <img src="/editor.png" alt="editor" className="h-full object-contain rounded-xl "/>
                    </div>
                    <div className="px-4 py-12 grid grid-cols-[1fr_1fr] gap-y-4 gap-x-2">
                        <div className="bg-[#1e232795] px-4 py-2 rounded-lg flex flex-col items-center w-[220px] gap-2 max-[1100px]:w-[200px] max-[950px]:w-[180px] max-[850px]:w-[220px] max-[500px]:w-[160px]">
                            <FcCollaboration className="text-2xl max-[1100px]:text-xl max-[950px]:text-lg max-[850px]:text-2xl max-[500px]:text-lg"/>
                            <p className="text-base max-[1100px]:text-sm max-[950px]:text-xs max-[850px]:text-base max-[500px]:text-[10px]">Real-time Collaborator</p>
                        </div>
                        <div className="bg-[#1e232795] px-4 py-2 rounded-lg flex flex-col items-center w-[220px]  gap-2 max-[1100px]:w-[200px] max-[950px]:w-[180px] max-[850px]:w-[220px] max-[500px]:w-[160px]">
                            <PiChatsBold className="text-2xl max-[1100px]:text-xl max-[950px]:text-lg max-[850px]:text-2xl max-[500px]:text-lg"/>
                            <p className="text-base max-[1100px]:text-sm max-[950px]:text-[10px] max-[850px]:text-base max-[500px]:text-[10px]">Live chat</p>
                        </div>
                        <div className="bg-[#1e232795] px-4 py-2 rounded-lg flex flex-col items-center w-[220px]  gap-2 max-[1100px]:w-[200px] max-[950px]:w-[180px] max-[850px]:w-[220px] max-[500px]:w-[160px]">
                            <AiOutlineEnvironment className="text-2xl max-[1100px]:text-xl max-[950px]:text-lg max-[850px]:text-2xl max-[500px]:text-lg"/>
                            <p className="text-sm max-[1100px]:text-xs max-[950px]:text-[10px] max-[850px]:text-sm max-[500px]:text-[9px]">Collaborative Environment</p>
                        </div>
                        <div className="bg-[#1e232795] px-4 py-2 rounded-lg flex flex-col items-center w-[220px]  gap-2  max-[1100px]:w-[200px] max-[950px]:w-[180px] max-[850px]:w-[220px] max-[500px]:w-[160px]">
                            <GiThreeFriends className="text-2xl max-[1100px]:text-xl max-[950px]:text-lg max-[850px]:text-2xl max-[500px]:text-lg"/>
                            <p className="text-base max-[1100px]:text-sm max-[950px]:text-[10px] max-[850px]:text-base max-[500px]:text-[10px]">Developer Friendly</p>
                        </div>
                        <div className="bg-[#1e232795] px-4 py-2 rounded-lg flex flex-col items-center w-[220px]  gap-2 max-[1100px]:w-[200px] max-[950px]:w-[180px] max-[850px]:w-[220px] max-[500px]:w-[160px]">
                            <RiSecurePaymentLine className="text-2xl max-[1100px]:text-xl max-[950px]:text-lg max-[850px]:text-2xl max-[500px]:text-lg"/>
                            <p className="text-base max-[1100px]:text-sm max-[950px]:text-[10px] max-[850px]:text-base max-[500px]:text-[10px]">Secure & Reliable</p>
                        </div>
                        <div className="bg-[#1e232795] px-4 py-2 rounded-lg flex flex-col items-center w-[220px]  gap-2 max-[1100px]:w-[200px] max-[950px]:w-[180px] max-[850px]:w-[220px] max-[500px]:w-[160px]">
                            <FaTasks className="text-2xl max-[1100px]:text-xl max-[950px]:text-lg max-[850px]:text-2xl max-[500px]:text-lg"/>
                            <p className="text-base max-[1100px]:text-sm max-[950px]:text-[10px] max-[850px]:text-base max-[500px]:text-[10px]">Tasks Management</p>
                        </div>
                        
                    </div>
                </div>
            </div>
            <Toaster/>
        </main>
    )
}