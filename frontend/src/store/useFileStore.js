import { create } from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast";

export const useFileStore=create((set)=> ({
    file: null,
    isLoading: true,
    isSaving: false,
    isCreatingFile: false,

    createFile: async(formData)=>{
        set({isCreatingFile: true});
        try {
            const res=await axiosInstance.post(`/file/createFile`,formData)
            const data=res.data;
            toast.success("File created!!")
        } catch (error) {
            toast.error(error.response?.data.message)
            console.log("Error in useFileStore createFile: ",error)
        }finally{
            set({isCreatingFile: false});
        }
    },

    getFile: async(id)=>{
        try {
            const res=await axiosInstance.get(`/file/file/${id}`)
            const data=res.data;
            set({file: data})
        } catch (error) {
            set({file: null});
            toast.error(error.response.data.message)
            console.log("Error in useFileStore getFile: ",error)
        }finally{
            set({isLoading: false})
        }
    },

    saveFile: async(id,formData)=>{
        set({isSaving: true})
        try {
            const res=await axiosInstance.patch(`/file/update/${id}`,formData)
            const data=res.data;
            set({file: data})
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error.message)
        }finally{
            set({isSaving: false});
        }
    }
}))