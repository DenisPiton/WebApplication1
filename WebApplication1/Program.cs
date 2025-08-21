
using Microsoft.AspNetCore.Hosting.Builder;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Filters;
using WebApplication1.Services;
using WebApplication1.Services.Implementations;
namespace WebApplication1
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddControllersWithViews(optins=>
            {
                optins.Filters.Add<CurrentUser>();
            });
            builder.Services.AddSession();

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
            builder.Services.AddScoped<IResultUtils, ResultUtils>();


            var app = builder.Build();
            app.UseStaticFiles();
            app.UseSession();
            app.MapControllerRoute("default", "{controller=Auth}/{action=Index}");

            
            

            app.Run();
        }
    }
}
