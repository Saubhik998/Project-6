import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:5035/api/File";

function App() {
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileToUpload, setFileToUpload] = useState(null);

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/all`);
            setFiles(response.data);
        } catch (error) {
            console.error("Error fetching files:", error);
        }
    };

    const handleFileChange = (event) => {
        setFileToUpload(event.target.files[0]);
    };

    const handleFileUpload = async () => {
        if (!fileToUpload) {
            alert("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("file", fileToUpload);

        try {
            await axios.post(`${API_BASE_URL}/upload`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setFileToUpload(null);
            fetchFiles(); // Refresh file list after upload
        } catch (error) {
            console.error("File upload failed:", error);
        }
    };

    const handleFileClick = async (fileId) => {
        if (!fileId) return;

        try {
            const response = await axios.get(`${API_BASE_URL}/${fileId}`);
            setSelectedFile(response.data);
        } catch (error) {
            console.error("Error fetching file details:", error);
        }
    };

    return (
        <div>
            <h1>File Upload and Viewer</h1>
            
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleFileUpload} disabled={!fileToUpload}>
                Upload
            </button>

            <h2>Uploaded Files</h2>
            <ul>
                {files.map((file) => (
                    <li key={file.id} onClick={() => handleFileClick(file.id)}>
                        {file.name}
                    </li>
                ))}
            </ul>

            {selectedFile && (
                <div>
                    <h3>Selected File</h3>
                    <p>Name: {selectedFile.name}</p>
                    <p>Size: {selectedFile.size} bytes</p>
                </div>
            )}
        </div>
    );
}

export default App;
