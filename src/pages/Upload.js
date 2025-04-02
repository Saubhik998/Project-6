import UploadForm from '../components/UploadForm';
import ImageGallery from '../components/ImageGallery';
import { useState } from 'react';

const Upload = () => {
    const [refreshGallery, setRefreshGallery] = useState(false);

    return (
        <div>
            <h1>Upload and View Images</h1>
            <UploadForm onUploadSuccess={() => setRefreshGallery(!refreshGallery)} />
            <ImageGallery key={refreshGallery} />
        </div>
    );
};

export default Upload;
