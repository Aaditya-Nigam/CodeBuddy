import { create } from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useProjectStore } from "./useProjectStore";


export const useAuthStore=create((set,get)=>({
    authUser: null,
    isCheckingAuth:true,
    isSigningUp: false,
    isLoggingIn: false,
    isCreatingProject: false,
    isJoiningProject: false,

    signup: async(user)=>{
        set({isSigningUp: true})
        try {
            const res=await axiosInstance.post("/auth/signUp",user);
            set({authUser: res.data})
            toast.success("Successfully signed up!!")
            set({isSigningUp: false})
            return true;
        } catch (error) {
            set({authUser: null})
            toast.error(error.message)
            set({isSigningUp: false})
            return false;
        }
        
    },

    login: async(user)=>{
        set({isLoggingIn: true})
        try {
            const res=await axiosInstance.post("/auth/signIn",user);
            set({authUser: res.data});
            toast.success("successfully logged in!!")
            set({isLoggingIn: false})
            return true;
        } catch (error) {
            toast.error(error.message)
            set({isLoggingIn: false})
            return false;
        }
    },

    logout: async()=>{
        try {
            const res=await axiosInstance.post("/auth/logout")
            const data=res.data;
            set({authUser: null});
            toast.success(data.message);
        } catch (error) {
            toast.error(error.message)
        }
    },

    check: async()=>{
        try {
            const res=await axiosInstance.get("/auth/check")
            set({authUser: res.data});
        } catch (error) {
            set({authUser: null});
        }finally{
            set({isCheckingAuth: false})
        }
    },

    createProject: async(formData)=>{
        set({isCreatingProject: true})
        try {
            const authUser=get().authUser
            const res=await axiosInstance.post("/project/newProject",formData)
            const data=res.data;
            authUser.projects.push(data);
            set({authUser: authUser})
        } catch (error) {
            toast.error(error.response?.data.message)
            console.log(error)
        }finally{
            set({isCreatingProject: false})
        }
    },

    joinProject: async(formData)=>{
        set({isJoiningProject: true})
        try {
            const authUser=get().authUser
            const id=formData.projectId
            const res=await axiosInstance.post(`/project/joinProject/${id}`)
            const data=res.data
            if(!authUser.projects.includes(data)){
                authUser.projects.push(data);
            }
        } catch (error) {
            toast.error(error.response?.data.message)
            console.log(error)
        }finally{
            set({isJoiningProject: false})
        }
    },

    deleteProject: async(id)=>{
        try{
            const res=await axiosInstance.delete(`/project/delete/${id}`)
            const authUser=get().authUser;
            const updatedProjects=authUser.projects.filter((project)=>{
                return project._id!==id;
            })
            authUser.projects=updatedProjects
            set({authUser: authUser})
        }catch(error){
            toast.error(error.response.data.message)
        }
    }
}))