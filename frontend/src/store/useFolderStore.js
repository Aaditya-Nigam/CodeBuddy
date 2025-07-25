import toast from "react-hot-toast";
import {create} from "zustand"
import { axiosInstance } from "../lib/axios";

export const useFolderStore=create((set)=>({
    folder: null,
    isCreatingFolder: false,

    createFolder: async(formData)=>{
        set({isCreatingFolder: true});
        try {
            const res=await axiosInstance.post(`/folder/createFolder`,formData);
            const data=res.data;
            toast.success("Folder created!")
        } catch (error) {
            console.log("Error in useFolderStore createFolder: ",error)
            toast.error(error.response?.data.message);
        }finally{
            set({isCreatingFolder: false});
        }
    },

    getFolder: async(formData)=>{
        try {
            // console.log(formData.folderID)
            const res=await axiosInstance.get(`folder/getFolder/${formData.projectId}/${formData.folderID}`)
            const data=res.data;
            set({folder: data})
        } catch (error) {
            set({folder: null})
            console.log("Error in useFolderStore getFolder: ",error)
            toast.error(error.response?.data.message);
        }
    }
}))
