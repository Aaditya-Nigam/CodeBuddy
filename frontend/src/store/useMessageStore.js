import toast from "react-hot-toast"
import { axiosInstance } from "../lib/axios"
import { create } from "zustand"
import { useAuthStore } from "./useAuthStore"

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
    },

    subscribeToMessages: ()=>{
        try {
            const socket=useAuthStore.getState().socket;
            socket.off('newMessage')
            socket.on('newMessage',(msg)=>{
                set({messages: [...get().messages,msg]});
            })
        } catch (error) {
            console.log(error);
        }
    }
}))