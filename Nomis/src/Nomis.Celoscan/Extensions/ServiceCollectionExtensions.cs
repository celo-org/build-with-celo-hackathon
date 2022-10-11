using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Nomis.Blockchain.Abstractions.Settings;
using Nomis.Celoscan.Interfaces;
using Nomis.Celoscan.Interfaces.Settings;
using Nomis.Utils.Extensions;

namespace Nomis.Celoscan.Extensions
{
    /// <summary>
    /// <see cref="IServiceCollection"/> extension methods.
    /// </summary>
    public static class ServiceCollectionExtensions
    {
        /// <summary>
        /// Add Celoscan service.
        /// </summary>
        /// <param name="services"><see cref="IServiceCollection"/>.</param>
        /// <param name="configuration"><see cref="IConfiguration"/>.</param>
        /// <returns>Returns <see cref="IServiceCollection"/>.</returns>
        public static IServiceCollection AddCeloscanService(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddSettings<CeloscanSettings>(configuration);
            var settings = configuration.GetSettings<ApiVisibilitySettings>();
            if (settings.CeloAPIEnabled)
            {
                return services
                    .AddTransient<ICeloscanClient, CeloscanClient>()
                    .AddTransientInfrastructureService<ICeloscanService, CeloscanService>();
            }
            else
            {
                return services;
            }
        }
    }
}