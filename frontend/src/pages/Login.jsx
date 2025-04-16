import { MdOutlineEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast"
import { useAuthStore } from "../store/useAuthStore";

export const Login=()=>{
    const {authUser,login,isLoggingIn}=useAuthStore()
    const [user,setUser]=useState({
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
            const log=await login(user);
            setUser({
                email: "",
                password: ""
            })
        }
    }

    return (
        <div className="w-screen h-screen bg-black flex items-center justify-center text-white">
            <div className="w-[500px] p-4 rounded-xl">
                <div className="flex justify-center p-2">
                    <img src="./logo_short.jpg" alt="" className=" h-[60px] rounded-xl border-1 border-zinc-700"/>
                </div>
                <form onSubmit={handleFormSubmit}>
                    <div className="flex flex-col justify-center items-center gap-1">
                        <h1 className="text-2xl">Create Account</h1>
                        <p className="text-md">Get started with your free account</p>
                    </div>
                    <div className="py-8 flex flex-col items-center gap-4">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="email" className="text-zinc-400">Email</label>
                            <div className="flex items-center gap-2 px-2 py-1 text-sm text-zinc-300 border-1 border-zinc-600 rounded w-[400px] outline-none">
                                <MdOutlineEmail className="text-lg"/>
                                <input type="email" name="email" id="email" value={user.email} onChange={(e)=> setUser({...user,[e.target.name]: e.target.value})} placeholder="aaditya@email.com" className="w-full outline-none"/>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="password" className="text-zinc-400">Password</label>
                            <div className="flex items-center gap-2 px-2 py-1 text-sm text-zinc-300 border-1 border-zinc-600 rounded w-[400px] outline-none">
                                <TbLockPassword className="text-lg"/>
                                <input type={showPassword?"text":"password"} name="password" id="password" value={user.password} onChange={(e)=> setUser({...user,[e.target.name]: e.target.value})} placeholder="********" className="w-full outline-none"/>
                                {
                                    showPassword?
                                    <FaEyeSlash className="text-lg cursor-pointer" onClick={()=> setShowPassword(!showPassword)}/>:
                                    <FaEye className="text-lg cursor-pointer" onClick={()=> setShowPassword(!showPassword)}/>
                                }   
                            </div>
                        </div>
                        <div className="w-[400px] flex flex-col gap-2 items-center">
                            <input type="submit" value="Login" className="bg-sky-500 w-full py-1 text-xl rounded-lg cursor-pointer hover:bg-sky-600 my-2"/>
                            <p>Don't have an account? <NavLink to="/signup" className="text-sky-400 hover:text-sky-600 hover:underline">Sign Up</NavLink></p>
                        </div>
                    </div>
                </form>
            </div>
            <Toaster/>
        </div>
    )
}