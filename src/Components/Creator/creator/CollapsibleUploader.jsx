import React, { useState } from "react";
import FileUploader from "./FileUploader";

const CollapsibleUploader = ({onAddImageSrc, onAddImageBackgroundSrc}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Header Section */}
      <div
        className="z-10 sticky top-0 border border-[#03A9E7] bg-[#ffffff] p-3 shadow-lg w-[100%] text-[#03A9E7] cursor-pointer"
        onClick={() => setIsOpen(!isOpen)} // Toggle the visibility
      >
        <h2 className="text-[#03A9E7] text-lg flex justify-between items-center">
          Upload Files
          <span>
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 15l6-6 6 6"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 9l-6 6-6-6"
                />
              </svg>
            )}
          </span>
        </h2>
      </div>

      {/* Collapsible Content */}
      {isOpen && (
        <div className="p-3">
          <FileUploader onAddImageSrc={onAddImageSrc} onAddImageBackgroundSrc={onAddImageBackgroundSrc}/>
        </div>
      )}
    </div>
  );
};

export default CollapsibleUploader;
