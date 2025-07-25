import { useParams } from "react-router-dom";
import { useProjectStore } from "../store/useProjectStore";
import { RxAvatar } from "react-icons/rx";
import { useEffect, useRef } from "react";
import { Editor } from "../components/UI/Editor";
import { Loader } from "../components/UI/Loader";

export const File = () => {
  const { project, loadProject } = useProjectStore();
  const { projectId, fileId, parentFolder } = useParams();
  const prevProjectId = useRef(null);

  useEffect(() => {
    if (projectId && prevProjectId.current !== projectId) {
      loadProject(projectId);
      prevProjectId.current = projectId;
    }
  }, [projectId, loadProject]);

  if (!project) {
    return <Loader/>;
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
      </div>

      <div className="editor-container h-full overflow-auto bg-[#282c34]">
        {fileId ? <Editor fileId={fileId} /> : <h1>No file selected</h1>}
      </div>
    </div>
  );
};
