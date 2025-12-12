import React, { useEffect, useState } from "react";

import CodeMirror from "@uiw/react-codemirror"; 
import { python } from "@codemirror/lang-python";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { basicSetup } from "codemirror"; 
import { autocompletion, closeBrackets } from "@codemirror/autocomplete"; 
import { indentUnit } from "@codemirror/language"; 
// import { bracketMatching } from "codemirror/matchbrackets"; 

import { useFileStore } from "../../store/useFileStore";
import { useAuthStore } from "../../store/useAuthStore"
import toast, { Toaster } from "react-hot-toast";
import { NavLink } from "react-router-dom";

export const Editor = ({ fileId,projectId }) => {
  const { file, isLoading, getFile, saveFile, isSaving, createCloneFile, getClone} = useFileStore();
  const {authUser}=useAuthStore()
  const [code, setCode] = useState("// Write your code here\n");
  const [cloneId,setCloneId]=useState(null)
  // const {socket}=useAuthStore();

  console.log(fileId)
  useEffect(() => {
      getFile({fileId,ind:0});

    cloneFile()
  }, [fileId, getFile]);
  
  const cloneFile=async()=>{
    const clone=await getClone({fileId:fileId, userId:authUser._id})
    setCloneId(clone._id)
  }

  useEffect(() => {
    if (file?.content && file.content !== code) {
      setCode(file.content);
    }
  }, [file]);

  // useEffect(()=>{
  //   socket.emit("joinRoom", {fileId});

  //   socket.on("codeUpdate", (code)=>{
  //     setCode(code);
  //   })

  //   return ()=>{
  //     socket.off("codeUpdate")
  //   }
  // },[fileId])

  if (isLoading) {
    return <h1>Loading..</h1>;
  }

  const handleSave=()=>{
    try {
      const formData={
        fileName: file.fileName,
        language: file.language,
        content: code
      }
      saveFile(fileId,formData)
    } catch (error) {
      toast.error(error.message);
    }
  }

  const handleFork=async ()=>{
    try {
      const formData={
        fileId: fileId,
        userId: authUser._id
      }
      const clone=await createCloneFile(formData)
      setCloneId(clone._id)
      console.log(clone)
    } catch (error) {
      toast.error(error.message);
    }
  }

  const langReq=(str)=>{
    if(str==='python'){
      return python();
    }
    if(str==='cpp'){
      return cpp();
    }
    if(str==='javascript'){
      return javascript();
    }
    if(str=='html'){
      return html();
    }
    if(str=='css'){
      return css();
    }
    if(str=='java'){
      return java();
    }
  }

  const handleCodeChange=(val)=>{
    setCode(val);
    // socket.emit("codeChange", {fileId,code: val});
  }

  return (
    <>
      <div className="flex items-center justify-between px-4 py-1 border-b-1 border-zinc-700">
        <h1 className="text-lg font-normal py- border-[#1e232795] text-zinc-500">{file.fileName}</h1>
        <div className="flex gap-2">
          <button className="bg-sky-500 px-4 py-0.5 rounded-xl text-white hover:bg-sky-600 cursor-pointer duration-300 ease-in" onClick={handleFork} disabled={isSaving}>Fork</button>
          <NavLink to={`/pushRequests/file/${fileId}`} className="px-4 border-2 border-white rounded-xl text-white py-0.2 hover:bg-white hover:text-black cursor-pointer duration-300 ease-in font-semibold">Push Requests</NavLink>
        </div>
      </div>
      <div className="bg-[#0d1117] px-2 pt-1 text-white text-sm flex gap-2">
        <div className={`px-2 rounded-t-md bg-[#282c34] cursor-pointer`} >
          Main
        </div>
        {
          cloneId?
            <NavLink to={`/projects/cloneFile/${projectId}/${fileId}/${cloneId}`} className={`px-2 rounded-t-md bg-[#ffffff50]`}>
              Repo
            </NavLink>:<></>
        }
      </div>
      <CodeMirror
        value={code}
        extensions={[langReq(file.language), basicSetup,autocompletion(),closeBrackets(),indentUnit.of("    ")]}
        onChange={handleCodeChange}
        theme="dark"
        editable={false}
        />
        <Toaster/>
    </>
  );
};
