using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using vega.Models;

namespace vega.Controllers.Resources
{
    public class VehicleResource
    {
        public int Id { get; set; }
        public int ModelId { get; set; }
        public bool IsRegistered { get; set; }
        //add features here later
        public ContactResource Contact { get; set; }
        // Many-to-Many relationship w/ features
        public ICollection<int> Features { get; set; }

        public VehicleResource()
        {
            Features = new Collection<int>();
        }
    }
}