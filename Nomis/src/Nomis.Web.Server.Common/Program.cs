using System.Reflection;

using Microsoft.AspNetCore.Mvc;
using Nomis.Api.Common.Middlewares;
using Nomis.Api.Common.Providers;
using Nomis.Api.Common.Swagger.Filters;
using Nomis.Blockchain.Abstractions.Settings;
using Nomis.Utils.Extensions;
using Nomis.Web.Server.Common.Extensions;
using Swashbuckle.AspNetCore.Filters;
using Swashbuckle.AspNetCore.SwaggerGen;
using Swashbuckle.AspNetCore.SwaggerUI;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration
    .AddJsonConfigs();

builder.Services
    .AddHttpContextAccessor();

builder.Services.AddSettings<ApiVisibilitySettings>(builder.Configuration);
var apiVisibilitySettings = builder.Configuration.GetSettings<ApiVisibilitySettings>();

builder.Services
    .AddApiVersioning(config =>
    {
        config.DefaultApiVersion = new(1, 0);
        config.AssumeDefaultVersionWhenUnspecified = true;
        config.ReportApiVersions = true;
    });

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        {
            policy.AllowAnyOrigin();
            policy.WithMethods("GET","OPTIONS");
            policy.AllowAnyHeader();
        });
});

builder.Services.AddControllers()
    .ConfigureApiBehaviorOptions(options =>
    {
        options.SuppressMapClientErrors = true;
    })
    .ConfigureApplicationPartManager(manager =>
    {
        manager.FeatureProviders.Add(new InternalControllerFeatureProvider(apiVisibilitySettings));
    });

builder.Services.AddRouting(options => options.LowercaseUrls = true);

builder.Services.AddSingleton<ExceptionHandlingMiddleware>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    #region Add xml-commånts

    string baseDirectory = AppDomain.CurrentDomain.BaseDirectory;
    foreach (var assembly in AppDomain.CurrentDomain.GetAssemblies())
    {
        if (!assembly.IsDynamic)
        {
            string xmlFile = $"{assembly.GetName().Name}.xml";
            string xmlPath = Path.Combine(baseDirectory, xmlFile);
            if (File.Exists(xmlPath))
            {
                options.IncludeXmlComments(xmlPath);
            }
        }
    }

    options.UseAllOfToExtendReferenceSchemas();

    #endregion Add xml-commånts

    options.SwaggerDoc("v1", new()
    {
        Version = "v1",
        Title = "Nomis Score API",
        Description = "An API to get Nomis Score for crypto wallets.",
    });

    #region Add Versioning

    options.OperationFilter<RemoveVersionFromParameterFilter>();
    options.DocumentFilter<ReplaceVersionWithExactValueInPathFilter>();
    options.DocInclusionPredicate((version, desc) =>
    {
        if (!desc.TryGetMethodInfo(out var methodInfo))
        {
            return false;
        }

        var versions = methodInfo
            .DeclaringType?
            .GetCustomAttributes(true)
            .OfType<ApiVersionAttribute>()
            .SelectMany(attr => attr.Versions);

        var maps = methodInfo
            .GetCustomAttributes(true)
            .OfType<MapToApiVersionAttribute>()
            .SelectMany(attr => attr.Versions)
            .ToList();

        return versions?.Any(v => $"v{v}" == version) == true
               && (maps.Count == 0 || maps.Any(v => $"v{v}" == version));
    });

    #endregion Add Versioning

    options.EnableAnnotations();
    options.ExampleFilters();
    options.DocumentFilter<HideMethodsFilter>();
});
builder.Services.AddSwaggerExamplesFromAssemblies(Assembly.GetExecutingAssembly());

// Add services to the container.
builder.Services
    .AddBlockchainServices(builder.Configuration);

var app = builder.Build();

app.UseMiddleware<ExceptionHandlingMiddleware>();

app.UseStaticFiles();

app.UseRouting();

app.UseSwagger();
app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("v1/swagger.json", "Nomis Score API V1");
    options.DocumentTitle = "Nomis Score API V1";
    options.DefaultModelsExpandDepth(0);

    options.InjectStylesheet("/css/swagger.css");
    options.DisplayRequestDuration();
    options.DocExpansion(DocExpansion.None);

    options.ConfigObject.DisplayOperationId = true;
    options.ConfigObject.ShowCommonExtensions = true;
    options.ConfigObject.ShowExtensions = true;
});

app.UseHttpsRedirection();
app.UseCors();
app.UseAuthorization();

app.MapControllers();

app.Run();