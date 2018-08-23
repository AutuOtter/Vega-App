using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using vega.Core.Models;

namespace vega.Core
{
    public class PhotoService : IPhotoService
    {
        private readonly IUnitOfWork unitOfWork;
        public PhotoService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }
        public async Task<Photo> IPhotoService.UploadPhoto(Vehicle vehicle, IFormFile file, string uploadsFolderPath)
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

            // System.Drawing to create thumbnail
            // Wasn't avail to Mosh but it is now

            // Update database
            var photo = new Photo { FileName = fileName };
            vehicle.Photos.Add(photo);
            await unitOfWork.CompleteAsync();

            return photo;
        }
    }
}