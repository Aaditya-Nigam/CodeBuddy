import { Toaster } from "react-hot-toast"
import { NavLink } from "react-router-dom"
import { FcCollaboration } from "react-icons/fc";
import { PiChatsBold } from "react-icons/pi";
import { AiOutlineEnvironment } from "react-icons/ai";
import { GiThreeFriends } from "react-icons/gi";
import { RiSecurePaymentLine } from "react-icons/ri";
import { FaTasks } from "react-icons/fa";

export const Home=()=>{
    return (
        <main className="bg-[#0d1117] min-h-[91.7vh] text-white">
            <div className="w-[80%] h-full mx-auto p-2">
                <div className="py-4 px-2 flex justify-center items-center gap-8 max-[700px]:flex-col">
                    <div className="flex flex-col gap-8 max-[700px]:order-2">
                        <div className="flex flex-col gap-2 text-8xl max-lg:text-4xl">
                            <p>'Collaborate.</p>
                            <p>&nbsp;Code.</p>
                            <p>&nbsp;Create.'</p>
                        </div>
                        <p className="text-2xl max-lg:text-lg">Join coding sessions, and build together in real-time</p>
                        <div className="flex gap-4 justify-center text-xl max-lg:text-sm">
                            <NavLink to={"/projects"} className="bg-sky-600 px-4 py-0.5 rounded hover:bg-sky-700">Create Project</NavLink>
                            <NavLink to={"/projects"} className="bg-sky-600 px-4 py-0.5 rounded hover:bg-sky-700">Join Project</NavLink>
                        </div>
                    </div>
                    <img src="/moon.png" alt="moon" className="h-[500px] max-lg:h-[350px] max-[700px]:order-1"/>
                </div>

                <div className="grid grid-cols-[1fr_1fr] gap-8 py-8 max-[800px]:flex max-[800px]:flex-col max-[800px]:gap-0 items-center">
                    <div className="flex items-center justify-center px-4 my-12 border-r-1 border-zinc-800 max-[800px]:my-0 max-[800px]:border-0">
                        <img src="/editor.png" alt="editor" className="h-[300px] rounded-xl max-lg:h-[180px]"/>
                    </div>
                    <div className="px-4 py-12 grid grid-cols-[1fr_1fr] gap-y-4 gap-x-2">
                        <div className="bg-[#1e232795] px-4 py-2 rounded-lg flex flex-col items-center w-[220px] h-[75px] gap-2 max-[450px]:w-[160px] max-[450px]:h-[55px] max-lg:w-[200px] max-lg:h-[55px] ">
                            <FcCollaboration className="text-2xl max-lg:text-xl"/>
                            <p className="max-[450px]:text-[10px] max-lg:text-xs">Real-time Collaborator</p>
                        </div>
                        <div className="bg-[#1e232795] px-4 py-2 rounded-lg flex flex-col items-center w-[220px] h-[75px] gap-2 max-[450px]:w-[160px] max-[450px]:h-[55px] max-lg:w-[200px] max-lg:h-[55px] ">
                            <PiChatsBold className="text-2xl max-lg:text-xl"/>
                            <p className="max-[450px]:text-[10px] max-lg:text-xs">Live chat</p>
                        </div>
                        <div className="bg-[#1e232795] px-4 py-2 rounded-lg flex flex-col items-center w-[220px] h-[75px] gap-2 max-[450px]:w-[160px] max-[450px]:h-[55px] max-lg:w-[200px] max-lg:h-[55px] ">
                            <AiOutlineEnvironment className="text-2xl max-lg:text-xl"/>
                            <p className="max-[450px]:text-[9px] max-lg:text-xs text-sm">Collaborative Environment</p>
                        </div>
                        <div className="bg-[#1e232795] px-4 py-2 rounded-lg flex flex-col items-center w-[220px] h-[75px] gap-2 max-[450px]:w-[160px] max-[450px]:h-[55px] max-lg:w-[200px] max-lg:h-[55px] ">
                            <GiThreeFriends className="text-2xl max-lg:text-xl"/>
                            <p className="max-[450px]:text-[10px] max-lg:text-xs">Developer Friendly</p>
                        </div>
                        <div className="bg-[#1e232795] px-4 py-2 rounded-lg flex flex-col items-center w-[220px] h-[75px] gap-2 max-[450px]:w-[160px] max-[450px]:h-[55px] max-lg:w-[200px] max-lg:h-[55px] ">
                            <RiSecurePaymentLine className="text-2xl max-lg:text-xl"/>
                            <p className="max-[450px]:text-[10px] max-lg:text-xs">Secure & Reliable</p>
                        </div>
                        <div className="bg-[#1e232795] px-4 py-2 rounded-lg flex flex-col items-center w-[220px] h-[75px] gap-2 max-[450px]:w-[160px] max-[450px]:h-[55px] max-lg:w-[200px] max-lg:h-[55px] ">
                            <FaTasks className="text-2xl max-lg:text-xl"/>
                            <p className="max-[450px]:text-[10px] max-lg:text-xs">Tasks Management</p>
                        </div>
                        
                    </div>
                </div>
            </div>
            <Toaster/>
        </main>
    )
}