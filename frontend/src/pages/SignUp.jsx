import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast"
import { useAuthStore } from "../store/useAuthStore";

export const SignUp=()=>{
    const {authUser,signup,isSigningUp}=useAuthStore()
    const [user,setUser]=useState({
        fullName: "",
        userName: "",
        email: "",
        password: ""
    })
    const navigate=useNavigate();
    useEffect(()=>{
        if(authUser){
            navigate("/")
        }
    },[authUser])

    const [showPassword,setShowPassword]=useState(false)

    const checkFormData=()=>{
        if(user.fullName.trim().length==0){
            toast.error("Provide full name!!")
            return false;
        }
        if(user.userName.trim().length==0){
            toast.error("Provide username!!")
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(user.email)){
            toast.error("Invalid email!!")
            return false;
        }
        if(user.password.length<6){
            toast.error("Password must be atleast 6 words!!")
            return false;
        }
        return true;
    }

    const handleFormSubmit=async (e)=>{
        e.preventDefault();
        const check=checkFormData();
        if(check){
            const sign=await signup(user);
            setUser({
                fullName: "",
                userName: "",
                email: "",
                password: ""
            })
        }
    }

    return (
        <div className="w-screen h-screen bg-gradient-to-br from-black via-[#210537] to-[#490b76] flex items-center justify-center text-white">
            <div className="w-[500px] p-4 rounded-xl max-[500px]:w-[300px] border-t-1 border-[#ffffff32] shadow-lg shadow-[#ffffff45]">
                <div className="flex justify-center p-2">
                    <img src="./logo_short.jpg" alt="" className=" h-[60px] rounded-xl border-1 border-zinc-700"/>
                </div>
                <form onSubmit={handleFormSubmit} className="flex flex-col items-center">
                    <div className="flex flex-col justify-center items-center gap-1">
                        <h1 className="text-2xl max-[500px]:text-lg">Create Account</h1>
                        <p className="text-md max-[500px]:text-sm">Get started with your free account</p>
                    </div>
                    <div className="py-8 flex flex-col items-center gap-4 w-full min-[500px]:w-[400px]">
                        <div className="flex flex-col gap-1 w-full">
                            <label htmlFor="fullName" className="text-zinc-400 max-[500px]:text-sm">Full Name</label>
                            <div className="flex items-center gap-2 px-2 py-1 text-sm text-zinc-300 border-1 border-zinc-600 rounded w-full outline-none bg-[#261634]">
                                <FaRegUser className="text-sm"/>
                                <input type="text" name="fullName" id="fullName" value={user.fullName} onChange={(e)=> setUser({...user,[e.target.name]: e.target.value})} placeholder="Aaditya Nigam" className="w-full outline-none max-[500px]:text-sm"/>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <label htmlFor="userName" className="text-zinc-400 max-[500px]:text-sm">Username</label>
                            <div className="flex items-center gap-2 px-2 py-1 text-sm text-zinc-300 border-1 border-zinc-600 rounded w-full outline-none bg-[#261634]">
                                <FaRegUser className="text-sm"/>
                                <input type="text" name="userName" id="userName" value={user.userName} onChange={(e)=> setUser({...user,[e.target.name]: e.target.value})} placeholder="Aaditya_Nigam" className="w-full outline-none max-[500px]:text-sm"/>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <label htmlFor="email" className="text-zinc-400 max-[500px]:text-sm">Email</label>
                            <div className="flex items-center gap-2 px-2 py-1 text-sm text-zinc-300 border-1 border-zinc-600 rounded w-full outline-none bg-[#261634]">
                                <MdOutlineEmail className="text-lg"/>
                                <input type="email" name="email" id="email" value={user.email} onChange={(e)=> setUser({...user,[e.target.name]: e.target.value})} placeholder="aaditya@email.com" className="w-full outline-none max-[500px]:text-sm"/>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <label htmlFor="password" className="text-zinc-400 max-[500px]:text-sm">Password</label>
                            <div className="flex items-center gap-2 px-2 py-1 text-sm text-zinc-300 border-1 border-zinc-600 rounded w-full outline-none bg-[#261634]">
                                <TbLockPassword className="text-lg"/>
                                <input type={showPassword?"text":"password"} name="password" id="password" value={user.password} onChange={(e)=> setUser({...user,[e.target.name]: e.target.value})} placeholder="********" className="w-full outline-none max-[500px]:text-sm"/>
                                {
                                    showPassword?
                                    <FaEyeSlash className="text-lg cursor-pointer" onClick={()=> setShowPassword(!showPassword)}/>:
                                    <FaEye className="text-lg cursor-pointer" onClick={()=> setShowPassword(!showPassword)}/>
                                }   
                            </div>
                        </div>
                        <div className="w-full flex flex-col gap-2 items-center">
                            <input type="submit" value="Sign Up" className="bg-sky-500 w-full py-1 text-xl rounded-lg cursor-pointer hover:bg-sky-600 my-2 max-[500px]:text-base"/>
                            <p className="max-[500px]:text-sm">Already has an account? <NavLink to="/login" className="text-sky-400 hover:text-sky-600 hover:underline">Sign in</NavLink></p>
                        </div>
                    </div>
                </form>
            </div>
            <Toaster/>
        </div>
    )
}