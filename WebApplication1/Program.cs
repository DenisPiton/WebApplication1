
using Microsoft.AspNetCore.Hosting.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.JsonWebTokens;
using WebApplication1.Data;
using WebApplication1.Filters;
using WebApplication1.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;

using WebApplication1.Services.Implementations;
using Microsoft.IdentityModel.Tokens;
using System.Text;
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
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = builder.Configuration["Jwt:Issuer"],
                    ValidAudience = builder.Configuration["Jwt:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:SecretKey"]??"olololololololo"))

                };
            });
               
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowReactApp",
                    policy =>
                    {
                        policy.WithOrigins("http://localhost:5173", "http://localhost:5199")
                              .AllowAnyHeader()
                              .AllowAnyMethod()
                              .AllowCredentials();
                    });
            });
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

            app.UseCors("AllowReactApp");
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseStaticFiles();
            app.UseSession();
            app.MapControllerRoute("default", "{controller=Auth}/{action=Index}");

            
            

            app.Run();
        }
    }
}
