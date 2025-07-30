using Microsoft.EntityFrameworkCore;
using WebApplication1.Data.Entites;

namespace WebApplication1.Data
{
    public class AppllContext:DbContext
    {
        public DbSet<Result> Results { get; set; }
        public DbSet<User> Users { get; set; }
        
        public AppllContext(DbContextOptions<AppllContext> options) : base(options) { }
    }
}

