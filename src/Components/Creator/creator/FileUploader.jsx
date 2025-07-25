import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { getBaseURL } from "../../../common/constant/urls";

const FileUploader = ({ onAddImageSrc, onAddImageBackgroundSrc }) => {
  const [files, setFiles] = useState([]); // For newly added files before upload
  const [uploadedFiles, setUploadedFiles] = useState([]); // For already uploaded files

  // Fetch uploaded files from the backend
  const fetchUploadedFiles = async () => {
    try {
      const response = await axios.get(getBaseURL() + "/files");
      setUploadedFiles(response.data);
    } catch (error) {
      console.error("Error fetching uploaded files", error);
    }
  };

  // Fetch files on component mount
  useEffect(() => {
    fetchUploadedFiles();
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const uploadedFiles = acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      );
      setFiles([...files, ...uploadedFiles]);
    },
  });

  const handleUpload = async () => {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const response = await axios.post(getBaseURL() + "/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Files uploaded successfully!");
      setFiles([]); // Clear files after upload
      fetchUploadedFiles(); // Refresh the uploaded files list
    } catch (error) {
      console.error("Error uploading files", error);
    }
  };

  return (
    <div>
      {/* File Uploader Section */}
      <div
        {...getRootProps()}
        style={{
          border: "2px dashed #cccccc",
          padding: "20px",
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        <input {...getInputProps()} />
        <p>Drag & drop files here, or click to select files</p>
      </div>
      <div style={{ marginTop: "20px" }}>
        {files.map((file, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <img
              src={file.preview}
              alt={file.name}
              width="50"
              style={{ marginRight: "10px" }}
            />
            {file.name}
          </div>
        ))}
      </div>
      <button
        onClick={handleUpload}
        style={{
          marginTop: "20px",
          backgroundColor: "rgb(3, 169, 231)",
          color: "white",
          padding: 4,
          borderRadius: 6,
        }}
      >
        Upload Files
      </button>

      {/* Uploaded Files Section */}
      <div style={{ marginTop: "10px" }}>
        <h3 style={{ borderBottom: "1px solid #d3d3d3", marginBottom: 4 }}>
          Uploaded Files
        </h3>
        {uploadedFiles.length === 0 ? (
          <p>No files uploaded yet.</p>
        ) : (
          <ul style={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
            {uploadedFiles.map((file, index) => (
              <li key={index} style={{ marginBottom: "10px" }}>
                <div>
                <img
                  src={getBaseURL() + file.thumbnail}
                  alt={file.fileName}
                  width="80"
                  style={{
                    width: "80px",
                    height: "80px",
                    marginRight: "10px",
                    cursor: "pointer",
                    border: "2px solid #03A9E7",
                    borderRadius: 6,
                  }}
                  onClick={() => {
                    onAddImageSrc(getBaseURL() + "/uploads/" + file.fileName);
                  }}
                />
                <button
                  style={{
                    border: "1px solid #d3d3d3",
                    borderRadius: 12,
                    fontSize: 10,
                    paddingLeft: 4,
                    paddingRight: 4,
                    marginTop: "-20px",
                  }}
                  onClick={() => {
                    onAddImageBackgroundSrc(
                      getBaseURL() + "/uploads/" + file.fileName
                    );
                  }}
                >
                  {" "}
                  set background
                </button>
                </div>
                {/* <a
                  href={`${getBaseURL()}/download/${file.fileName}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#03A9E7", textDecoration: "none" }}
                >
                  {file.fileName}
                </a> */}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
