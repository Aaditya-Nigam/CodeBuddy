import { useParams } from "react-router-dom";
import { useProjectStore } from "../store/useProjectStore";
import { RxAvatar } from "react-icons/rx";
import { useEffect, useRef, useState } from "react";
import { Editor } from "../components/UI/Editor";
import { Welcome } from "../components/loaders/Welcome";

export const File = () => {
  const { project, loadProject } = useProjectStore();
  const { projectId, fileId} = useParams();
  const prevProjectId = useRef(null);
  const [input,setInput]=useState("");

  useEffect(() => {
    if (projectId && prevProjectId.current !== projectId) {
      loadProject(projectId);
      prevProjectId.current = projectId;
    }
  }, [projectId, loadProject]);

  if (!project) {
    return <Welcome/>;
  }

  return (
    <div className="bg-[#0d1117] h-[91.7vh] grid grid-cols-[1fr_4fr] max-[700px]:block">
      <div className="text-white px-4 border-r-2 border-[#1e232795] max-[700px]:hidden">
        <h1 className="text-md border-b-2 py-2 border-[#1e232795] mx-4">Collaborators</h1>
        <div className="flex flex-col gap-3 py-4">
          {project?.collaborators?.length > 0 ? (
            project.collaborators.map((colab, index) => (
              <div key={index} className="flex gap-2 items-center">
                <RxAvatar className="text-xl" />
                <p className="text-xs">{colab.fullName}</p>
              </div>
            ))
          ) : (
            <p className="text-xs text-gray-400">No collaborators</p>
          )}
        </div>
        <div className="border-[0.1px] border-gray-800 bg-[#ffffff05] p-1 h-[300px]">
          <form className="h-[100%]">
            <h1 className="border-b-[0.1px] border-gray-800 text-sm text-gray-400">Input</h1>
            <textarea name="input" id="input" className="w-full h-[90%] outline-none text-xs text-gray-600" value={input} onChange={(e)=> setInput(e.target.value)}></textarea>
          </form>
        </div>
      </div>

      <div className="editor-container h-full overflow-auto bg-[#282c34]">
        {fileId ? <Editor fileId={fileId} project={project} input={input} /> : <h1>No file selected</h1>}
      </div>
    </div>
  );
};
