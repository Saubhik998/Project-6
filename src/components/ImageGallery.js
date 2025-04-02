import { useEffect, useState } from 'react';
import { getAllFiles, getFile, deleteFile } from '../services/fileService';

const ImageGallery = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const fileList = await getAllFiles();
            console.log("File List:", fileList);

            if (!fileList || fileList.length === 0) {
                console.warn("No files found!");
                setImages([]);
                return;
            }

            const imageUrls = await Promise.all(
                fileList.map(async (file) => {
                    const url = await getFile(file.id);
                    return { id: file.id, name: file.name, url };
                })
            );

            setImages(imageUrls);
        } catch (error) {
            console.error('Error loading images:', error);
        }
    };

    const handleDelete = async (fileId) => {
        try {
            await deleteFile(fileId);
            setImages(images.filter((image) => image.id !== fileId));
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    return (
        <div>
            <h2>Uploaded Images</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {images.length === 0 ? <p>No images uploaded yet.</p> : images.map((image) => (
                    <div key={image.id} style={{ margin: '10px' }}>
                        <img src={image.url} alt={image.name} style={{ width: '100px', height: '100px' }} />
                        <p>{image.name}</p>
                        <button onClick={() => handleDelete(image.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;
