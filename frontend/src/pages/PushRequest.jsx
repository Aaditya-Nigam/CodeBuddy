import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore"
import { Toaster } from "react-hot-toast"
import { usePushPullStore } from "../store/usePushPullStore"

export const PushRequest=()=>{

    const {projectId,fileId,cloneId}=useParams()
    const [data,setData]=useState({
        title: "",
        description: ""
    })
    const {createPushRequest}=usePushPullStore()
    const {authUser}=useAuthStore()
    const navigate=useNavigate()

    const handleSubmit=async (e)=>{
        e.preventDefault()
        const formData={
            title: data.title,
            description: data.description,
            userId: authUser._id,
            fileId,
            cloneId,
            projectId
        }
        const res=await createPushRequest(formData)
        console.log(res)
        if(res){
            setData({
                title: "",
                description: ""
            })
            setTimeout(()=>{
                navigate(`/projects/cloneFile/${projectId}/${fileId}/${cloneId}`)
            },1000)
        }
    }

    return (
        <>
            <main className="grid grid-cols-2 gap-4 bg-[#0d1117] min-h-[91.7vh] text-white">
                <div className="border-r-1 border-[#ffffff15] h-full flex justify-center">
                    <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-6 w-[400px] h-full">
                        <h1 className="text-3xl text-center pb-6"><u>Push commit</u></h1>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="title" className="text-xl">Title</label>
                            <input type="text" name="title" id="title" placeholder="Enter title..." className="outline-none border-1 border-[#ffffff20] px-2 py-1 rounded-xl" value={data.title} onChange={(e)=> setData({...data, [e.target.name]:e.target.value})}/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="description" className="text-xl">Description</label>
                            <textarea name="description" id="description" placeholder="Enter description..." rows={5} className="outline-none border-1 border-[#ffffff20] p-2 rounded-xl" value={data.description} onChange={(e)=> setData({...data, [e.target.name]:e.target.value})}/>
                        </div>
                        <div className="grid grid-cols-2 gap-3 w-full text-lg">
                            <input type="submit" value="Push" className="bg-green-600 rounded-lg py-1 cursor-pointer hover:bg-green-700 duration-100 ease-in"/>
                            <input type="button" value="Cancel Commit" className="rounded-lg py-1 border-1 border-[#ffffff25] cursor-pointer hover:bg-white hover:text-black duration-200 ease-in"/>
                        </div>
                    </form>
                </div>
                <div className="flex justify-center items-center p-4 text-3xl h-full">
                    <div className="flex flex-col gap-4 items-center">
                        <p className="text-center pb-4">“Propose changes with clarity, merge with confidence.”</p>
                        <img src="./pushRequest.png" className="h-[300px] drop-shadow-2xl drop-shadow-white text-sm" alt="push" />
                    </div>
                </div>
            </main>
            <Toaster/>
        </>
    )
}