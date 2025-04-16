import { create } from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast";

export const useProjectStore=create((set,get)=>({
    isLoading: true,
    project: null,

    loadProject: async(id)=>{
        try{
            const res=await axiosInstance.get(`/project/project/${id}`);
            const data=res.data;
            set({project: data})
        }catch(error){
            set({project: null})
            toast.error(error.message);
        }finally{
            set({isLoading: false});
        }
    },

    createFile: async(formData)=>{
        try {
            const project=get().project
            const res=await axiosInstance.post(`/file/create/${project._id}`,formData)
            const data=res.data;
            project.files.push(data)
            set({project: project})
        } catch (error) {
            toast.error(error.response?.data.message)
            console.log(error)
        }
    },

    deleteFile: async(id)=>{
        try {
            const project=get().project
            const res=await axiosInstance.delete(`/file/delete/${project._id}/${id}`)
            const updatedFiles=project.files.filter((file)=>{
                return file._id!==id
            })
            project.files=updatedFiles;
            set({project: project})
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    deleteTask: async(projectId,id)=>{
        try {
            const project=get().project
            const res=await axiosInstance.delete(`/task/task/${projectId}/${id}`)
            const updatedTask=project.tasks.filter((task)=>{
                return task._id!=id;
            })
            project.tasks=updatedTask;
            set({project: project})
        } catch (error) {
            toast.error(error.response.data.message);
            console.log("error in delet task: ",error.message)
        }
    },

    completeTask: async(id)=>{
        try {
            const project=get().project
            const res=await axiosInstance.patch(`/task/task/complete/${id}`)
            const data=res.data;
            const updatedTask=project.tasks.filter((task)=>{
                return task._id!=id;
            })
            updatedTask.push(data)
            project.tasks=updatedTask;
            set({project: project})
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error)
        }
    },

    createTask: async(task,id)=>{
        try {
            const project=get().project;
            const res=await axiosInstance.post(`/task/newtask/${id}`,task)
            const data=res.data
            project.tasks.push(data)
            set({project: project});
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error);
        }
    }
}))