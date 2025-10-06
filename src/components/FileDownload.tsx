import React from "react";
import { MdOutlineFileDownload } from "react-icons/md";

const FileDownload = () => {
  return (
    <div className="flex py-2 px-2 bg-emerald-300 w-full justify-center items-center rounded-full border-2 border-emerald-900 transition-all transform hover:scale-105 hover:bg-emerald-500">
      <a
        href="../../public/resume/Fall 2025 Technical Resume.pdf"
        download="Andrew_Rho_Resume.pdf"
        className="flex text-emerald-700 w-full h-full justify-center items-center"
      >
        Download <MdOutlineFileDownload size={25} />
      </a>
    </div>
  );
};

export default FileDownload;
