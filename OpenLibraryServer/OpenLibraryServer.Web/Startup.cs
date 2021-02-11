using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using OpenLibraryServer.DataAccess;
using OpenLibraryServer.Models;
using OpenLibraryServer.Service;
using OpenLibraryServer.Service.Interfaces;
using OpenLibraryServer.Web.Middleware;

namespace OpenLibraryServer.Web
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddOptions();
            services.Configure<TokenConfig>(Configuration.GetSection("TokenConfig"));
            services.AddDbContext<OpenLibraryServerDBContext>(options =>
            {
                options.UseNpgsql(Configuration.GetConnectionString("OpenLibraryServer"));
            });
            Configuration.GetSection("ConnectionString");
            services.AddTransient<IBookService, BookService>();
            services.AddTransient<IUserAuthService, UserAuthService>();
            services.AddMvc();
            services.AddCors();//options =>
            // {
            //     options.AddDefaultPolicy(builder => builder
            //         //.WithOrigins("http://*")
            //         .AllowAnyOrigin()
            //         .AllowAnyHeader().AllowAnyMethod());
            // });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseCors(options =>
            {
                options.AllowAnyMethod()
                    .AllowAnyHeader()
                    .SetIsOriginAllowed(origin => true) // allow any origin
                    .AllowCredentials(); // allow credentials
            });
            app.UseExceptionHandlingMiddleware();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute("default", "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}