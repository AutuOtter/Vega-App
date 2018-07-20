using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vega.Models;
using vega.Persistence;

namespace vega.Controllers
{
    public class MakesController : Controller
    {
        public VegaDbContext Context { get; set; }
        public MakesController(VegaDbContext context)
        {
            this.Context = context;
        }
        [HttpGet("/api/makes")]
        public async Task<IEnumerable<Make>> GetMakes()
        {
            return await Context.Makes.Include(m => m.Models).ToListAsync();
        }
    }
}