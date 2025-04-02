import axios from 'axios';

const API_BASE_URL = 'http://localhost:5035/api/File'; // Ensure this matches your backend port

//  Upload File
export const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        console.log("File uploaded:", response.data);
        return response.data;
    } catch (error) {
        console.error('Error uploading file:', error.response?.data || error.message);
        throw error;
    }
};

//  Fetch All Files (Returns IDs & Names)
export const getAllFiles = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/all`);
        console.log("Fetched files:", response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching files:', error.response?.data || error.message);
        throw error;
    }
};

//  Fetch Image by ID (Returns File URL)
export const getFile = async (fileId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${fileId}`, { responseType: 'blob' });
        const imageUrl = URL.createObjectURL(response.data);
        return imageUrl;
    } catch (error) {
        console.error('Error fetching file:', error.response?.data || error.message);
        throw error;
    }
};

//  Delete a File by ID
export const deleteFile = async (fileId) => {
    try {
        await axios.delete(`${API_BASE_URL}/${fileId}`);
        console.log("Deleted file:", fileId);
    } catch (error) {
        console.error('Error deleting file:', error.response?.data || error.message);
        throw error;
    }
};
