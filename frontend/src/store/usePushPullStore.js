import { create } from "zustand";
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast";

export const usePushPullStore=create((set,get)=>({
    requests: [],

    createPushRequest: async(formData)=>{
        try {
            const res=await axiosInstance.post("/push/createPushRequest",formData)
            const data=res.data 
            toast.success("Push request sent!")
            return true
        } catch (error) {
            console.log("Error in createPushRequest useFileStore: ",error)            
            toast.error(error.response.data.message)
            return false
        }
    },

    getPushRequests: async(fileId)=>{
        try {
            const res=await axiosInstance.get(`/push/getPushRequests/${fileId}`)
            const data=res.data
            set({requests: data})
        } catch (error) {
            console.log("Error in getPushRequest usePushPullStore: ",error)
            toast.error(error.response.data.message)
        }
    },

    deleteRequest: async(requestId)=>{
        try {
            const res=await axiosInstance.delete(`/push/deleteRequest/${requestId}`)
            const data=res.data
            toast.success(data.message)
            const requests=get().requests
            const filteredRequests=requests.filter((req)=>{
                return req._id!=requestId
            })
            set({requests: filteredRequests})
        } catch (error) {
            console.log("Error in deleteRequest usePushPullStore: ",error)
            toast.error(error.response.data.message)
        }
    },

    getAllPushRequests: async(projectId)=>{
        try {
            const res=await axiosInstance.get(`/push/getAllPushRequests/${projectId}`)
            const data=res.data
            set({requests: data})
        } catch (error) {
            console.log("Error in getAllPushRequest usePushPullStore: ",error)
            toast.error(error.response.data.message)
        }
    },

    getAllAdminRequests: async(projectId)=>{
        try {
            const res=await axiosInstance.get(`/push/getAlladminRequests/${projectId}`)
            const data=res.data
            return data;
        } catch (error) {
            console.log("Error in getAllPushRequest usePushPullStore: ",error)
            toast.error(error.response.data.message)
        }
    },

    getRequest: async(requestId)=>{
        try {
            const res=await axiosInstance.get(`/push/getRequest/${requestId}`)
            const data=res.data
            return data
        } catch (error) {
            console.log("Error in getRequest: ",error)
            toast.error(error.response.data.message)
        }
    },

    mergePullRequest: async(requestId)=>{
        try {
            const res=await axiosInstance.post(`/push/mergePullRequest/${requestId}`)
            const data=res.data
            return data;
        } catch (error) {
            console.log("Error in mergePullRequest usePullPushStore: ",error)
            toast.error(error.response.data.message)
        }
    },

    mergeConflict: async(requestId,formData)=>{
        try {
            const res=await axiosInstance.post(`/push/mergeConflict/${requestId}`,formData)
            const data=res.data
            toast.success(data.message);
            return true
        } catch (error) {
            console.log("Error in mergeConflict usePushPullStore: ",error)
            toast.error(error.response.data.message)
            return false
        }
    },

    rejectRequest: async(requestId)=>{
        try {
            const res=await axiosInstance.get(`/push/reject/${requestId}`)
            const data=res.data
        } catch (error) {
            console.log("Error in rejectRequest usePushPullStore: ",error)
            toast.error(error.response.data.message)
        }
    }
}))