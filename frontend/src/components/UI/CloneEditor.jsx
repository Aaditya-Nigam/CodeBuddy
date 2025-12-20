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
import { NavLink, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

export const CloneEditor = ({ fileId,projectId,cloneId }) => {
  const {getFile, saveCloneFile, isSaving, createCloneFile, getClone} = useFileStore();
  const {authUser}=useAuthStore()
  const [file, setFile] = useState(null);
  const [code,setCode]=useState("// Write your code here\n")
  const navigate=useNavigate()
//   const [cloneId,setCloneId]=useState(null)

  useEffect(() => {
    cloneFile()
  },[cloneId]);
  
  const cloneFile=async()=>{
    const clone=await getFile({fileId:cloneId,ind:1})
    setFile(clone)
    setCode(clone.content)
  }

  const handleSave=()=>{
    try {
      const formData={
        fileName: file.fileName,
        language: file.language,
        content: code
      }
      saveCloneFile(cloneId,formData)
    } catch (error) {
      toast.error(error.message);
    }
  }

  console.log(file)

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
  }

  const handlePushClick=async()=>{
    await handleSave()
    navigate(`/push/${projectId}/${fileId}/${cloneId}`)
  }

  const extensions = [
    basicSetup,
    autocompletion(),
    closeBrackets(),
    indentUnit.of("    ")
  ];

  const langExtension = langReq(file?.language);
  if (langExtension) extensions.unshift(langExtension);

  if (!file) {
    return <div className="text-white p-4">Loading editor...</div>;
  }


  return (
    <>
      <div className="flex items-center justify-between px-4 py-1 border-b-1 border-zinc-700">
        <h1 className="text-lg font-normal py- border-[#1e232795] text-zinc-500 flex gap-2 items-center"><FaArrowLeft className="cursor-pointer" onClick={()=> navigate(-1)}/>{file.fileName}</h1>
        <div className="flex gap-2">
            <button to={`/push/${projectId}/${fileId}/${cloneId}`} className="bg-sky-500 px-4 py-0.5 rounded-xl text-white hover:bg-sky-600 cursor-pointer" onClick={handlePushClick}>Push</button>
            <button className="bg-sky-500 px-4 py-0.5 rounded-xl text-white hover:bg-sky-600 cursor-pointer" onClick={handleSave} disabled={isSaving}>{isSaving?'Saving':'Save'}</button>
        </div>
      </div>
      <div className="bg-[#0d1117] px-2 pt-1 text-white text-sm flex gap-2">
        <NavLink to={`/projects/file/${projectId}/${fileId}`} className={`px-2 rounded-t-md bg-[#ffffff50]`}>
          Main
        </NavLink>
        {
          cloneId?
            <div className={`px-2 rounded-t-md bg-[#282c34] cursor-pointer`} disabled={true}>
              Repo
            </div>:<></>
        }
      </div>
      <CodeMirror
        value={code}
        extensions={extensions}
        onChange={handleCodeChange}
        theme="dark"
        />
        <Toaster/>
    </>
  );
};
