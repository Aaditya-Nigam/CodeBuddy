import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useFileStore } from "../store/useFileStore"
import CodeMirror from "@uiw/react-codemirror";
import { usePushPullStore } from "../store/usePushPullStore";
import { FaArrowLeft } from "react-icons/fa6";

export const ViewOriginalVsChange=()=>{
    const {requestId}=useParams()
    const [original,setOriginal]=useState("")
    const [changed,setChanged]=useState("")
    const [request,setRequest]=useState(null)
    const {getRequest}=usePushPullStore()
    const navigate=useNavigate()

    useEffect(()=>{
        fetchData()
    },[])
    
    const fetchData=async()=>{
        const res=await getRequest(requestId)
        setRequest(res)
        setOriginal(res.originalFileId.content)
        setChanged(res.content)
    }

    return (
        <main className="bg-[#0d1117] min-h-[91.7vh] flex flex-col gap-6 p-4">
            <div className="text-zinc-500 flex flex-col gap-2">
                <div className="flex gap-4 items-center">
                    <p>FileName:</p>
                    <p className="border-2 border-zinc-700 bg-[#6699ff0b] px-4 rounded-lg">{request?.originalFileId.fileName}.{request?.originalFileId.language}</p>
                </div>
                <div className="flex gap-4 items-center">
                    <p>Author:</p>
                    <p className="border-2 border-zinc-700 bg-[#6699ff0b] px-4 rounded-lg">{request?.userId.fullName}</p>
                </div>
                <div className="flex gap-4 items-center">
                    <p>Title:</p>
                    <p className="border-2 border-zinc-700 bg-[#6699ff0b] px-4 rounded-lg">{request?.title}</p>
                </div>
                <div className="flex gap-4 items-center">
                    <p>Description:</p>
                    <p className="border-2 border-zinc-700 bg-[#6699ff0b] px-4 rounded-lg">{request?.description}</p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="border-2 border-zinc-700 bg-[#010409] rounded-xl text-white p-4 flex flex-col gap-4">
                    <h1 className="text-center text-2xl text-zinc-400"><u>Original File</u></h1>                            
                    <CodeMirror
                        value={original}
                        theme="dark"
                        editable={false}
                        className="rounded-xl overflow-hidden"
                        />
                </div>
                <div className="border-2 border-zinc-700 bg-[#010409] rounded-xl text-white p-4 flex flex-col gap-4">
                    <h1 className="text-center text-2xl text-zinc-400"><u>Changed File</u></h1>                
                    <CodeMirror
                        value={changed}
                        theme="dark"
                        editable={false}
                        className="rounded-xl overflow-hidden"
                        />
                </div>
            </div>
            <div className="flex justify-center gap-3">
                <button className="bg-green-700 w-[30%] py-1 text-xl text-white rounded-lg cursor-pointer hover:bg-green-800">Confirm</button>
                <button className="border-2 hover:border-zinc-500 hover:text-zinc-500 w-[30%] py-1 text-xl text-white rounded-lg flex items-center justify-center gap-2 cursor-pointer" onClick={()=> navigate(-1)}><FaArrowLeft/>Back</button>
            </div>
        </main>
    )
}