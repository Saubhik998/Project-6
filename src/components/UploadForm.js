import { useState } from 'react';
import { uploadFile } from '../services/fileService';

const UploadForm = ({ onUploadSuccess }) => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setError('Please select a file.');
            return;
        }

        setUploading(true);
        setError('');
        
        try {
            await uploadFile(file);
            setFile(null);
            onUploadSuccess();  // Refresh gallery after upload
        } catch (err) {
            setError('Upload failed. Check console for errors.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default UploadForm;
