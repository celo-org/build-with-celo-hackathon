using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using Nomis.Blockchain.Abstractions.Settings;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace Nomis.Api.Common.Swagger.Filters
{
    /// <summary>
    /// Filter for hiding API from path in swagger documentation.
    /// </summary>
    public class HideMethodsFilter : IDocumentFilter
    {
        private readonly ApiVisibilitySettings _apiVisibilitySettings;

        /// <summary>
        /// Initialize <see cref="HideMethodsFilter"/>.
        /// </summary>
        /// <param name="apiVisibilitySettings"><see cref="ApiVisibilitySettings"/>.</param>
        public HideMethodsFilter(
            IOptions<ApiVisibilitySettings> apiVisibilitySettings)
        {
            _apiVisibilitySettings = apiVisibilitySettings.Value;
        }

        /// <inheritdoc/>
        public void Apply(OpenApiDocument swaggerDoc, DocumentFilterContext context)
        {
            if (!_apiVisibilitySettings.CeloAPIEnabled)
            {
                HideApiFromSwaggerPage(swaggerDoc, "celo");
            }
        }

        private static void HideApiFromSwaggerPage(OpenApiDocument swaggerDoc, string name)
        {
            foreach (var path in swaggerDoc.Paths.Where(x =>
                         x.Key.StartsWith($"/api/v1/{name}", StringComparison.InvariantCultureIgnoreCase)))
            {
                swaggerDoc.Paths.Remove(path.Key);
            }

            var tag = swaggerDoc.Tags.FirstOrDefault(x =>
                x.Name.Equals(name, StringComparison.InvariantCultureIgnoreCase));
            if (tag != null)
            {
                swaggerDoc.Tags.Remove(tag);
            }
        }
    }
}
