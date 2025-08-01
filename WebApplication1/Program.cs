
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Services;
using WebApplication1.Services.Implementations;
namespace WebApplication1
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddControllersWithViews();

            builder.Services.AddDbContext<AppllContext>(options =>
            {
                string con = builder.Configuration.GetConnectionString("Default")?? "";
                if (con == "")
                {
                    throw new Exception("Problem with Connecting DB");
                    
                }
                options.UseSqlServer(con);

            });

            builder.Services.AddScoped<IUserUtils, UserUtils>();



            var app = builder.Build();
            app.UseStaticFiles();
            app.MapControllerRoute("default", "{controller=Home}/{action=Index}");

            
            

            app.Run();
        }
    }
}
