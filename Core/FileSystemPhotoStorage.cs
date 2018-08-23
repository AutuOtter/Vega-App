using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace vega.Core
{
    public class FileSystemPhotoStorage : IPhotoStorage
    {
        public async Task<string> StorePhoto(string uploadsFolderPath, IFormFile file)
        {
            // If it doesn't exist, create the dir.
            if (!Directory.Exists(uploadsFolderPath))
                Directory.CreateDirectory(uploadsFolderPath);

            // Generate new file name
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);

            // Direct path to where the file will be once uploaded
            var filePath = Path.Combine(uploadsFolderPath, fileName);

            // Read and store input file
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return fileName;
        }
    }
}