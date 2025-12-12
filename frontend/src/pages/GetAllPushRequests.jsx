import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { usePushPullStore } from "../store/usePushPullStore"
import moment from "moment"
import { FaArrowLeft } from "react-icons/fa6";

export const GetAllPushRequests=()=>{
    const {projectId}=useParams()
    const {requests,getAllPushRequests,deleteRequest}=usePushPullStore()
    const navigate=useNavigate()

    useEffect(()=>{
        fetchRequests();

    },[projectId])

    const fetchRequests=async ()=>{
        const res=await getAllPushRequests(projectId);
    }

    return (
        <main className="bg-[#0d1117] min-h-[91.7vh] flex justify-center items-center">
            <div className="w-[60%] p-4 min-h-[91.7vh] flex flex-col gap-6">
                <div className="relative">
                    <h1 className="text-3xl text-white text-center">Push Requests</h1>
                    <button onClick={()=> navigate(-1)} className="text-white border-2 border-sky-400 absolute top-2 left-5 px-3 rounded flex gap-2 items-center cursor-pointer hover:bg-sky-500 duration-300 ease-in"><FaArrowLeft/>Back</button>
                </div>
                <div className="flex flex-col gap-4 text-zinc-400">
                    {
                        requests?.map((item,idx)=>{
                            return (
                                <div key={idx} className="border-b-2 border-[#ffffff10] p-4 flex justify-between items-center">
                                    <div>
                                        <div className="flex gap-6 items-end">
                                            <p><u>{item.userId.fullName}</u></p>
                                            <p className="text-zinc-700 text-xs">{moment(item.createdAt).fromNow()}</p>
                                        </div>
                                        <p className="text-zinc-500">FileName: <span className="text-zinc-700">{item.originalFileId.fileName}.{item.originalFileId.language}</span></p>
                                        <p className="text-zinc-500">Title: <span className="text-zinc-700">{item.title}</span></p>
                                        <p className="text-zinc-500">Description: <span className="text-zinc-700">{item.description}</span></p>
                                    </div>
                                    <div>
                                        <button onClick={()=> deleteRequest(item._id)} className="border-2 px-4 py-0.5 rounded hover:border-rose-900 duration-200 ease-in cursor-pointer">Delete</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </main>
    )
}