using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using vega.Core;
using vega.Core.Models;

namespace vega.Persistence
{
    public class PhotoRepository : IPhotoRepository
    {
        private readonly VegaDbContext context;
        public PhotoRepository(VegaDbContext context)
        {
            this.context = context;
        }

        public async Task<IList<Photo>> GetPhotos(int vehicleId)
        {
            return await context.Photos
                .Where(p => p.VehicleId == vehicleId)
                .ToListAsync();
        }

        public void Remove(IList<Photo> photos) {
            var noOfPhotos = photos.Count();
            
            for(int i = 0; i < noOfPhotos; i++) {
                context.Remove(photos[i]);
            }
        }
    }
}