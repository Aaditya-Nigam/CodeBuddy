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
import toast, { Toaster } from "react-hot-toast";

export const Editor = ({ fileId }) => {
  const { file, isLoading, getFile, saveFile, isSaving} = useFileStore();
  const [code, setCode] = useState("// Write your code here\n");

  useEffect(() => {
    if (fileId) {
      getFile(fileId);
    }
  }, [fileId, getFile]);

  useEffect(() => {
    if (file?.content && file.content !== code) {
      setCode(file.content);
    }
  }, [file]);

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

  return (
    <>
      <div className="flex items-center justify-between px-4 py-1 border-b-1 border-zinc-700">
        <h1 className="text-lg font-normal py- border-[#1e232795] text-zinc-500">{file.fileName}</h1>
        <button className="bg-sky-500 px-4 py-0.5 rounded-xl text-white hover:bg-sky-600 cursor-pointer" onClick={handleSave} disabled={isSaving}>{isSaving?'Saving':'Save'}</button>
      </div>
      <CodeMirror
        value={code}
        extensions={[langReq(file.language), basicSetup,autocompletion(),closeBrackets(),indentUnit.of("    ")]}
        onChange={(val) => setCode(val)}
        theme="dark"
        />
        <Toaster/>
    </>
  );
};
