import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore"
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import moment from "moment"

export const Profile=()=>{
    const {authUser,logout}=useAuthStore()
    const navigate=useNavigate();
    useEffect(()=>{
        if(!authUser){
            navigate("/login")
        }
    },[authUser])
    return (
        <main className="bg-[#0d1117] h-[91.7vh]">
            <div className="w-[80%] mx-auto h-full py-12 ">
                <div className="flex flex-col items-center gap-4">
                    <img src={authUser?.profilePic || "./avatar.png"} alt="" className="w-[200px] border-4 border-sky-600 rounded-[50%]"/>
                    <button className="bg-rose-700 px-4 py-1 rounded-3xl text-white mb-4" onClick={async ()=> await logout()}>Logout</button>
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-4 text-white">
                            <p className="text-zinc-400 text-lg">Full Name</p>
                            <p className="bg-zinc-800 w-[300px] px-4 py-0.5 rounded text-zinc-400 border-1 border-zinc-700">{authUser?.fullName}</p>
                        </div>
                        <div className="flex gap-4 text-white">
                            <p className="text-zinc-400 text-lg">Username</p>
                            <p className="bg-zinc-800 w-[300px] px-4 py-0.5 rounded text-zinc-400 border-1 border-zinc-700">{authUser?.userName}</p>
                        </div>
                        <div className="flex gap-4 text-white">
                            <p className="text-zinc-400 text-lg">Email</p>
                            <p className="bg-zinc-800 w-[300px] px-4 py-0.5 rounded text-zinc-400 border-1 border-zinc-700">{authUser?.email}</p>
                        </div>
                        <div className="flex gap-4 text-white">
                            <p className="text-zinc-400 text-lg">No of Projects</p>
                            <p className="bg-zinc-800 w-[300px] px-4 py-0.5 rounded text-zinc-400 border-1 border-zinc-700">{authUser?.projects.length}</p>
                        </div>
                        <div className="flex gap-4 text-white">
                            <p className="text-zinc-400 text-lg">Member since</p>
                            <p className="bg-zinc-800 w-[300px] px-4 py-0.5 rounded text-zinc-400 border-1 border-zinc-700">{moment(authUser?.createdAt).fromNow()}</p>
                        </div>
                        <div className="flex gap-4 text-white">
                            <p className="text-zinc-400 text-lg">Skills</p>
                            <div className="flex gap-4 w-[400px] flex-wrap">
                                {
                                    authUser?.skills.map((skill,index)=>{
                                        return <p key={index} className="bg-zinc-800 px-4 py-0.5 rounded text-zinc-400 border-1 border-zinc-700">{skill}</p>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster/>
        </main>
    )
}