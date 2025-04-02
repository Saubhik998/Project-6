using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ImageUploadAPI.Services;
using System;
using System.IO;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace ImageUploadAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private readonly FileService _fileService;

        public FileController(FileService fileService)
        {
            _fileService = fileService;
        }

        //  Upload File
        [HttpPost("upload")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> UploadFile(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest(new { message = "File not provided." });

            using var stream = file.OpenReadStream();
            string fileId = await _fileService.UploadFileAsync(stream, file.FileName);
            
            return Ok(new { FileId = fileId, FileName = file.FileName, Size = file.Length });
        }

        //  Get File by ID (Download File)
        [HttpGet("{id}")]
        public async Task<IActionResult> GetFile(string id)
        {
            try
            {
                var fileBytes = await _fileService.GetFileAsync(id);
                return File(fileBytes, "application/octet-stream", id);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (FileNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "An error occurred while fetching the file." });
            }
        }

        //  Delete File by ID
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFile(string id)
        {
            var result = await _fileService.DeleteFileAsync(id);
            if (!result)
                return NotFound(new { message = "File not found or already deleted." });

            return Ok(new { message = "File deleted successfully." });
        }

        //  Fetch All Uploaded Files (New Endpoint)
        [HttpGet("all")]
        public async Task<IActionResult> GetAllFiles()
        {
            try
            {
                List<string> fileNames = await _fileService.GetAllFilesAsync();
                return Ok(fileNames);
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "An error occurred while retrieving file list." });
            }
        }
    }
}
