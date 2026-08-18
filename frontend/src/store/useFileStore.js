import { create } from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast";

export const useFileStore=create((set)=> ({
    file: null,
    isLoading: true,
    isSaving: false,
    isCreatingFile: false,
    isLoadingClone: true,
    isSyncing: false,

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

    getFile: async({fileId,ind})=>{
        try {
            console.log(fileId)
            console.log(ind)
            const res=await axiosInstance.get(`/file/file/${fileId}/${ind}`)
            const data=res.data;
            set({file: data})
            return data
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
    },

    createCloneFile: async(formData)=>{
        try {
            const res=await axiosInstance.post("/file/createCloneFile",formData)
            const data=res.data
            console.log(data)
            return data
        } catch (error) {
            console.log("Error in useFileStore createCloneFile: ",error)
            toast.error(error.response.data.message)
        }
    }, 

    getClone: async(formData)=>{
        try {
            const res=await axiosInstance.get(`/file/cloneFile/${formData.fileId}`)
            const data=res.data
            return data
        } catch (error) {
            console.log("Error in getClone useFileStore: ",error)
            toast.error(error.response.data.message)
            return null;
        }finally{
            set({isLoadingClone: false});
        }
    },

    saveCloneFile: async(id,formData)=>{
        set({isSaving: true})
        try {
            const res=await axiosInstance.patch(`/file/cloneFile/update/${id}`,formData)
            const data=res.data;
            return data;
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error.message)
        }finally{
            set({isSaving: false});
        }
    },

    handleSync: async(id,cloneId)=>{
        set({isSyncing: true})
        try{
            console.log(id)
            console.log(cloneId)
            const res=await axiosInstance.post(`/file/cloneFile/sync/${id}/${cloneId}`)
            const data=res.data;
        }catch(error){
            toast.error(error.response.data.message);
            console.log(error.message)
        }finally{
            set({isSyncing: false})
        }
    }

}))