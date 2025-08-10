import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore"
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoCameraOutline } from "react-icons/io5";
import { LuLoader } from "react-icons/lu";
import moment from "moment"

export const Profile=()=>{
    const {authUser,logout,changeProfile,isUpdatingImage}=useAuthStore()
    const [image,setImage]=useState(null)
    const navigate=useNavigate();
    useEffect(()=>{
        if(!authUser){
            navigate("/login")
        }
    },[authUser])
    console.log(authUser)

    const handleProfileChange=(e)=>{
        const f=e.target.files[0].name;
        const extension=f.split('.').pop()
        if(extension!='png' && extension!='jpg'){
            toast.error("Only jpg and png file formats are allowed!")
            return ;
        }
        const reader=new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onload=async()=>{
            const base64ImageUrl=reader.result;
            setImage(base64ImageUrl)
            changeProfile({profilePic: base64ImageUrl})
        }
    }

    return (
        <main className="bg-[#0d1117] min-h-[91.7vh]">
            <div className="w-[80%] mx-auto h-full py-12 ">
                <div className="flex flex-col items-center gap-4 ">
                    <div className="relative">
                        <img src={image || authUser?.profilePic || "./avatar.png"} alt="" className="w-[200px] h-[200px] object-cover border-4 border-sky-600 rounded-[50%] max-[650px]:w-[100px]"/>
                        <label htmlFor="profile">
                            {
                                isUpdatingImage?<LuLoader className="text-white bg-black border-2 border-sky-400 rounded-[50%] p-1 text-3xl absolute bottom-2 left-[70%] cursor-pointer" />:
                                <IoCameraOutline className="text-white bg-black border-2 border-sky-400 rounded-[50%] p-1 text-3xl absolute bottom-2 left-[70%] cursor-pointer" />
                            }
                        </label>
                        <input type="file" name="profile" id="profile" onChange={handleProfileChange} className="hidden" disabled={isUpdatingImage}/>
                    </div>
                    <button className="bg-rose-700 px-4 py-1 rounded-3xl text-white mb-4 max-[650px]:text-sm" onClick={async ()=> await logout()} disabled={isUpdatingImage}>Logout</button>
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