using AutoMapper;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Serilog;
using System;
using System.Globalization;
using System.IO.Compression;

namespace dotnet.ts.react
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            Environment = env;

            Log.Logger = new LoggerConfiguration()
              .Enrich.FromLogContext()
              .WriteTo.LiterateConsole()
              .WriteTo.RollingFile("App_Data\\Logs\\log-{Date}.txt", fileSizeLimitBytes: 536870912, retainedFileCountLimit: 7)
              .CreateLogger();

            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }
        public IHostingEnvironment Environment { get; set; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            services.Configure<GzipCompressionProviderOptions>
                (options => options.Level = CompressionLevel.Fastest);

            services.AddResponseCompression(options =>
            {
                options.Providers.Add<GzipCompressionProvider>();
            });

            services.AddMvc();

            return services.BuildServiceProvider();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IServiceProvider serviceProvider, IAntiforgery antiforgery, IHostingEnvironment env, ILoggerFactory loggerFactory, IApplicationLifetime appLifetime)
        {
            loggerFactory.AddSerilog();
            
            appLifetime.ApplicationStopped.Register(Log.CloseAndFlush);

            if (env.IsDevelopment())
            {
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true,
                    ReactHotModuleReplacement = true
                });

                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseWhen(x => !x.Request.Path.Value.StartsWith("/api"), builder =>
                {
                    builder.UseExceptionHandler("/Home/Error");
                });
            }

            app.UseDefaultFiles();
            app.UseStaticFiles();
            
            app.UseResponseCompression();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default-spa",
                    template: "{controller=ArragroCms}/{action=Index}/{id?}/{status?}");

                routes.MapRoute(
                    name: "default",
                    template: "{controller=MicrosoftAccount}/{action=Index}/{id?}");


                routes.MapSpaFallbackRoute("spa-fallback", new { controller = "Home", action = "Index" });
            });
        }
    }
}
