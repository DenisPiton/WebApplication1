
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Hosting.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Text;
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
                        policy.WithOrigins("http://localhost:3000", "https://vercel.app")
                              .AllowAnyHeader()
                              .AllowAnyMethod()
                              .AllowCredentials();
                    });
            });
            builder.Services.AddDbContext<AppllContext>(options =>
            {
                string con = builder.Configuration.GetConnectionString(builder.Environment.IsProduction() ? "Default" : "Dev")?? "";
                if (con == "")
                {
                    throw new Exception("Problem with Connecting DB");
                    
                }
                options.UseNpgsql(con);

            });

            builder.Services.AddScoped<IUserUtils, UserUtils>();
            builder.Services.AddScoped<IResultUtils, ResultUtils>();


            var app = builder.Build();

            using (var scope = app.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                try
                {
                    var context = services.GetRequiredService<AppllContext>();
                    context.Database.Migrate(); // Применяет pending миграции
                                                // Или создает базу, если её нет:
                                                // context.Database.EnsureCreated();
                }
                catch (Exception ex)
                {
                    var logger = services.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex, "An error occurred while migrating the database.");
                }
            }


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
