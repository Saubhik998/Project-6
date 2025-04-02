using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace ImageUploadAPI.Services
{
    public class FileService
    {
        private readonly IGridFSBucket _gridFS;

        public FileService(IMongoDatabase database)
        {
            _gridFS = new GridFSBucket(database);
        }

        // ✅ Upload File
        public async Task<string> UploadFileAsync(Stream fileStream, string fileName)
        {
            var fileId = await _gridFS.UploadFromStreamAsync(fileName, fileStream);
            return fileId.ToString();
        }

        // ✅ Get File by ID
        public async Task<byte[]> GetFileAsync(string fileId)
        {
            if (!ObjectId.TryParse(fileId, out ObjectId objectId))
                throw new ArgumentException("Invalid file ID.");

            using var memoryStream = new MemoryStream();
            await _gridFS.DownloadToStreamAsync(objectId, memoryStream);
            return memoryStream.ToArray();
        }

        // ✅ Get All File Names
        public async Task<List<string>> GetAllFilesAsync()
        {
            var files = new List<string>();
            using var cursor = await _gridFS.FindAsync(FilterDefinition<GridFSFileInfo>.Empty);
            await cursor.ForEachAsync(file => files.Add(file.Id.ToString())); // Store file IDs

            return files;
        }

        // ✅ Delete File by ID
        public async Task<bool> DeleteFileAsync(string fileId)
        {
            if (!ObjectId.TryParse(fileId, out ObjectId objectId))
                return false;

            await _gridFS.DeleteAsync(objectId);
            return true;
        }
    }
}
