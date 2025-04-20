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
                <div className="flex flex-col items-center gap-4 ">
                    <img src={authUser?.profilePic || "./avatar.png"} alt="" className="w-[200px] border-4 border-sky-600 rounded-[50%] max-[650px]:w-[100px]"/>
                    <button className="bg-rose-700 px-4 py-1 rounded-3xl text-white mb-4 max-[650px]:text-sm" onClick={async ()=> await logout()}>Logout</button>
                    <div className="flex flex-col gap-4 w-fit">
                        <div className="flex gap-4 text-white">
                            <p className="text-zinc-400 text-lg max-[650px]:text-base">Full Name</p>
                            <p className="bg-zinc-800 w-[300px] px-4 py-0.5 rounded text-zinc-400 border-1 border-zinc-700 max-[650px]:text-sm max-[650px]:w-[150px]">{authUser?.fullName}</p>
                        </div>
                        <div className="flex gap-4 text-white">
                            <p className="text-zinc-400 text-lg max-[650px]:text-base">Username</p>
                            <p className="bg-zinc-800 w-[300px] px-4 py-0.5 rounded text-zinc-400 border-1 border-zinc-700 max-[650px]:text-sm max-[650px]:w-[150px]">{authUser?.userName}</p>
                        </div>
                        <div className="flex gap-4 text-white">
                            <p className="text-zinc-400 text-lg max-[650px]:text-base">Email</p>
                            <p className="bg-zinc-800 w-[300px] px-4 py-0.5 rounded text-zinc-400 border-1 border-zinc-700 max-[650px]:text-sm max-[650px]:w-[170px]">{authUser?.email}</p>
                        </div>
                        <div className="flex gap-4 text-white">
                            <p className="text-zinc-400 text-lg max-[650px]:text-base">No of Projects</p>
                            <p className="bg-zinc-800 w-[300px] px-4 py-0.5 rounded text-zinc-400 border-1 border-zinc-700 max-[650px]:text-sm max-[650px]:w-[150px]">{authUser?.projects.length}</p>
                        </div>
                        <div className="flex gap-4 text-white">
                            <p className="text-zinc-400 text-lg max-[650px]:text-base">Member since</p>
                            <p className="bg-zinc-800 w-[300px] px-4 py-0.5 rounded text-zinc-400 border-1 border-zinc-700 max-[650px]:text-sm max-[650px]:w-[150px]">{moment(authUser?.createdAt).fromNow()}</p>
                        </div>
                        <div className="flex gap-4 text-white">
                            <p className="text-zinc-400 text-lg max-[650px]:text-base">Skills</p>
                            <div className="flex gap-4 w-[250px] flex-wrap">
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