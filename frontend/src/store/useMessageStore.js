import toast from "react-hot-toast"
import { axiosInstance } from "../lib/axios"
import { create } from "zustand"

export const useMessgageStore=create((set,get)=>({
    messages: null,
    isLoadingMessage: true,
    isSendingMessage:false,

    loadMessages: async(id)=>{
        try {
            const res=await axiosInstance.get(`/message/getMessages/${id}`)
            const data=res.data
            set({messages: data})
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({isLoadingMessage: false})
        }
    },

    sendMessage: async(id,text)=>{
        set({isSendingMessage: true})
        try {
            const messages=get().messages
            const formData={text}
            const res=await axiosInstance.post(`message/sendMessage/${id}`,formData)
            const data=res.data;
            messages.push(data);
            set({messages: messages})
        } catch (error) {
            toast.error(error.response?.data.message)
            console.log(error)
        }finally{
            set({isSendingMessage: false})
        }
    }
}))